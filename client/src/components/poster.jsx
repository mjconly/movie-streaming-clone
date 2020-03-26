import React, { Component } from "react";
import ReactModal from "react-modal";
import axios from "axios";

import "../css/modal.css";



class Poster extends Component{
  constructor(props){
    super(props);

    this.state={
      movie: null,
      showModal: false,
      actors: null,
      reviews: [],
      overall: 0,
      current_review: "",
      star: 0,
      stars: [],
      star_fill: "rgba(43, 209, 252, .7)"
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.onChangeReview = this.onChangeReview.bind(this);
    this.getActors = this.getActors.bind(this);
    this.getStars = this.getStars.bind(this);
    this.getReviewStars = this.getReviewStars.bind(this);
    this.onStarClick = this.onStarClick.bind(this);
    this.getReviews = this.getReviews.bind(this);
  }

  componentDidMount(){
    const stars = this.getStars(this.state.star);

    this.setState({
      movie: this.props.movie,
      actors: this.props.actors,
      stars: stars,
    })
  }

  // componentWillUnmount() {
  //     // you need to unbind the same listener that was binded.
  //     window.removeEventListener('onClick', this.handleOpenModal, false);
  //     window.removeEventListener('onClick', this.handleCloseModal, false);
  // }

  onSubmit(e){
    e.preventDefault();

    const review = this.state.current_review;
    const rating = this.state.star;
    const userId = this.props.userId;
    const movieId = this.state.movie._id;
    const passport = this.props.passport;

    const data = {review, rating, userId, movieId}

    axios.post("http://localhost:4000/dashboard/review", data,
      {headers: {"x-auth-token": passport}}
    )
      .then((res) => {

        this.setState({
          star: 0,
          current_review: "",
          reviews: res.data.reviews,
          stars: this.getStars(0),
          overall: this.state.overall + rating
        })
      })
      .catch((err) => {
        console.log(err)
      })

  }

  handleOpenModal () {
    axios.get(`http://localhost:4000/dashboard/${this.state.movie._id}/reviews`,
      {headers: {"x-auth-token": this.props.passport}}
    )
      .then((res) => {

          let score = 0;
          for (let review of res.data.reviews){
            score += review.score;
          }

          this.setState({
            showModal: true,
            reviews: res.data.reviews,
            overall: score
          });
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  onChangeReview(e){
    this.setState({
      current_review: e.target.value
    })
  }

  onStarClick(i){
    const stars = this.getStars(i);
    this.setState({
      star: i,
      stars: stars
    })
  }

  getActors() {
    return this.state.movie.cast.map((id, idx) => {
      const actor = this.state.actors.get(id);
        return (
          <div key={id} className="cast-item">
            <img className="actor_img" src={actor.profile_pic} alt={actor.name}></img>
            <p  className="stub actor-name">{actor.name}</p>
          </div>
        );
      })
  }

  getStars(val){
    const stars = [];
    let emptycolor = "rgba(255,255,255, .7)"
    for (let i = 0; i < 10; i++){
      let fillwith = i < val ? this.state.star_fill : emptycolor;
      stars.push(
        <svg key={i} className="bi bi-star-fill"
          width="1.5em" height="1.5em" viewBox="0 0 16 16"
          fill={`${fillwith}`} xmlns="http://www.w3.org/2000/svg"
          value={i + 1}
          onClick={() => this.onStarClick(i + 1)}
          >
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
      )
    }
    return stars;
  }

  getReviewStars(val){
    const stars = [];
    let emptycolor = "rgba(255,255,255, .7)"
    for (let i = 0; i < 10; i++){
      let fillwith = i < val ? this.state.star_fill : emptycolor;
      stars.push(
        <svg key={i} className="bi bi-star-fill"
          width="1em" height="1em" viewBox="0 0 16 16"
          fill={`${fillwith}`} xmlns="http://www.w3.org/2000/svg"
          >
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        </svg>
      )
    }
    return stars;
  }

  getReviews(){
    if (this.state.reviews.length === 0){
      return (
        <div>
          <h4 className="stub">Be the first to review this movie!</h4>
        </div>
      );
    }

    return this.state.reviews.slice().reverse().map((review, idx) => {
      return (
          <div className="review" key={idx}>
            <div className="reviewed-by-on">
              <h4 className="stub">Review By: {review.posted_by_name}</h4>
              <h5 className="stub">
                {review.posted_on.substring(0, review.posted_on.indexOf("T"))}
              </h5>
            </div>
            <div className="star-container-review">
              <h5 className="stub">Rating: </h5>
              {this.getReviewStars(review.score)}
            </div>
            <div className="review-description">
              <p>{review.description}</p>
            </div>
          </div>
      );
    });
  }

  render(){
    return(
      <div className={this.props.altName !== "slide" ? "movie-item" : "slide"}>
        {this.props.altName !== "undefined"
          ?
          <img
            onMouseOver={this.props.onMouseOver}
            onMouseOut={this.props.onMouseOut}
            className={this.props.altName}
            style={this.props.style}
            onClick={this.handleOpenModal}
            key={this.props.idx}
            src={this.props.movie.poster}
            alt={this.props.idx}>
          </img>
          :
          <img
            onClick={this.handleOpenModal}
            key={this.props.idx}
            src={this.props.movie.poster}
            alt={this.props.idx}>
          </img>
        }
      {this.state.movie != null
      ?
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel={this.props.movie.title}
          onRequestClose={this.handleCloseModal}
          ariaHideApp={false}
          style={modal_style}
          >
          <div className="modal-close-btn">
            <div onClick={this.handleCloseModal}>&times;</div>
          </div>
          <h4 className="modal-title">{this.state.movie.title}</h4>
          <div className="movie-info">
            <div className="movie-meta">
              <img
                className="movie-image"
                src={this.state.movie.poster}
                alt={this.state.movie.title}
                >
              </img>
              <div className="movie-credits">
                <div className="creditFlex">
                  <h5 className="credit">Director: </h5>
                  <h5 className="stub">{this.state.movie.director}</h5>
                </div>
                <div className="creditFlex">
                  <h5 className="credit">Writers: </h5>
                  <h5 className="stub">{this.state.movie.writers.map((w) => {
                      return (w + " ")
                    })}
                  </h5>
                </div>
                <div className="creditFlex">
                  <h5 className="credit">Runtime: </h5>
                  <h5 className="stub">{this.state.movie.runtime}</h5>
                </div>
                <div className="creditFlex">
                  <h5 className="credit">Genres: </h5>
                  <h5 className="stub">{this.state.movie.genres.map((g) => {
                      return (g + " ")
                    })}
                  </h5>
                </div>
              </div>
              <div className="overall-score">
                <h3 className="badge badge-pill badge-info score-number">
                  {Math.round((this.state.overall / this.state.reviews.length) * 100) / 100} / 10
                </h3>
                <h5 className="score-text">
                  {this.state.reviews.length} User reviews
                </h5>
              </div>
              <div className="movie-description">
                <div className="creditFlex">
                  <h5 className="credit">Description: </h5>
                  <h5 className="stub">{this.state.movie.description}</h5>
                </div>
              </div>
              <div className="movie-cast-box">
                <h5 className="credit">Cast: </h5>
                <div className="movie-cast">
                  {this.getActors()}
                </div>
              </div>
            </div>
            <div className="movie-review">
              <div className="user-review-box">
                <h4 className="credit">User Reviews: </h4>
                <div className="user-reviews">
                  {this.getReviews()}
                </div>
              </div>
              <div className="user-review-form">
                <h4 className="credit review-title">Review: </h4>
                <form className="review-form" onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label className="stub">Rate This Movie: </label>
                    <br/>
                    <div className="star-container">
                      {this.state.stars}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="stub">Write a Review: </label>
                    <textarea
                      className="form-control"
                      required
                      id="text-area"
                      wrap="hard"
                      rows="5"
                      value={this.state.current_review}
                      onChange={this.onChangeReview}
                      ></textarea>
                  </div>
                  <button
                    type="submit"
                    name="post-review"
                    className="btn btn-outline-info"
                    >
                    Post Review
                  </button>
                </form>
              </div>
            </div>
          </div>
        </ReactModal>
      :
        ""
      }
    </div>
    );
  };
}

const modal_style = {
  overlay: {
    background: "rgba(0,0,0,0.5)",
    position: "fixed",
  },
  content: {
      background: "rgba(0,0,0, .9)",
    position: "absolute",
    top: 100,
    bottom: 50,
  },
  transition: "width 2s"
}

export default Poster
