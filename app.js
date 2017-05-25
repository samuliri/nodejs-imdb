var express = require('express');
var app = express();
var routes = require('./routes/index');
var request = require('request');
var filmsurlall = "http://martti.s3-website-eu-west-1.amazonaws.com/films.json";

app.set('view engine','ejs');

app.set('port', (process.env.PORT || 2000));

app.use(express.static(__dirname + '/static'));

var server = app.listen (2000, function(){
    console.log('Waiting for you on port 2000');
});

/* Get data */

request({
	url: filmsurlall,
	json: true
}, function (error, response, body) {

	if (!error && response.statusCode === 200) {
		filmdata_all = body;
	} else {
	  filmdata_all = require('./static/films.json');
	}

	app.locals.filmdata = filmdata_all;
});

app.use('/', routes);
