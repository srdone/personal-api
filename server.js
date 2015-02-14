//get express library, morgan logger, body-parser
var express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser');

//initialize express
var app = express();

//add middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

//add static routes
app.use(express.static('./public'));

//listen on a port
app.listen(3333);

console.log('Listening on localhost:3333');