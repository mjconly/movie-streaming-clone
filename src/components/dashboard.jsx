import React, { Component } from "react";
import Navbar from "./navbar";
import Slider from "./slider";
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
      feature: [],
      banner: [
        "https://hdqwalls.com/wallpapers/halloween-2018-movie-5k-z6.jpg",
        "https://hdwallsource.com/img/2016/7/interstellar-movie-poster-widescreen-wallpaper-49235-50899-hd-wallpapers.jpg",
        "https://wallpapersite.com/images/pages/pic_w/2757.jpg"
      ],
      x: 0
    }

    this.slideBanner = this.slideBanner.bind(this);
  }

componentDidMount(){
    document.body.style.backgroundColor = "black";
    document.body.style.backgroundImage = "none";

    console.log(document.getElementById("carouselSlides"))

    axios.get("http://localhost:4000/dashboard/"+this.props.match.params.id,
      {headers: {
        "x-auth-token": this.props.location.state.passport
      }}
    )
    .then((res) => {
      const movies = res.data.movies;
      const feature = []

      let i = 0;
      while (i < 6){
        let r = Math.floor(Math.random() * 97);
        feature.push(movies[r]);
        i++;
      }

      this.setState({
        isAuth: true,
        username: res.data.name,
        movies: movies,
        feature: feature,
      })

      this.interval = setInterval(() => this.slideBanner(), 10000)

    })
    .catch((err) => {
      this.setState({
        error_status: err.response.status,
        error_response: err.response.data,
      })
    });
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
              passport={this.props.location.state.passport}
              >
            </Navbar>
            <div className="banner-box">
              {this.state.banner.map((poster, idx) => {
                return (
                  <div className="banner"
                       style={{
                         backgroundImage: `url(${poster})`,
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
                <Slider movies={this.state.movies.slice(0,32)}></Slider>
              </div>
              <div>
                <h4 className="header" style={{marginLeft:"25px", marginTop:"15px"}}>Featured</h4>
                <div className="feature">
                  {this.state.feature.map((movie, idx) => {
                    return (
                      <div className="f_img" >
                      <img
                        key={idx}
                        src={movie.poster}
                        alt={idx}>
                      </img>
                    </div>
                  )
                  })}
                </div>
              </div>
              <div>
                <h4 className="header" style={{marginLeft:"25px", marginTop:"15px"}}>Recently Added</h4>
                <Slider movies={this.state.movies.slice(32,64)}></Slider>
              </div>
              <div>
                <h4 className="header" style={{marginLeft:"25px", marginTop:"15px"}}>Popular</h4>
                <Slider movies={this.state.movies.slice(64,96)}></Slider>
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
