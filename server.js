//get express library, morgan logger, body-parser
var express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser');

//initialize express
var app = express();

//add middleware for all calls
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//json data - getters only
app.get('/name', function(req, res, next) {
  //note that send ends the request / response cycle and stops calling middleware - it DOES send JSON
  res.send({name: 'Stephen Done'});
});

(function () {
  var location = {location: 'Somewhere in your head'};

  app.get('/location', function (req, res) {
    //Or we can use res.json() - it forces JSON response
    res.json(location);
  });

  app.put('/location', function (req, res) {
    console.log(req.body);
    if (!req.body.location) {
      res.sendStatus(400);
    } else {
      location = req.body.location;
      res.json(req.body);
    }
  });
}());

app.get('/hobbies', function(req, res) {
  var hobbies = ['reading', 'singing', 'hacking', 'learning cool stuff'];

  res.json({hobbies: hobbies});
});

app.get('/occupations', function(req, res, next) {
  var compare = function (a,b) {
    if (a.start > b.start) {
      return 1;
    } else if (a.start < b.start) {
      return -1;
    } else {
      return 0;
    }
  };

  if (req.query.sort === 'asc') {
    allPositions.sort(compare);
  } else if(req.query.sort === 'desc') {
    allPositions.reverse(compare);
  };

  console.log(allPositions);

  next();
});

var wellsFargo = {
  company: 'Wells Fargo',
  position: 'Operations Analyst',
  start: new Date('September 1, 2007'),
  end: new Date('September 30, 2008')
};
var universityOfPhoenix = {
  company: 'University of Phoenix',
  position: 'Business Analyst',
  start: new Date('October 1, 2008'),
  end: new Date('October 31, 2009')
};
var universityOfPhoenix2 = {
  company: 'University of Phoenix',
  position: 'Business Analyst II - Team Lead',
  start: new Date('November 1, 2009')
};

var allPositions = [wellsFargo, universityOfPhoenix, universityOfPhoenix2];

app.get('/occupations', function(req, res) {
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