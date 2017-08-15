
// DEPENDENCIES
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cheerio = require('cheerio');
var mongoose = require('mongoose');

// THE PUBLIC DIRECTORY
app.use(express.static('public'));

// MONGO DB VIA MLAB
var link = 'mongodb://sethmlab:abc123@ds011902.mlab.com:11902/herokudb_seth';
//var link = 'mongodb://localhost/scraper';

var mondb = mongoose.connection;
// show any mongoose errors
mondb.on('error', function(err) {
	console.log('Mongoose Error: ', err);
});
// once logged in to the db through mongoose, log a success message
mondb.once('open', function() {
	console.log('Mongoose connection successful.');
});

// MODELS
var Note = require('./models/Note.js');
var Article = require('./models/Article.js');

app.listen(process.env.PORT || 3000, function() {
	console.log('App running on port 3000');
});
