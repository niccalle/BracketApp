var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Matches = require('./matches');

var RoundSchema = new Schema({
	round: [Matches]
});
module.exports = RoundSchema;