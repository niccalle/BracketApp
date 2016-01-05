var app = angular.module('bracketApp', []);

app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

app.controller('BracketController', function($scope, $http){
	$scope.entrants = [];
	var bracketEntrants = [];
	var bracketId = window.location.href.slice(-4);
	$http.get('/getBracket/'+bracketId).then(
		function successCallback(response){
			console.log(response['data'][0]);
			$scope.entrants = response['data'];
			$scope.entrants[0].forEach(function(pair){
				bracketEntrants.push(pair[0], pair[1]);
			});
			console.log(bracketEntrants);
		},
		function errorCallback(response){
			console.log(response);
		});
	


	$scope.submit2 = function(){
		if($scope.text){
			bracketEntrants.push($scope.text);
			// cleanEntrants();
			$http.post('/addEntrant', {'bracketId': bracketId,'data': bracketEntrants}).then(
				function successCallback(response){
					$scope.entrants = response['data'];
					console.log(response);
				},
				function errorCallback(response){
					console.log(response);
				});
			// $scope.entrants = bracketCreator(entrants);
		}
	};
	$scope.hasBye = function(pair){
		if(pair[0] == "BYE"){
			return true;
		}
		return false;
	}
	$scope.winner = function(round, match, winner){
		console.log((round+1) + " " + (match/2) + " " + (match%2));
		console.log($scope.entrants.length);
		var win = $scope.entrants[round][match][winner];
		if(round < $scope.entrants.length-1){
			$scope.entrants[round+1][Math.floor(match/2)][match%2] = win;
			$http.post('/updateBracket', {'bracketId': bracketId,'data': $scope.entrants});
		}
	}
	// function cleanEntrants(){
	// 	for(var i = 0; i < entrants.length; i++){
	// 		if (bracketEntrants[i] == "BYE"){
	// 			bracketEntrants.splice(i,1);
	// 			i--;
	// 		}
			
	// 	}
	// }
});