var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	Rounds = require('./round');

var BracketSchema = new Schema({
	bracketId : {type: String},
	bracketName: {type: String},
	rounds: [Rounds]
});

module.exports = mongoose.model('Bracket', BracketSchema);