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
      movies: [{deway: "movies"}],
      favorites: [{deway: "favorites"}],
      showFaves: false,
    };
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
  }

  componentDidMount(){

  }

  getMovies() {
    // make an axios request to your server on the GET SEARCH endpoint
    axois.get('/movies/search')
      .then(({data}) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  saveMovie() {
    // same as above but do something diff
    axois.post('/movies/save', {
      name: 'new name'
    })
      .then(({data}) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  deleteMovie() {
    // same as above but do something diff
    axois.delete('/movies/delete', {
      name: 'new name'
    })
      .then(({data}) => {
        console.log(data);
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
        <header className="navbar"><h1>Bad Movies!!</h1></header> 
        <div className="main">
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));