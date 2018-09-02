const movieModel = require('../models/movieModel.js');
const apiHelpers = require('../helpers/apiHelpers.js');
const axios = require('axios');

const api_key = process.env.API_KEY;

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    let genre = req.query.genre;
    axios.get('https://api.themoviedb.org/3/discover/movie', {
      params: {
        api_key : api_key,
        language : 'en-US',
        sort_by : 'vote_count.asc',
        include_adult : 'false',
        include_video : 'false',
        page : '1',
        with_genres : genre
      }
    })
      .then(({data}) => {
        res.send(data);
      })
      .catch((error) => {
        res.send(error);
      });
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
    let movie = req.body.movie;
    movieModel.save(movie, (err, data) => {
      if(err) {
        res.send(err);
      } else {
        res.send(data);
      }
    })
  },
  deleteMovie: (req, res) => {
    movieModel.delete(req.query.movieId, (err, response) => {
      if(err) {
        res.send(err);
      } else {
        res.send(response);
      }
    })
  },
  getMovies : (req, res) => {
    movieModel.fetch((err, response) => {
      if(err) {
        res.send(err);
      } else {
        res.send(response);
      }
    })
  }
}