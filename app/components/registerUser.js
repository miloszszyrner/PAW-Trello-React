import React from "react";
import { render } from "react-dom";

class Register extends React.Component {
  constructor(props) {
  super(props);
  this.handleUsername = this.handleUsername.bind(this);
  this.handlePassword = this.handlePassword.bind(this);
  this.handlePasswordConfirmation = this.handlePasswordConfirmation.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.state = {
    username: '',
    password: '',
    passwordConfirmation: ''
  };
}
handleUsername(e) {
  this.setState({ username: e.target.value });
}

handlePassword(e) {
  this.setState({ password: e.target.value});
}

handlePasswordConfirmation(e) {
  this.setState({ passwordConfirmation: e.target.value});
}

render() {
 return(
  <form className="form">
   <h4>Register user</h4>
    <input  type="text" placeholder="Username" class="form-control input-lg" value={this.state.username} onChange={(e) => this.handleUsername(e)}></input><br/>
    <input  type="password" placeholder="Password" class="form-control input-lg" value={this.state.password} onChange={(e) => this.handlePassword(e)}></input><br/>
    <input  type="password" placeholder="Password confirmation" class="form-control input-lg" value={this.state.passwordConfirmation} onChange={(e) => this.handlePasswordConfirmation(e)}></input><br/>
    <button className="submit" type="button" class="btn btn-lg btn-primary btn-block" onClick={this.handleSubmit}>Submit</button>
  </form>
 );
}
 handleSubmit() {
   if (this.state.password != this.state.passwordConfirmation) {
    alert("wrong confirmation");
   }
   else if (this.state.password.length < 8) {
    alert("password too short");
   }
   else if (/^[a-zA-Z0-9- ]*$/.test(this.state.password) == true) {
    alert("no speciel signs in password");
   }
   else if (/\d/.test(this.state.password) == false) {
    alert("no numbers in password");
   }
   else if (this.state.username.length < 1) {
    alert("username too short");
   }
   else {
     var _this = this;
     $.ajax({
       type: 'POST',
       url: 'http://localhost:9080/myapp/user/registration',
       headers: { 'Content-Type': 'application/json' },
       data: JSON.stringify({
         USERNAME: this.state.username,
         PASSWORD: this.state.password,
         PASSWORDCONFIRMATION: this.state.passwordConfirmation,
       })
     }).then(function (data, status, xhr) {
       var address = "/login";
       _this.props.history.push({
         pathname: address
       })
     });
   }
 }
}

export default Register;
