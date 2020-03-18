import React, { Component } from "react";
import axios from "axios";
import "../css/dashboard.css";

function Error(props){
  return(
    <div className="error-box-dash col-md-6 m-auto">
      <div className="error-response-dash">{props.status}</div>
      <div className="error-response-dash">{props.error}</div>
    </div>
  )
}

class Dashboard extends Component{
  constructor(props){
    super(props)
    this.state = {
      isAuth: false,
      error_status: null,
      error_response: "",
      username: "",
      movies: []
    }
  }

componentDidMount(){
    const curr_state = this.props.location.state;
    document.body.style.backgroundColor = "black";
    document.body.style.backgroundImage = "none";
    axios.get("http://localhost:4000/dashboard/"+this.props.match.params.id,
      {headers: {
        "x-auth-token": curr_state.passport
      }}
    )
    .then((res) => {
      const movies = res.data.movies;

      const movie_comps = movies.map((movie, idx) => {
        return (
          <div key={idx}>
            <img alt={movie.title} src={movie.poster}></img>
          </div>
        )
      })

      this.setState({
        isAuth: true,
        username: res.data.name,
        movies: movie_comps
      })
    })
    .catch((err) => {
      this.setState({
        error_status: err.response.status,
        error_response: err.response.data,
      })
    });
  }

  render(){
    return(
      <div className="dashboard-main">
        {this.state.isAuth ?
          <div>
            <h3>Welcome to the dashboard {this.state.username}</h3>
            <div className="movie-shelf">{this.state.movies}</div>
          </div>
        :
          <Error
            status={this.state.error_status}
            error={this.state.error_response}
            >
          </Error>
        }
      </div>
    );
  };
};

export default Dashboard;
