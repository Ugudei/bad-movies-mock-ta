import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: []
    };
  }

  componentDidMount() {
    this.getGenres();
  }

  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    fetch("http://localhost:3000/movies/genres")
    .then(data => data.json())
    .then(genres => {
      this.setState( { genres });
    })
    .catch(err =>
      console.error("error with get request to /genres endpoint on server: ", err)
      );
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>
          {this.props.showFaves ? "Show Results" : "Show Favorites"}
        </button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select onChange={e => this.props.handleGenreSelect(e)}>
          {this.state.genres.map( genre => (
            <option value={genre.id} key={genre.id}>
              {genre.name}
            </option>

          ))}
        </select>
        <br/>
        <br/>
        <button>Search</button>
      </div>
    );
  }
}

export default Search;