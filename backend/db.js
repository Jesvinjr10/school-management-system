require('dotenv').config();
const mysql = require('mysql2');
require('dotenv').config();


const connection = mysql.createConnection({
  host: process.env.DB_HOST=db4free.net,
  user: process.env.DB_USER=jesvin,
  password: process.env.DB_PASSWORD=jesvin2701,
  database: process.env.DB_NAME=school
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

module.exports = connection;
