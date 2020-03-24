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
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.getActors = this.getActors.bind(this);
  }

  componentDidMount(){

    this.setState({
      movie: this.props.movie,
      actors: this.props.actors
    })
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  getActors() {
    return this.state.movie.cast.map((id, idx) => {
      const actor = this.state.actors.get(id);
        return (
          <div key={id} className="cast-item">
            <img className="actor_img" src={actor.profile_pic}></img>
            <p  className="stub actor-name">{actor.name}</p>
          </div>
        );
      })
  }

  render(){
    return(
      <div className="movie-item">
        <div
          key={this.props.idx}
          onClick={this.handleOpenModal}
         >
        <img
          key={this.props.idx}
          src={this.props.movie.poster}
          alt={this.props.idx}>
        </img>
      </div>
      {this.state.movie != null
      ?
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel={"label"}
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
              <div
                className="movie-credits"
                >
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
