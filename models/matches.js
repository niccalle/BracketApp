var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var Matches = new Schema({
	pair: [String]
});
module.exports = Matches;