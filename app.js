var app = angular.module('bracketApp', []);

app.controller('BracketController', function($scope){
	var entrants = ["One", "Two", "Three", "Four"];
	function bracketCreator(entrants){
		//Add functionality for odd numbers
		/*
		What you want to do is find how much more 
		the bracket is above the closest power of two
		*/
		var bracket = [];
		var diff = closestPowerOf2(entrants.length) - entrants.length;
		for (var i = 0; i < diff; i++){
			entrants.splice(i, 0, "BYE");
			diff++;
			i++;	
		}
		//diff = 2 i = 0 splice 0 i = 1 i = 2 diff = 3 splice 2 diff = 4 i = 3 i = 4 splice 
		for (var i = 0; i < entrants.length; i++){
			bracket.push([entrants[i], entrants[i+1]]);
			i++;
		}
		bracket = [bracket];
		for(var i = 0; i < bracket.length; i++){
			var nextRound = [];
			for(var j = 0; j < bracket[i].length;j++){
				nextRound.push([bracket[i][j][1],bracket[i][j+1][1]]);
				j++;
			}
			bracket.push(nextRound);
			if(nextRound.length == 1){
				break;
			}
		}
		return bracket;
	}
	function cleanEntrants(){
		for(var i = 0; i < entrants.length; i++){
			if (entrants[i] == "BYE"){
				entrants.splice(i,1);
				i--;
			}
			
		}
	}
	function closestPowerOf2(num){
		var count = 2;
		while(count < num){
			count *= 2;
		}
		return count;
	}
	$scope.text = "Sample";
	$scope.submit2 = function(){
		if($scope.text){
			entrants.push($scope.text);
			cleanEntrants();
			$scope.entrants = bracketCreator(entrants);
		}
	};
	$scope.entrants = bracketCreator(entrants);
});