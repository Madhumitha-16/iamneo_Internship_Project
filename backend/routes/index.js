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

router.delete('/notedel/{id}', function (req, res) {
  var title=req.query.title;
  var id=req.params;
  var sql = `delete FROM task WHERE id="${id}"`;
  connection.query(sql,function(err, result) {
    if (err) throw err;
    console.log('record deleted');
  });
});


router.post('/search', function (req, res) {
  var title=req.query.title;
  var sql = `select * FROM task where title="${title}"`;
  connection.query(sql,function(err, result) {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});


router.post('/searchContent', function (req, res) {
  var content=req.body.content;
  var sql = `select * FROM task_new where content="${content}"`;
  connection.query(sql,function(err, result) {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});

router.post('/searchTitle', function (req, res) {
  var title=req.body.title;
  var sql = `select * FROM task_new where title="${title}"`;
  connection.query(sql,function(err, result) {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});

router.get('/getData', function (req, res) {
  var sql = `select * FROM task_new `;
  connection.query(sql,function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.post('/update', (req, res) => {
  var id = req.body.id;
  var title = req.body.title;
  var content = req.body.content;
    var sql = `UPDATE task_new set title="${title}" , content="${content}" WHERE id="${id}"`;
    var sql = `UPDATE task_new set title="${title}" , content="${content}" WHERE id="${id}"`;
  connection.query(sql, function(err, result) {
    if (err) throw err;
    res.send('record updated');
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
