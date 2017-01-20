var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));

var Contact = require('./models/Contact.js');

mongoose.connect('mongodb://localhost/contactme');

var db = mongoose.connection;

// Log any mongoose errors
db.on('error', function(error) {
  console.log('Mongoose Error: ', error);
});

// Log a success message when we connect to our mongoDB collection with no issues
db.once('open', function() {
  console.log('Mongoose connection successful.');
});


app.get('/', function(req, res){
  res.sendFile('./public/index.html');
});

app.post('/contact', function(req, res){
	var user = new Contact(req.body);

	user.save(function(error, doc){
		if (error){
			res.send(error);
		} else {
			res.send(doc);
		}
	});
});

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});