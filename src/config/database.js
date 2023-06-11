var mysql = require('mysql2');
require('dotenv').config();

exports.InitDatabase = () => {
var conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
  });
  
conn.connect(function(err) {
  if (err) throw err;
  console.log("Database is Connected!");
});
}