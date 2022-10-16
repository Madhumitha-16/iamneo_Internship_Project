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
  res.send({ message: "We did it!" });
  res.render('index', { title: 'Express' });
});

router.get('/notes', function(req, res, next) {
  var sql = `select * from task `;
  connection.query(sql,function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/notedel', function (req, res) {
  var title=req.query.title;
  var sql = `delete FROM task WHERE title="${title}"`;
  connection.query(sql,function(err, result) {
    if (err) throw err;
    console.log('record deleted');
    res.send("You got it Jai!!!");
  });
});

router.post('/update', (req, res) => {
  var id = req.query.id;
  var title = req.query.title;
  if (title==" ") {
    var sql = `UPDATE task set title="${title}" WHERE id="${id}"`;
  } else {
    var sql = `UPDATE task set title="${title}" WHERE id="${id}"`;
  }
  connection.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record updated');
    res.send("You got it Madhu!!!");
  });
})

router.post('/save', function (req, res) {
  var title=req.query.title;
  var content=req.query.content;
  var sql = `INSERT INTO task (title, content) VALUES ("${title}","${content}")`;
  connection.query(sql, function(err, result) {
    if (err) throw err;
    res.send("You got it Madhu!!!");
  });
});


module.exports = router;
