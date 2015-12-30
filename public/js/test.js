var array = [[["one","two"],["three","four"],["five","six"],["seven","eight"]]];
for(var i : 0; i < array.length; i++){
	var nextRound = [];
	for(var j : 0; j < array[i].length;j++){
		nextRound.push([array[i][j][0],array[i][j+1][0]]);
		j++;
	}
	array.push(nextRound);
	console.log(nextRound);
	if(nextRound.length == 1){
		break;
	}
}