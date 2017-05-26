const routes = require('express').Router();

routes.get ('/', function(req, res){
    var filmsdata = req.app.locals.filmdata.films,
        sort = '',
        order = '',
        action = '';

    action = req.query.action;

    // Sorting
    if (typeof req.query.title !== 'undefined') {
      sort = 'title';
      order = req.query.title;
    }

    if (typeof req.query.year !== 'undefined') {
      sort = 'year';
      order = req.query.year;
    }
    
    if (action == 'sort') {
      // Sort title
      if (sort == 'title') {
        filmsdata.sort(function(a, b) {
          return (a.Title < b.Title) ? -1 : (a.Title > b.Title) ? 1 : 0;
        });

        if (order == 'desc') {
          filmsdata.reverse();
          order = 'asc';
        } else {
          order = 'desc';
        }
      }
      // Sort year
      if (sort == 'year') {
        filmsdata.sort(function(a, b) {
          return parseFloat(a.Year) - parseFloat(b.Year);
        });

        if (order == 'desc') {
          filmsdata.reverse();
          order = 'asc';
        } else {
          order = 'desc';
        }
      }
    }

    // Pagination
    var totalFilms = filmsdata.length,
        pageSize = 8,
        pageCount = totalFilms/8,
        currentPage = 1,
        films = [],
        filmsArrays = [],
        filmsList = [];

    for (var i = 1; i < totalFilms; i++) {
      films.push({poster: filmsdata[i]['Poster'],
                  year: filmsdata[i]['Year'],
                  title: filmsdata[i]['Title']});
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
      currentPage: currentPage,
      sort: sort,
      order: order
    });
});

routes.post('/', function(req, res) {
    searchdata = req.body.searchbar;
    console.log(searchdata);
    res.end();
});

module.exports = routes;
