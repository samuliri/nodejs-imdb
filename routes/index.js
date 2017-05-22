const routes = require('express').Router();

routes.get ('/', function(req, res){
    var filmsdata = req.app.locals.filmdata.films;

    //Sort title
    if (typeof req.query.title !== 'undefined') {
      filmsdata.sort(function(a, b) {
        return (a.Title < b.Title) ? -1 : (a.Title > b.Title) ? 1 : 0;
      });
    }

    //Sort year
    if (typeof req.query.year !== 'undefined') {
      filmsdata.sort(function(a, b) {
        return parseFloat(a.Year) - parseFloat(b.Year);
      });
    }

    //Pagination
    var totalFilms = filmsdata.length,
        pageSize = 8,
        pageCount = totalFilms/8,
        currentPage = 1,
        films = [],
        filmsArrays = [],
        filmsList = [];

    for (var i = 1; i < totalFilms; i++) {
      films.push({poster: filmsdata[i]['Poster'], year: filmsdata[i]['Year'], title: filmsdata[i]['Title']});
    }

    while (films.length > 0) {
      filmsArrays.push(films.splice(0, pageSize));
    }

    if (typeof req.query.page !== 'undefined') {
      currentPage = +req.query.page;
    }

    filmsList = filmsArrays[+currentPage - 1];

    res.render('default', {
      films: filmsList,
      pageCount: pageCount,
      currentPage: currentPage
    });
});

module.exports = routes;
