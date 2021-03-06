import React, { Component } from "react";
import Navbar from "./navbar";
import Slider from "./slider";
import axios from "axios";
import "../css/dashboard.scss";
import "./slider.scss"


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
      error_status: "",
      error_response: "",
      username: "",
      movies: [],
      feature: [],
      banner: [
        "https://hdqwalls.com/wallpapers/halloween-2018-movie-5k-z6.jpg",
        "https://hdwallsource.com/img/2016/7/interstellar-movie-poster-widescreen-wallpaper-49235-50899-hd-wallpapers.jpg",
        "https://wallpapersite.com/images/pages/pic_w/2757.jpg",
        "https://cdnb.artstation.com/p/assets/images/images/009/539/799/large/salome-tolordava-scene-002.jpg?1519579118",
      ],
      x: 0,
      genres: null,
      actors: null,
      passport: ""
    }

    this.slideBanner = this.slideBanner.bind(this);
  }

componentDidMount(){
    document.body.style.backgroundColor = "black";
    document.body.style.backgroundImage = "none";

    let auth_token= this.props.location.state.passport;
    if (auth_token === "undefined"){
      auth_token = localStorage.getItem("jwt");
    }

    localStorage.setItem("jwt", this.props.location.state.passport);

    axios.get("/dashboard/"+this.props.match.params.id,
      {headers: {
        "x-auth-token": auth_token
      }}
    )
    .then((res) => {
      const movies = res.data.movies;
      const feature = []
      const genres = new Set();
      const actors = res.data.actors;
      const actorMap = new Map();

      let i = 0;
      while (i < 10){
        let r = Math.floor(Math.random() * 97);
        if (feature.indexOf(r) === -1){
          feature.push(movies[r]);
          i++;
        }
      }

      for(let movie of movies){
        for (let genre of movie.genres){
          genres.add(genre);
        }
      }

      for(let actor of actors){
        actorMap.set(actor._id, actor);
      }

      this.setState({
        isAuth: true,
        username: res.data.name,
        movies: movies,
        feature: feature,
        genres: genres,
        actors: actorMap,
        passport: this.props.location.state.passport
      })

      this.interval = setInterval(() => this.slideBanner(), 6000)

    })
    .catch((err) => {
      this.setState({
        error_status: err,
        error_response: err
      })
    });
  }

  componentWillUnmount(){
    localStorage.setItem("jwt", this.props.location.state.passport)
    axios.defaults.headers.common['x-auth-token'] = localStorage.getItem("jwt");
  }

  slideBanner(){
    this.setState({
      x : this.state.x <= -100 *(this.state.banner.length - 1) ? 0 : this.state.x - 100
    })
  }

  render(){
    return(
      <div>
        {this.state.isAuth
        ?
          <div className="dashboard-main">
            <Navbar
              userId={this.props.match.params.id}
              passport={this.props.location.state.passport || this.state.passport}
              genres={this.state.genres}
              movies={this.state.movies}
              actors={this.state.actors}
              >
            </Navbar>
            <div className="banner-box">
              {this.state.banner.map((poster, idx) => {
                return (
                  <div className="banner"
                        key={idx}
                        style={{
                         backgroundImage: `url("${poster}")`,
                         transform: `translateX(${this.state.x}%)`
                       }}
                    >
                  </div>
                )
              })}
            </div>
            <div className="main-content">
              <div>
                <h4 className="header" style={{marginLeft:"25px", marginTop:"15px"}}>Trending</h4>
                <Slider
                  movies={this.state.movies.slice(0,32)}
                  actors={this.state.actors}
                  userId={this.props.match.params.id}
                  passport={this.props.location.state.passport || this.state.passport}
                  >
                </Slider>
              </div>
              <div>
                <h4 className="header" style={{marginLeft:"25px", marginTop:"15px"}}>Featured</h4>
                <div className="feature">
                  <Slider
                    movies={this.state.feature}
                    actors={this.state.actors}
                    userId={this.props.match.params.id}
                    passport={this.props.location.state.passport || this.state.passport}
                    ></Slider>
                </div>
              </div>
              <div>
                <h4 className="header" style={{marginLeft:"25px", marginTop:"15px"}}>Recently Added</h4>
                <Slider
                  movies={this.state.movies.slice(32,64)}
                  actors={this.state.actors}
                  userId={this.props.match.params.id}
                  passport={this.props.location.state.passport || this.state.passport}
                  >
                </Slider>
              </div>
              <div>
                <h4 className="header" style={{marginLeft:"25px", marginTop:"15px"}}>Popular</h4>
                <Slider
                  movies={this.state.movies.slice(64,96)}
                  actors={this.state.actors}
                  userId={this.props.match.params.id}
                  passport={this.props.location.state.passport || this.state.passport}
                  >
                </Slider>
              </div>
              <div>
                <footer className="foot">Michael Conly 2020</footer>
              </div>
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
