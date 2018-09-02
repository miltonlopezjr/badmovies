import React from 'react';
import ReactDOM from 'react-dom';
import axois from 'axios';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
    };
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.setMovies = this.setMovies.bind(this);
    this.getFavs = this.getFavs.bind(this);
    this.setFavs = this.setFavs.bind(this);
  }
  componentDidMount(){
    this.getFavs();
  }
  setMovies(movies){
    console.log(movies)
    this.setState({
      movies: movies
    })
  }
  setFavs(movies){
    console.log(movies)
    this.setState({
      favorites: movies
    })
  }
  getFavs(){
    axois.get('/movies/favorites')
      .then(({data}) => {
        this.setFavs(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  getMovies(genre) {
    axois.get('/movies/search', {
      params: {
        genre: genre
      }
    })
      .then(({data}) => {
        this.setMovies(data.results);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  saveMovie(movie) {
    console.log(movie);
    axois.post('/movies/save', {
      movie: movie
    })
      .then(({data}) => {
        this.getFavs();
      })
      .catch((err) => {
        console.log(err);
      })
  }
  deleteMovie(movie) {
    axois.delete('/movies/delete', {
      params : {
        movieId: movie.id
      }
    })
      .then(({data}) => {
        this.getFavs();
      })
      .catch((err) => {
        console.log(err);
      })
  }
  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        <div className="main">
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} getMovies={this.getMovies}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves} saveMovie={this.saveMovie} deleteMovie={this.deleteMovie} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));