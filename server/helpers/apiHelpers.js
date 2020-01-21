const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');
const moviesUrl = 'https://api.themoviedb.org/3'

// write out logic/functions required to query TheMovieDB.org


const getGenres = () => {
    return axios.get(moviesUrl + '/genre/movie/list', {
        params: {
            api_key: API_KEY
        }
    })
    .then(results => results.data.genres)
    .catch(err => console.error('Error with api request in getGenres: ', err));
    // https://www.themoviedb.org/account/signup
    // get your API KEY
    // use this endpoint to search for movies by genres, you will need an API key
    // https://api.themoviedb.org/3/discover/movie
    // and sort them by horrible votes using the search parameters in the API
};

const getMoviesByGenre = (genreId) => {
    return axios.get(moviesUrl + '/discover/movie', {
        params: {
            api_key: API_KEY,
            sort_by: 'vote_average.asc',
            with_genres: genreId
        }
    })
    .then( results => (
        results.data.results.map( movie => ({
            id: movie.id,
            name: movie.original_title,
            imageUrl: movie.poster_path,
            averageRating: movie.vote_average,
            year: movie.release_date.substring(0, 4)
        }))
    ))
    .catch(err => console.error('Error with api request in getMoviesByGenre: ', err));
      // make an axios request to get the list of official genres
    // use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list
    // send back
}




// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file

module.exports = { getGenres, getMoviesByGenre };