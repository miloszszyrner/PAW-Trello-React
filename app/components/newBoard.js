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
    <input  className="notes" placeholder="Board Name" class="form-control input-lg" value={this.state.boardName} onChange={(e) => this.handleBoardName(e)}></input><br/>
    <button className="submit" type="button" class="btn btn-lg btn-primary btn-block" onClick={this.handleSubmit}>Add</button>
  </form>
 );
}
 handleSubmit() {
   var Url = 'http://localhost:9080/myapp/boards';
   var _this = this;
   var auth = this.props.location.state.authorization;
   $.ajax(
      {
        type: 'POST',
        url: Url,
        headers: {
          'Authorization': this.props.location.state.authorization,
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          'name': this.state.boardName
        })
      }
   ).then(function(data, status, xhr) {
     var address = "/allboards";
     _this.props.history.push({
       pathname: address,
       state: { authorization: auth }
     })
   });

  //console.log(this.state.user)
  console.log(this.state.boardName)
 }
}

export default AddForm;
