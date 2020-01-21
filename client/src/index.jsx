import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'
const serverUrl = "http://localhost:3000/movies";


class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
    };
    
    // you might have to do something important here!

    this.getMovies = this.getMovies.bind(this);
    this.swapFavorites = this.swapFavorites.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);

    this.getMovies();
  }

  getMovies(e) {
    // make an axios request to your server on the GET SEARCH endpoint
    const id = e ? e.target.value : 28;
    console.log("genre id: ", id);

    $.get(serverUrl + "/search", { id })
      .then(movies => {
        this.setState({ movies })
      })
      .catch(err => console.error("error with GET REQUEST TO THE /search ENDPOINT OF SERVER: ", err))
    $.get(serverUrl + "/favorites")
      .then( favorites => {
        this.setState({
          favorites
        });
      })
      .catch(err => console.error("error with GET REQUEST TO THE /favorites ENDPOINT OF SERVER: ", err))

    };

  saveMovie(movie) {
    $post(serverUrl + "/save", movie)
    .catch(err => console.error("error with GET REQUEST TO THE /save ENDPOINT OF SERVER: ", err))
    // same as above but do something diff
  }

  deleteMovie() {
    // same as above but do something diff

    $.ajax({
      url: serverUrl + "/delete",
      method: "DELETE",
      data: { id: movie.id }
    })
    .then( () =>
      this.getMovies()
    )
    .catch(err => console.error("error with GET REQUEST TO THE /delete ENDPOINT OF SERVER: ", err))
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
          <Search 
            swapFavorites={this.swapFavorites} 
            showFaves={this.state.showFaves}
            handleGenreSelect={this.getMovies}
          />
          <Movies 
            movies={this.state.showFaves ? this.state.favorites : this.state.movies} 
            showFaves={this.state.showFaves}
            movieClick={
              this.state.showFaves ? this.deleteMovie : this.saveMovie
            }
            />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));