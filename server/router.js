var bracket = require('../controllers/bracket');
module.exports = function(app){
	app.get('/', bracket.index);
	app.get('/bracket', bracket.bracket);
	app.get('/bracket/:id', bracket.bracket);
	app.get('/getBracket/:id', bracket.getBracket);
	app.post('/addEntrant', bracket.addEntrant);
	app.post('/updateBracket', bracket.updateBracket);
}