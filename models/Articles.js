var mongoose = require('mongoose');

// MONGOOSE SCHEMA
var Schema = mongoose.Schema;
// BUILD THE SCHEMA
var rollingStone = new Schema ({
	title: {
			type: String,
			required: true
	},
		link: {
			type: String,
			required: true
	}
});

// CREATE ARTICLE
var Article = mongoose.model('Article', rollingStone);

// EXPORT ARTICLE MODULE
module.exports = Article;