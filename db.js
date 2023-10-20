const { Pool } = require('pg');

// Replace with your PostgreSQL database connection details
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'maintenance-dashboard',
  password: 'qwerty',
  port: 5432, // Default PostgreSQL port
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

