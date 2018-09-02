const movieModel = require('../models/movieModel.js');
const apiHelpers = require('../helpers/apiHelpers.js');
const axios = require('axios');

const api_key = process.env.API_KEY;

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    res.send('hi getSearch');
    // get the search genre     

    // use this endpoint to search for movies by genres, you will need an API key

    // https://api.themoviedb.org/3/discover/movie

    // and sort them by horrible votes using the search parameters in the API
  },
  getGenres: (req, res) => {
    // use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list
    axios.get('https://api.themoviedb.org/3/genre/movie/list', {
      params: {
        api_key : api_key,
        language : 'en-US'
      }
    })
      .then(({data}) => {
        res.send(data.genres);
      })
      .catch((error) => {
        res.send(error);
      });
  },
  saveMovie: (req, res) => {
    res.send('hi saveMovie');


  },
  deleteMovie: (req, res) => {
    res.send('hi deleteMovie');

  }
}