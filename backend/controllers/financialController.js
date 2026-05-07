const db = require('../db');

// ─── POST: Save new financial record ────────────────────────────────────────
const saveRecord = async (req, res) => {
  try {
    const {
      user_id,
      monthly_salary,
      monthly_expenses,
      monthly_savings,
      gold_value,
      silver_value,
      land_value,
      house_value,
      car_value,
      financial_score,
    } = req.body;

    // Basic validation — user_id is required since column is NOT NULL
    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: 'user_id is required. Please log in first.',
      });
    }

    if (!monthly_salary || !monthly_expenses) {
      return res.status(400).json({
        success: false,
        message: 'monthly_salary and monthly_expenses are required',
      });
    }

    const sql = `
      INSERT INTO financial_records
        (user_id, monthly_salary, monthly_expenses, monthly_savings,
         gold_value, silver_value, land_value, house_value, car_value, financial_score)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      Number(user_id),
      monthly_salary,
      monthly_expenses,
      monthly_savings || 0,
      gold_value || 0,
      silver_value || 0,
      land_value || 0,
      house_value || 0,
      car_value || 0,
      financial_score || 0,
    ];

    const [result] = await db.execute(sql, values);

    res.status(201).json({
      success: true,
      message: 'Financial record saved successfully',
      record_id: result.insertId,
    });
  } catch (error) {
    console.error('Error saving record:', error.message);
    res.status(500).json({ success: false, message: 'Server error while saving record' });
  }
};

// ─── GET: Fetch all records (or by user_id) ──────────────────────────────────
const getRecords = async (req, res) => {
  try {
    const { user_id } = req.query;

    let sql = 'SELECT * FROM financial_records ORDER BY created_at DESC';
    let values = [];

    if (user_id) {
      sql = 'SELECT * FROM financial_records WHERE user_id = ? ORDER BY created_at DESC';
      values = [user_id];
    }

    const [rows] = await db.execute(sql, values);

    res.status(200).json({
      success: true,
      count: rows.length,
      data: rows,
    });
  } catch (error) {
    console.error('Error fetching records:', error.message);
    res.status(500).json({ success: false, message: 'Server error while fetching records' });
  }
};

// ─── GET: Fetch single record by ID ──────────────────────────────────────────
const getRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute('SELECT * FROM financial_records WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error fetching record:', error.message);
    res.status(500).json({ success: false, message: 'Server error while fetching record' });
  }
};

// ─── PUT: Update a record by ID ───────────────────────────────────────────────
const updateRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      monthly_salary,
      monthly_expenses,
      monthly_savings,
      gold_value,
      silver_value,
      land_value,
      house_value,
      car_value,
      financial_score,
    } = req.body;

    const sql = `
      UPDATE financial_records SET
        monthly_salary = ?, monthly_expenses = ?, monthly_savings = ?,
        gold_value = ?, silver_value = ?, land_value = ?,
        house_value = ?, car_value = ?, financial_score = ?
      WHERE id = ?
    `;

    const values = [
      monthly_salary, monthly_expenses, monthly_savings,
      gold_value, silver_value, land_value,
      house_value, car_value, financial_score,
      id,
    ];

    const [result] = await db.execute(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    res.status(200).json({ success: true, message: 'Record updated successfully' });
  } catch (error) {
    console.error('Error updating record:', error.message);
    res.status(500).json({ success: false, message: 'Server error while updating record' });
  }
};

// ─── DELETE: Delete a record by ID ───────────────────────────────────────────
const deleteRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute('DELETE FROM financial_records WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Record not found' });
    }

    res.status(200).json({ success: true, message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting record:', error.message);
    res.status(500).json({ success: false, message: 'Server error while deleting record' });
  }
};

module.exports = { saveRecord, getRecords, getRecordById, updateRecord, deleteRecord };
