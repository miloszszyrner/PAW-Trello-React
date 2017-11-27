import React from "react";

class AddForm extends React.Component {
  constructor(props) {
  super(props);
  this.handleUser = this.handleUser.bind(this);
  this.handleBoardName = this.handleBoardName.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.state = {
    user: '',
    boardName: '',
  };
}
handleUser(e) {
  this.setState({ user: e.target.value });
}

handleBoardName(e) {
  this.setState({ boardName: e.target.value});
}

render() {
 return(
  <form className="form">
   <h4>Create Board</h4>
    Board Name:<br/>
    <input  className="notes" placeholder="Board Name" value={this.state.boardName} onChange={(e) => this.handleBoardName(e)}></input><br/>
    <button className="submit" type="button" onClick={this.handleSubmit}>Add</button>
  </form>
 );
}
 handleSubmit() {
   fetch('http://localhost:9080/myapp/10000/boards', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       //user: this.state.user,
       NAME: this.state.boardName,
     })
   })
  //console.log(this.state.user)
  console.log(this.state.boardName)
 }
}

export default AddForm;
