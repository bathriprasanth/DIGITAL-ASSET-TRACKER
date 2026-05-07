const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool (better than single connection - handles multiple requests)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

// Convert pool to use promises so we can use async/await
const db = pool.promise();

module.exports = db;
