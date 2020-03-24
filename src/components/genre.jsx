import React, { Component } from "react";
import Navbar from "./navbar"
import Poster from "./poster"
import "../css/genre.css"


class Genre extends Component{
  constructor(props){
    super(props);

    this.state={
      genre: "",
      movie_rows: [],
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
      if (found !== undefined){
        return (
          <Poster
            key={idx}
            movie={movie}
            alt={idx}
            actors={this.props.location.state.actors}
            ></Poster>
        )
      }
      else{
        return null;
      }
    })

    const rows = [];
    let currRow = [];
    const limit = 4;
    let curr = 0;

    for (let m = 0; m < movies.length; m++){
        if (curr < limit && movies[m] !== null){
          currRow.push(movies[m]);
          curr += 1;
        }
        else if (movies[m] !== null){
          rows.push(currRow);
          currRow = [];
          currRow.push(movies[m]);
          curr = 1;
        }
    }

    if (currRow.length !== 0){
      rows.push(currRow);
    }

    this.setState({
      genre: genre,
      movie_rows: rows
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
          actors={this.props.location.state.actors}
          >
        </Navbar>
        <div className="main-genre-content">
          <div className="col-sm-8 m-auto">
            <h3 className="genre-header">{this.props.match.params.genre}</h3>
            <div className="row-container">
            {
              this.state.movie_rows.map((row, idx) => {
                return (
                  <div className="movie-container" key={idx}>
                    {row.map((r, i) => {
                      return (
                        r
                      )
                    })}
                  </div>
                )
              })
            }
          </div>
          </div>
        </div>
      </div>
    );
  };
};

export default Genre;
