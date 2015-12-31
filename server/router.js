var bracket = require('../controllers/bracket');
module.exports = function(app){
	app.get('/', bracket.index);
	app.get('/bracket', bracket.bracket);
}