var bracketCreator = require('../helpers/bracketCreator');
var Bracket = require('../models/bracketModel');
module.exports = {
	index: function(req,res){
		res.render('welcome');
	},
	bracket: function(req, res){
		//Look for the bracket based on req.params.id
		//Return the array and have app.js load it as bracket
		if(req.params.id == "new"){
		    var id = bracketCreator.newBracket(res);
		}
		else{
		res.render('index');
		}
	},
	getBracket: function(req,res){
		console.log(req.params.id);
		bracketCreator.getBracket(req.params.id, res);
	},
	addEntrant: function(req, res){
		//Add data in the post request for the ID
		//Add that ID as a parameter to create
		var bracket = bracketCreator.create(req.body['data']);
		var data = [];
		bracket.forEach(function(round){
			var roundData = {'round': []};
			round.forEach(function(pair){
				roundData['round'].push({'pair': pair});
			});
			data.push(roundData);
		});
		if(data.length > 0){
			Bracket.update({'bracketId': req.body['bracketId']}, {rounds: data}, function(err, numAffected){});
		}
		res.send(bracket);
	},
	updateBracket: function(req,res){
		var bracket = req.body['data'];
		var data = [];
		bracket.forEach(function(round){
			var roundData = {'round': []};
			round.forEach(function(pair){
				roundData['round'].push({'pair': pair});
			});
			data.push(roundData);
		});
		if(data.length > 0){
			Bracket.update({'bracketId': req.body['bracketId']}, {rounds: data}, function(err, numAffected){});
		}
		Bracket.update({'bracketId': req.body['bracketId']}, {rounds: data}, function(err, numAffected){});
		res.send('lmao');
	}
}