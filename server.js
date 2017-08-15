
// DEPENDENCIES
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var app = express();

mongoose.Promise = Promise;

// MORGAN AND BODY PARSER
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

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
var Article = require('./models/Articles.js');

// ADDING ROUTES
// INDEX ROUTES
app.get('/', function(req, res) {
	res.send(index.html);
});

// GET ROLLINGSTONES
app.get('/scraper', function(req, res) {

	request('http://www.rollingstone.com/', function(error, response, html) {

	var $ = cheerio.load(html);

		$('vertical-feed-article card-container').each(function(i, element) {

            var newArticle = {};
            newArticle.title = $(element).find('.vertical-feed-article-content').text();
			newArticle.link = $(element).find('.vertical-feed-article-header').text();

			var newNews = new Article (newArticle);
			newNews.save(function(err, scrapedArticle) {	
			});
		});
	});
	res.send();
});

// GET ARTICLE BY ID
app.get("/articles/:id", function(req, res) {
	Article.findOne({ "_id": req.params.id })
	.populate("note")
	.exec(function(error, doc) {
		// SEND ARTICLE VIA JSON
		res.json(doc);
	});
  });


  // GET SAVED MONGO ARTICLES
  app.get("/articles", function(req, res) {
	Article.find({}, function(error, doc) {
		// SEND ARTICLE VIA JSON
		res.json(doc);
	});
  });

app.listen(process.env.PORT || 3000, function() {
	console.log('App running on port 3000');
});
