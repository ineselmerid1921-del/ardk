const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'mes_ardk',
  waitForConnections: true,
  connectionLimit: 10,
});

pool.query('SELECT 1').then(() => {
  console.log('✅ DB CONNECTED SUCCESSFULLY');
}).catch(err => {
  console.error('❌ DB CONNECTION FAILED:', err.message);
});

module.exports = pool;