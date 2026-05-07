const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db');
const financialRoutes = require('./routes/financialRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ───────────────────────────────────────────────────────────────
// Allow requests from React frontend running on localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

// Parse incoming JSON request bodies
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/users', userRoutes);
app.use('/api/financial', financialRoutes);

// Health check route - visit http://localhost:5000/api/health to confirm server is running
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Backend server is running!' });
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, async () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);

  // Test DB connection on startup
  try {
    await db.execute('SELECT 1');
    console.log('✅ MySQL database connected successfully');
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
  }
});
