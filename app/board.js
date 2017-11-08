import React from 'react';
import Board from 'react-trello';
import { render } from "react-dom";
import $ from "jquery";

var data = {
  lanes: [
    {
      id: 'lane1',
      title: 'Planned Tasks',
      label: '2/2',
      cards: [
        {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins'},
        {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}}
      ]
    },
    {
      id: 'lane2',
      title: 'Completed',
      label: '0/0',
      cards: []
    }
  ]
}

class App extends React.Component {
  constructor(){
      super()
        this.state = {
          data: []
        }
    }
  render() {
    const dUrl = "http://localhost:9080/myapp/boards/3/rolls";
    var result = '';
    $.ajax(
       {
         url: dUrl,

         success: function(result){
             //onsole.log(result[0].boardId);
             this.setState({data: result});
             data.lanes[0].id = this.state.data[0].boardId;
             data.lanes[0].title = this.state.data[0].name;
             data.lanes[0].label = "label";
             data.lanes[0].cards[0].id = this.state.data[0].cards[0].id;
             data.lanes[0].cards[0].title = this.state.data[0].cards[0].title;
             data.lanes[0].cards[0].description = "description";
             data.lanes[0].cards[0].label = "label";
             data.lanes[0].cards[1].id = this.state.data[0].cards[1].id;
             data.lanes[0].cards[1].title = this.state.data[0].cards[1].title;
             data.lanes[0].cards[1].description = "description";
             data.lanes[0].cards[1].label = "label";
         }.bind(this)
       }
    );

    return  <Board
                    data={data}
                    draggable
             />
     }
}

render(<App />, document.getElementById('board'));
