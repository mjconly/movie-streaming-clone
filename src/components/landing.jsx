import React, { Component } from "react";
import "../landing.css"


class Landing extends Component{
  constructor(props){
    super(props)

  }



  render(){
    return(
        <div className="landing-container">
          <form className="form-container">
            <h3>Movie Time</h3>
            <div className="form-border">
              <div className="form-group login-field">
                <label>Email: </label>
                <input
                  type="text"
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group login-field">
                <label>Password: </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  />
              </div>
            </div>
              <button type="submit" name="login" className="form-submit">Login</button>
          </form>
        </div>
    );
  };
}



export default Landing;
