import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props){
    super(props)

    this.state = {
      genres: null,
      movies: null,
      passport: null,
      actors: null,
    }

  }

  componentDidMount(){
    const genres = [];
    let genreSet = this.props.genres;
    genreSet.forEach((genre, idx) => {
      genres.push (
        <Link
          key={idx}
          className="dropdown-item"
          to={{
            pathname: `/dashboard/${this.props.userId}/${genre}`,
            state: {
              movies: this.props.movies,
              genres: genreSet,
              passport: this.props.passport,
              actors: this.props.actors
            }
          }}
          >
          {genre}
        </Link>
      )
    })
    this.setState({
      genres: genres,
      movies: this.props.movies,
      passport: this.props.passport,
      actors: this.props.actors,
    })
  }


  render(){
    return(
      <nav
        className="navbar fixed-top navbar-dark bg-primary navbar-expand-sm">
        <div className="navbar-brand">Movie Time</div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHam" aria-controls="navbarHam" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarHam">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to={{
                pathname:`/dashboard/${this.props.userId}`,
                state: {
                  passport: this.state.passport,
                  movies: this.state.movies,
                  genres: this.props.genres,
                  actors: this.props.actors,
                }
              }}
              className="nav-link">Home</Link>
          </li>
          <li className="navbar-item dropdown">
            <div
              className="nav-link dropdown-toggle"
              id="navbar-dropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{"cursor": "pointer"}}
              >
              Genres
            </div>
            <div className="dropdown-menu"
              style={{
                background: `rgba(0,0,0,0.5)`,
              }}
              aria-labelledby="navbar-dropdown">
              {this.state.genres}
            </div>
          </li>
          <li className="navbar-item">
            <Link to={{
                pathname: `/dashboard/${this.props.userId}/search`,
                state: {
                  movies: this.state.movies,
                  passport: this.state.passport,
                  genres: this.props.genres,
                  actors: this.props.actors,
                }
              }}
              className="nav-link">Search</Link>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <Link to="/" className="btn btn-outline-danger my-2 my-sm-0 mr-3" type="submit">Logout</Link>
        </form>
        </div>
      </nav>
    );
  }
}

export default Navbar
