import React from "react";
import { render } from "react-dom";

class Register extends React.Component {
  constructor(props) {
  super(props);
  this.handleName = this.handleName.bind(this);
  this.handlePassword = this.handlePassword.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.state = {
    name: '',
    password: '',
  };
}
handleName(e) {
  this.setState({ user: e.target.value });
}

handlePassword(e) {
  this.setState({ boardName: e.target.value});
}

render() {
 return(
  <form className="form">
    <input  className="notes" placeholder="Name" value={this.state.name} onChange={(e) => this.handleName(e)}></input><br/>
    <input  className="notes" placeholder="password" value={this.state.password} onChange={(e) => this.handlePassword(e)}></input><br/>
    <button className="submit" type="button" onClick={this.handleSubmit}>Sign in</button>
  </form>
 );
}
 handleSubmit() {
   fetch('', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       NAME: this.state.name,
       PASSWORD: thiis.state.password
     })
   })
 }
}

render(<Register />, document.getElementById('register'));
