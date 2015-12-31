var bracketCreator = require('../helpers/bracketCreator');

module.exports = {
	index: function(req,res){
		res.render('welcome');
	},
	bracket: function(req, res){
		//Look for the bracket based on req.params.id
		//Return the array and have app.js load it as bracket
		res.render('index');
	},
	getBracket: function(req,res){
		res.send([[["Mango", "Leffen"], ["SFAT", "Armada"]]]);
	},
	addEntrant: function(req, res){
		var bracket = bracketCreator.create(req.body['data']);
		res.send(bracket);
	},
	updateBracket: function(req,res){
		console.log(req.body['data']);
		res.send('lmao');
	}
}