const { Pool } = require('pg');
const postgresConfig = require('./../../config/postgres/postgresConfig.js');

// Create pool with config
const pool = new Pool(postgresConfig);

// Test connection immediately
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL');

  // Release the client back to the pool
  release();
});

// Event listener for errors
pool.on('error', (err) => {
  console.error('PostgreSQL connection error:', err.stack);
});

module.exports = pool;
