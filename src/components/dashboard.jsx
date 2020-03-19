import React, { Component } from "react";
import Navbar from "./navbar";
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
      movies: [],
    }
  }

componentDidMount(){
    document.body.style.backgroundColor = "black";
    document.body.style.backgroundImage = "none";

    axios.get("http://localhost:4000/dashboard/"+this.props.match.params.id,
      {headers: {
        "x-auth-token": this.props.location.state.passport
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
        movies: movie_comps,
        val: 1
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
      <div>
        {this.state.isAuth
        ?
          <div className="dashboard-main">
            <Navbar
              userId={this.props.match.params.id}
              passport={this.props.location.state.passport}
              >
            </Navbar>
            <div className="slide-row">
              <div className="slide-item">1</div>
              <div className="slide-item">2</div>
              <div className="slide-item">3</div>
              <div className="slide-item">4</div>
              <div className="slide-item">5</div>
              <div className="slide-item">6</div>
              <div className="slide-item">7</div>
            </div>
          </div>
        :
          <div className="dashboard-main">
            <Error
              status={this.state.error_status}
              error={this.state.error_response}
              >
            </Error>
          </div>
        }
      </div>
    );
  };
};

export default Dashboard;
