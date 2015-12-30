var bracket = require('../controllers/bracket');
module.exports = function(app){
	app.get('/', bracket.index);
}