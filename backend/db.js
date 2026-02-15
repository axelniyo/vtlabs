
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection()
    .then(conn => {
        console.log('Successfully connected to the database.');
        conn.release();
    })
    .catch(err => {
        console.error('Error connecting to the database:');
        console.error(err);
    });

module.exports = pool;