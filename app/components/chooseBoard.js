import React from 'react';
import Board from 'react-trello';

class Choose extends React.Component {
  constructor(){
      super()
        this.state = {
          value: ""
        };
  }
  changeValue(event) {
    this.setState({
      value: event.target.value
    })
  }

  render() {
    return (
        <input id = "choose" value = {this.state.value} onChange = {this.changeValue.bind(this)}/>
      )
     }
}

export default Choose;
