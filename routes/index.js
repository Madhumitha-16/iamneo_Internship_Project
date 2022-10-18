const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dotenv = require('dotenv')

require('dotenv').config()

const connection = mysql.createConnection({
  host: process.env.MYSQL_URL, 
  user: process.env.MYSQL_USERNAME,      
  password: process.env.MYSQL_PASSWORD,     
  database: process.env.MYSQL_DATABASE 
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
  let sql = `select * from task `;
  connection.query(sql,function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.get('/notedel', function (req, res) {
  let title=req.query.title;
  let sql = `delete FROM task WHERE title="${title}"`;
  connection.query(sql,function(err, result) {
    if (err) throw err;
    console.log('record deleted');
    res.send("You got it Jai!!!");
  });
});

router.delete('/notedel/{id}', function (req, res) {
  let id=req.params;
  let sql = `delete FROM task WHERE id="${id}"`;
  connection.query(sql,function(err, result) {
    if (err) throw err;
    console.log('record deleted');
  });
});


router.post('/search', function (req, res) {
  let title=req.query.title;
  let sql = `select * FROM task where title="${title}"`;
  connection.query(sql,function(err, result) {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});


router.post('/searchContent', function (req, res) {
  let content=req.body.content;
  let sql = `select * FROM task_new where content="${content}"`;
  connection.query(sql,function(err, result) {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});

router.post('/searchTitle', function (req, res) {
  let title=req.body.title;
  let sql = `select * FROM task_new where title="${title}"`;
  connection.query(sql,function(err, result) {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});

router.get('/getData', function (req, res) {
  let sql = `select * FROM task_new `;
  connection.query(sql,function(err, result) {
    if (err) throw err;
    res.send(result);
  });
});

router.post('/update', (req, res) => {
  let id = req.body.id;
  let title = req.body.title;
  let content = req.body.content;
    let sql = `UPDATE task_new set title="${title}" , content="${content}" WHERE id="${id}"`;
  connection.query(sql, function(err, result) {
    if (err) throw err;
    res.send('record updated');
  });
})

router.post('/save', function (req, res) {
  let title=req.query.title;
  let content=req.query.content;
  let sql = `INSERT INTO task (title, content) VALUES ("${title}","${content}")`;
  connection.query(sql, function(err, result) {
    if (err) throw err;
    res.send("You got it Madhu!!!");
  });
});


module.exports = router;
