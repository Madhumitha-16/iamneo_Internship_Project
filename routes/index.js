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
  var sql = `select * from task WHERE`;
  connection.query(sql,function(err, result) {
    if (err) throw err;
    res.send(result);
    console.log('record deleted');
  });
  res.send({ message: "We did it!" });
});

router.post('/notedel', function (req, res) {
  var id=req.body.id;
  console.log('id'+id);
  var sql = `DELETE FROM task WHERE id="${id}"`;
  connection.query(sql,function(err, result) {
    if (err) throw err;
    console.log('record deleted');
    res.send("You got it Jai!!!");
  });
});

router.post('/update', (req, res) => {
  var id = req.body.id;
  var title = req.body.title;
  var sql = `UPDATE task set title="${title}" WHERE id="${id}"`;
  connection.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record updated');
    res.send("You got it Madhu!!!");
  });
})

router.post('/save', function (req, res) {
  var id=req.body.id;
  var title=req.body.title;
  var note_type_id=req.body.note_type_id;
  var sql = `INSERT INTO task ( id, title, note_type_id) VALUES ("${id}","${title}","${note_type_id}")`;
  connection.query(sql, function(err, result) {
    if (err) throw err;
    console.log('record inserted');
    res.send("You got it Madhu!!!");
  });
});


module.exports = router;
