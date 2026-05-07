const express = require('express');
const router = express.Router();
const {
  saveRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
} = require('../controllers/financialController');

// POST   /api/financial        → save new record
router.post('/', saveRecord);

// GET    /api/financial        → get all records (add ?user_id=1 to filter by user)
router.get('/', getRecords);

// GET    /api/financial/:id    → get single record
router.get('/:id', getRecordById);

// PUT    /api/financial/:id    → update record
router.put('/:id', updateRecord);

// DELETE /api/financial/:id    → delete record
router.delete('/:id', deleteRecord);

module.exports = router;
