//get express library, morgan logger, body-parser
var express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser');

//initialize express
var app = express();

//add middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

//json data - getters only - not yet in json
app.get('/name', function(req, res) {
  res.send('Stephen Done');
});
app.get('/location', function(req, res) {
  res.send('Somewhere in your head');
});
app.get('/hobbies', function(req, res) {
  res.write('reading\n');
  res.write('singing\n');
  res.end();
});
//notice how the format of the data changes between doing a write and just sending
//res.end is required - otherwise it never completes a response
app.get('/occupations', function(req, res) {
  res.write('Business Analyst - University of Phoenix');
  res.end();
});
app.get('/occupations/latest', function(req, res) {
  res.send('Full Stack Software Developer');
});

//add static routes
app.use(express.static('./public'));

//listen on a port
app.listen(3333);

console.log('Listening on localhost:3333');