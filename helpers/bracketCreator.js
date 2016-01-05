var Bracket = require('../models/bracketModel');

function closestPowerOf2(num){
	var count = 2;
	while(count < num){
		count *= 2;
	}
	return count;
}
module.exports.create = function(entrants){
		//Add functionality for odd numbers
		/*
		What you want to do is find how much more 
		the bracket is above the closest power of two
		*/
		var bracket = [];
		if(entrants.length <= 2){
			var round = [entrants];
			bracket.push(round);
			return bracket;
		}
		var diff = closestPowerOf2(entrants.length) - entrants.length;
		for (var i = 0; i < diff; i++){
			entrants.splice(i, 0, "BYE"); //Add as many bye's necessary to make the entrants a power of 2
			diff++;
			i++;	
		}
		for (var i = 0; i < entrants.length; i++){
			bracket.push([entrants[i], entrants[i+1]]); //Pair up the entrants
			i++;
		}
		bracket = [bracket];
		for(var i = 0; i < bracket.length; i++){
			var nextRound = [];// Next round in the 
			for(var j = 0; j < bracket[i].length;j++){
				nextMatch = ["W of " + bracket[i][j][0] + "vs" + bracket[i][j][1],"W of " + bracket[i][j+1][0] + "vs" + bracket[i][j+1][1]];
				//Check if there contains a BYE
				if(bracket[i][j][0] == "BYE"){
					nextMatch[0] = bracket[i][j][1];//Skip that round
				}
				if(bracket[i][j+1][0] == "BYE"){
					nextMatch[1] = bracket[i][j+1][1];//Skip That Round
				}
				nextRound.push(nextMatch)
				j++;
			}
			bracket.push(nextRound);
			if(nextRound.length == 1){
				break;
			}
		}
		return bracket;
		};

module.exports.newBracket = function(res){
		var everyChar = "abcdefghijklmnopqrstuvwkyz";
		var brktId = "";
		for(var i = 0; i < 4; i++){
			brktId += everyChar.charAt(Math.random()*26);
		}
		Bracket.findOne({'bracketId': brktId}, function(err, bracket){
			if(bracket){
				newBracket();
			}
			else{
				data = {
					'bracketId': brktId,
					'bracketName': "Test", 
					'rounds': [{'round': [{'pair': []}]}]
				};
				var newModel = new Bracket(data);
				newModel.save(function(err, succ){
					console.log("New Model Saved");
					res.redirect('/bracket/'+brktId);
				});
			}
		})
}

module.exports.getBracket = function(id, res){
	Bracket.findOne({'bracketId': id}, function(err, bracket){
		if(err){
			console.log(err);
		}
		else if(bracket){
			var bt = [];
			if(bracket.rounds[0].round[0].pair.length > 1){
				bracket['rounds'].forEach(function(rnd){
					var round = [];
					rnd['round'].forEach(function(pair){
						round.push(pair['pair']);
					});
					bt.push(round);
				})
			}
			res.send(bt);
		}
	})
}