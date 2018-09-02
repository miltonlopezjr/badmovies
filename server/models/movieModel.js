//SELECT one db to work with
//For SQL
const sqlDb = require('../../db/sql').connection;
const mysql = require('mysql');

module.exports = {

  save: (movie, callback) => {
    sqlDb.query(
      `insert into movies 
        (vote_count,id,video, vote_average, title, popularity, poster_path, original_title, backdrop_path, adult, release_date)
        values (?,?,?,?,?,?,?,?,?,?,?)`,
       [movie.vote_count, movie.id, movie.video, movie.vote_average, movie.title, movie.popularity, movie.poster_path, movie.original_title, movie.backdrop_path, movie.adult, movie.release_date], 
      (error, results) => {
        if(error) {
          console.log(error);
          callback(error);
        } else {
          callback(null, results);
        }
      })
  },

  fetch: (callback) => {
    sqlDb.query('select * from movies', (err, results) => {
      if(err) {
        callback(err);
      } else {
        callback(null, results);
      }
    })
  },

  delete: (movieid, callback) => {
    sqlDb.query('delete from movies where id = ?', movieid, (err, results) => {
      if(err) {
        callback(err);
      } else {
        callback(null, results);
      }
    })
  }
}