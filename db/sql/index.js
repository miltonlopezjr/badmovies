var mysql = require('mysql');

var connection = mysql.createConnection({
  host  : process.env.HOST,
  user  : 'student',
  password : 'student',
  database : process.env.DATABASE,
});

module.exports.connection = connection;