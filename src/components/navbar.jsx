import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <nav className="navbar navbar-dark bg-dark navbar-expand-sm">
        <Link to="/" className="navbar-brand">Movie Time</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHam" aria-controls="navbarHam" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarHam">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to={{
                pathname:`/dashboard/${this.props.userId}`,
                state: {
                  passport: this.props.passport
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
            <div className="dropdown-menu" aria-labelledby="navbar-dropdown">
              <Link className="dropdown-item" to="/dashboard/:id/action">Action</Link>
              <Link className="dropdown-item" to="/dashboard/:id/action">Horror</Link>
              <Link className="dropdown-item" to="/dashboard/:id/action">Sci-Fi</Link>
            </div>
          </li>
          <li className="navbar-item">
            <Link to={{
                pathname: `/dashboard/${this.props.userId}/search`,
                state: {
                  passport: this.props.passport
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
