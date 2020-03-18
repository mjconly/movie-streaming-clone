import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "../css/landing.css";


function Error(props){
  return(
    <div className="error-box">
      <div className="error-response">{props.error}</div>
      <div className="close-btn" onClick={props.onClick}>  &times;</div>
    </div>
  )
}


class Register extends Component{
  constructor(props){
    super(props)

    this.state={
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      error: "",
      success: false
    }

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  onChangeUsername(e){
    this.setState({
      username: e.target.value
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

  onChangeConfirmPassword(e){
    this.setState({
      confirm_password: e.target.value
    })
  }

  handleClose(){
    this.setState({
      error: ""
    })
  }

  onSubmit(e){
    e.preventDefault()

    const {username, email, password, confirm_password} = this.state;

    axios.post("http://localhost:4000/register/add",
    {username, email, password, confirm_password}
    )
      .then((res) => {this.setState({success: true})})
      .catch(err => {
        this.setState({
          error: err.response.data
        })
      })
  }

  render(){
    return(
      <div>
        {this.state.success ?
          <Redirect
            to={{
              pathname: "/",
              state: {message: "Account registration successful!"}
            }}
          /> :
          <div className="register-container">
            <form className="form-container" onSubmit={this.onSubmit}>
              <div className="form-border">
                <h3 className="reg-title">Register Account</h3>
                <div>
                  <div className="option">Already have an account?</div>
                  <Link to="/" className="option-link"> Login</Link>
                </div>
                {this.state.error === "" ? "" :
                  <Error
                    onClick={() => this.handleClose()}
                    error={this.state.error}
                  >
                  </Error>
                }
                  <div className="form-group register-field">
                    <label className="label-a">Username: </label>
                    <input
                      type="text"
                      required
                      className="form-control input-a"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      />
                  </div>
                  <div className="form-group register-field">
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
                  <div className="form-group register-field">
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
                  <div className="form-group register-field">
                    <label className="label-a">Confirm Password: </label>
                    <input
                      type="password"
                      required
                      className="form-control input-a"
                      name="confirm_password"
                      value={this.state.confirm_password}
                      onChange={this.onChangeConfirmPassword}
                      />
                  </div>
                  <button type="submit" name="register" className="form-submit">Register</button>
                </div>
            </form>
          </div>
        }
      </div>
    );
  };
}

export default Register;
