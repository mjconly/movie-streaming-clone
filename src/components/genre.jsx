import React, { Component } from "react";
import Navbar from "./navbar"
import "../css/genre.css"

class Genre extends Component{
  constructor(props){
    super(props);

    this.state={
      genre: "",
      genre_movies: [],
    }

    this.updateState = this.updateState.bind(this);
  }

  componentDidMount(){
      document.body.style.backgroundColor = "black";
      document.body.style.backgroundImage = "none";

      this.updateState();
  }

  componentDidUpdate(prevProps){
    if (prevProps.match.params.genre != this.props.match.params.genre){
        this.updateState();
    }
  }

  updateState(){
    const genre = this.props.match.params.genre;

    const movies = this.props.location.state.movies.map((movie, idx) => {
      let found = movie.genres.find(el => el === genre);
      if (found){
        return (
          <div
            key={idx}
            className="movie-item"
           >
          <img
            key={idx}
            src={movie.poster}
            alt={idx}>
          </img>
        </div>
        )
      }
    })

    this.setState({
      genre: genre,
      genre_movies: movies
    })
  }

  render(){
    return(
      <div className="genre-main">
        <Navbar
          userId={this.props.match.params.id}
          passport={this.props.location.state.passport}
          genres={this.props.location.state.genres}
          movies={this.props.location.state.movies}
          >
        </Navbar>
        <div className="main-genre-content">
          <div className="col-sm-8 m-auto">
            <h3 className="genre-header">{this.props.match.params.genre}</h3>
            <div className="movie-container">
              {this.state.genre_movies}
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default Genre;
