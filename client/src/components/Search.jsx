import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      selectedGenreId : ''
    };
    this.getGenres = this.getGenres.bind(this);
    this.setGenres = this.setGenres.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  componentDidMount (){
    this.getGenres();
    this.props.getMovies(this.state.selectedGenre);
  }
  getGenres() {
    axios.get('/movies/genres')
      .then(({data}) => {
        this.setGenres(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }
  setGenres(genres) {
    this.setState({
      genres: genres,
      selectedGenreId: genres[0].id
    })
  }
  handleSearch(evt) {
    this.props.getMovies(this.state.selectedGenre);
  }
  handleSelectChange(evt){
    this.setState({
      selectedGenre: evt.target.value
    })
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>
        <select onChange={this.handleSelectChange}>
          {this.state.genres.map((genre) => (<option key={genre.id} value={genre.id}>{genre.name}</option>)
          )}
        </select>
        <br/><br/>
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default Search;