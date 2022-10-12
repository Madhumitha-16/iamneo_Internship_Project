var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost', // Replace with your host name
  user: 'root',      // Replace with your database username
  password: 'root',      // Replace with your database password
  database: 'keep_app' // // Replace with your database Name
}); 

connection.connect(function (err) {
    if (err) console.log("database connection failed",err);
    else console.log("database connection successfull!!!!");
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users', function (req, res) {
  connection.query('SELECT * FROM note_type', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
  return res.send({ data: results, message: 'You got it!' });
});
});

router.post('/user', function (req, res) {
  var sql = `INSERT INTO task_list (id, username,note) VALUES ("4","Jaithri","API call")`;
  connection.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record inserted');
    res.send("You got it Madhu!!!");
  });
});



module.exports = router;
