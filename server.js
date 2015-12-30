var express = require('express');
var config = require('./server/config');
var app = express();
app = config.initialize(app);
app.listen(3000);