import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "../css/landing.css"


function Error(props){
  return(
    <div className="error-box">
      <div className="error-response">{props.error}</div>
      <div className="close-btn" onClick={props.onClick}>  &times;</div>
    </div>
  )
}

function Success(props){
  return(
    <div className="success-box">
      <div className="success-response">{props.success}</div>
      <div className="close-btn" onClick={props.onClick}>  &times;</div>
    </div>
  )
}


class Landing extends Component{
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: "",
      error: "",
      success: "",
      isAuth: false,
      passport: null,
      userId: null,
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount(){
    if (this.props.location.state){
      this.setState({
        success: this.props.location.state.message
      })
      this.props.location.state = null;
    }
  }

  onSubmit(e){
    e.preventDefault();

    const {email, password} = this.state;

    axios.post("http://localhost:4000/login/signin", {email, password})
      .then((res) => {
        this.setState({
          isAuth: true,
          passport: res.data.token,
          userId: res.data.id
        })
      })
      .catch((err) => {
        this.setState({
          error: err.response.data
        })
      })
  }

  onChangeEmail(e){
    this.setState({
      email: e.target.value
    })
  }

  onChangePassword(e){
    this.setState({
      password: e.target.value
    })
  }

  handleClose(val){
    if (val === 1){
      this.setState({
        success: ""
      })
    }
    else{
      this.setState({
        error: ""
      })
    }
  }


  render(){
    return(
        <div className="landing-container">
          {this.state.isAuth ?
            <Redirect
              to={{
                pathname: "/dashboard/" + this.state.userId,
                state: {
                  passport: this.state.passport,
                  isAuth: this.state.isAuth,
                }
              }}
            />
            :
            <form className="form-container" onSubmit={this.onSubmit}>
              <div className="form-border">
                <h4 className="app-title">Movie Time</h4>
                  <div>
                    <div className="option">Dont have an account?</div>
                    <Link to="/register" className="option-link"> Register</Link>
                  </div>
                  {this.state.error === "" ? "" :
                    <Error
                      onClick={() => this.handleClose(0)}
                      error={this.state.error}
                    >
                    </Error>
                  }
                  {this.state.success === "" ? "" :
                    <Success
                      onClick={() => this.handleClose(1)}
                      success={this.state.success}
                    >
                  </Success>
                  }
                <div className="form-group login-field">
                  <label className="label-a">Email: </label>
                  <input
                    type="text"
                    required
                    className="form-control input-a"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                  />
                </div>
                <div className="form-group login-field">
                  <label className="label-a">Password: </label>
                  <input
                    type="password"
                    required
                    className="form-control input-a"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    />
                </div>
                <button type="submit" name="login" className="form-submit">Login</button>
              </div>
            </form>
        }
        </div>
    );
  };
}



export default Landing;
