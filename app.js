const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors=require('cors');
var router = require('./routes/index');
// const swaggerUi = require('swagger-ui-express');
// const swaggerJSDoc = require('swagger-jsdoc');


// const swaggerOptions = {
//   swaggerDefinition : {
//     info:{
//       title: 'Keep App API',
//       description: "Keep App API information",
//       contact:{
//         name: "Madhumitha"
//       },
//       servers:["http://localhost:5000"]
//     }
//   },
//   apis:['.routes/*.js']
// };

// const swaggerDocs = swaggerJSDoc(swaggerOptions);
// app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs));

var app = express();
app.use( bodyParser.json() );      
app.use(bodyParser.urlencoded({    
  extended: true
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', router);

app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });



module.exports = app;
