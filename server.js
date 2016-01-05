var express = require('express');
var config = require('./server/config');
var mongoose = require('mongoose');
var app = express();
var Bracket = require('./models/bracketModel');
app = config.initialize(app);
app.listen(app.get('port'), function(){
	console.log("running on port whatever");
});
mongoose.connect('mongodb://niccalle:tyutyu@ds037415.mongolab.com:37415/bracketapp');
mongoose.connection.on('open', function(){
	console.log("Mongoose connected");
})
// var data = {
// 	bracketId : "abcd",
// 	bracketName : "Test",
// 	rounds : [
// 	{round: [{pair: ["One", "Two"]}, {pair: ["Three", "Four"]}]}, 
// 	{round: [{pair: ["One", "Three"]}]}
// 	]
// };

// var newModel = new Bracket(data);
// newModel.save(function(err, succ){
// 	console.log("Saved Model");
// });