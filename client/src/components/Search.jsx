import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: []
    };
    this.getGenres = this.getGenres.bind(this);
    this.setGenres = this.setGenres.bind(this);
  }
  componentDidMount (){
    this.getGenres();
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
      genres: genres
    })
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>
        {/* How can you tell which option has been selected from here? */}
        <select>
          {this.state.genres.map((genre) => (<option key={genre.id} value={genre.name}>{genre.name}</option>)
          )}
        </select>
        <br/><br/>
        <button>Search</button>
      </div>
    );
  }
}

export default Search;