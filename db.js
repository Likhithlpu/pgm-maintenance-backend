const { Pool } = require('pg');

// Replace with your PostgreSQL database connection details
const pool = new Pool({
  user: 'POSTGRES USER',
  host: 'HOST',
  database: 'DB NAME',
  password: 'PASSWORD',
  port: 5432, // Default PostgreSQL port
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

