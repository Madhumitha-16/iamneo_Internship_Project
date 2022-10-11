const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors=require('cors');
var router = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', router);


module.exports = app;
