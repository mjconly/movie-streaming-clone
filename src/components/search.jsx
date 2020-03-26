import React, { Component } from "react";
import Navbar from "./navbar";
import Poster from "./poster";
import "../css/search.css";

class Search extends Component{
  constructor(props){
    super(props);

    this.state={
      passport: null,
      genres: null,
      movies: null,
      userId: null,
      query: "",
      results: [],
      movie_title_map: null,
      actors: [],
    }

    this.onChangeQuery = this.onChangeQuery.bind(this);
  }

  componentDidMount(){
    document.body.style.backgroundColor = "black";
    document.body.style.backgroundImage = "none";

    const movie_title_map = new Map();

    for (let movie of this.props.location.state.movies){
      const title_key = movie.title.slice(0, -6).split(" ").join("").toLowerCase();
      movie_title_map.set(title_key, movie);
    }

    this.setState({
      passport: this.props.location.state.passport,
      genres: this.props.location.state.genres,
      movies: this.props.location.state.movies,
      userId: this.props.match.params.id,
      movie_title_map: movie_title_map,
      actors: this.props.location.state.actors
    })
  }

  onChangeQuery(e){
    const q = e.target.value.split(" ").join("").toLowerCase();
    const matched = [];
    if (q !== ""){
      this.state.movie_title_map.forEach((movie, key) => {
        if (key.indexOf(q) > -1){
          matched.push(
            <Poster
              key={key}
              movie={movie}
              alt={key}
              actors={this.props.location.state.actors}
              userId={this.props.match.params.id}
              passport={this.props.location.state.passport}
              ></Poster>
          )
        }
      })
    }


    this.setState({
      query: e.target.value,
      results: matched
    })
  }

  render(){
    return (
      <div className="search-main">
        <Navbar
          userId={this.props.match.params.id}
          passport={this.props.location.state.passport}
          genres={this.props.location.state.genres}
          movies={this.props.location.state.movies}
          actors={this.props.location.state.actors}
          >
        </Navbar>
        <div className="main-search-container">
          <div className="col-sm-8 m-auto">
            <h3 className="search-header">Search By Title</h3>
              <form className="form-container">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.query}
                    onChange={this.onChangeQuery}
                    >
                  </input>
                </div>
              </form>
              <h4 className="search-header">
                {this.state.results.length === 0 ?
                  ( this.state.query.length === 0 ? "" : "No results found" )
                  : this.state.query
                }
              </h4>
              <div className="result-box">
                {this.state.results.map((movie, idx) => {
                  return (
                    <div className="search-result">
                      {movie}
                    </div>
                  )
                })}
              </div>
          </div>
        </div>
      </div>
    );
  };
};

export default Search;
