require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  ssl: { rejectUnauthorized: false } 
});

pool.connect((err) => {
  if (err) {
    console.error('❌ Failed to connect to PostgreSQL:', err);
  } else {
    console.log('✅ Connected to PostgreSQL');
  }
});

module.exports = pool;
