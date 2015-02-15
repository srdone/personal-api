//get express library, morgan logger, body-parser
var express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser');

//initialize express
var app = express();

//add middleware for all calls
app.use(morgan('dev'));
app.use(bodyParser.json());

//json data - getters only
app.get('/name', function(req, res, next) {
  //note that send ends the request / response cycle and stops calling middleware - it DOES send JSON
  res.send({name: 'Stephen Done'});
});

app.get('/location', function(req, res) {
  //Or we can use res.json() - it forces JSON response
  res.json({location: 'Somewhere in your head'});
});

app.get('/hobbies', function(req, res) {
  var hobbies = ['reading', 'singing', 'hacking', 'learning cool stuff'];

  res.json({hobbies: hobbies});
});

app.get('/occupations', function(req, res) {
  var wellsFargo = {
    company: 'Wells Fargo',
    position: 'Operations Analyst',
    start: Date('September 1, 2007'),
    end: Date('September 30, 2008')
  };
  var universityOfPhoenix = {
    company: 'University of Phoenix',
    position: 'Business Analyst',
    start: Date('October 1, 2008'),
    end: Date('October 31, 2009')
  };
  var universityOfPhoenix2 = {
    company: 'University of Phoenix',
    position: 'Business Analyst II - Team Lead',
    start: Date('November 1, 2009')
  };

  var allPositions = [wellsFargo, universityOfPhoenix, universityOfPhoenix2];

  res.json(allPositions);
});

app.get('/occupations/latest', function(req, res) {
  res.send({position: 'Full Stack Software Developer'});
});

//add static routes
app.use(express.static('./public'));

//listen on a port
app.listen(3333);

console.log('Listening on localhost:3333');