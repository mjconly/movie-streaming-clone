import React, { Component } from "react";
import Navbar from "./navbar"

class Genre extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <Navbar
          userId={this.props.match.params.id}
          passport={this.props.location.state.passport}
          >
        </Navbar>
        GENRE
      </div>
    );
  };
};

export default Genre;
