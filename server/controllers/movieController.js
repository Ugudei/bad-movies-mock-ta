// const movieModel = require('../models/movieModel.js');
// const apiHelpers = require('../helpers/apiHelpers.js');
const {saveMovie, deleteMovie, getFavorites } = require('../models/movieModel.js');
const {getGenres, getMoviesByGenre} = require('../helpers/apiHelpers.js');

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    // get the search genre     
    getMoviesByGenre(req.query.id)
    .then(movies => res.send(movies))
    .catch(err => console.error('ERROR WITH getMoviesByGenre In apiHelpers'));
 
  },
  getGenres: (req, res) => {
    getGenres()
    .then (genres => {
      res.send(genres);
    })
    .catch(err => console.error('ERROR WITH getGenres IN apiHelpers: ', err));
  },
  saveMovie: (req, res) => {
    saveMovie(req.body);
    res.send();
  },
  deleteMovie: (req, res) => {
    deleteMovie(req.body.id);
    res.send();
  },
  getFavorites: (req, res) => {
    getFavorites()
    .then(movies => res.send(movies))
    .catch(err => console.error('ERROR WITH getFavorites IN apiHelpers: ', err));
  }
}