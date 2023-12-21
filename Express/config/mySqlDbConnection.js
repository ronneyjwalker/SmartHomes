const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost", // Replace with your MySQL host
  user: "root", // Replace with your MySQL username
  password: "root", // Replace with your MySQL password
  database: "ronak", // Replace with your MySQL database name
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = db;
