const routes = require('express').Router();

routes.get ('/', function(req, res){
    var filmsdata = req.app.locals.filmdata;

    res.render('default', {
    	films: filmsdata["films"]
    });
});

module.exports = routes;
