
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



module.exports = Routes;