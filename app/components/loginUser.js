import React from "react";
import { render } from "react-dom";

class Login extends React.Component {
  constructor(props) {
  super(props);
  this.handleUsername = this.handleUsername.bind(this);
  this.handlePassword = this.handlePassword.bind(this);
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

render() {
 return(
  <form className="form">
   <h4>Login user</h4>
    <input  type="text" placeholder="Username" value={this.state.username} onChange={(e) => this.handleUsername(e)}></input><br/>
    <input  type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.handlePassword(e)}></input><br/>
    <button className="submit" type="button" onClick={this.handleSubmit}>Submit</button>
  </form>
 );
}
 handleSubmit() {
   fetch('http://localhost:9080/myapp/user/login', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       USERNAME: this.state.username,
       PASSWORD: this.state.password,
     })
   }).then(response => {
     if (response.ok) {
       response.json().then(json => {
         console.log(json);
         var address = "/allboards/";
         address += json.id;
         console.log(address);
         this.props.history.push(address);

       });
     }
   });
 }
}

export default Login;