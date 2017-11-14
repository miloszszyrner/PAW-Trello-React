import React from 'react';
import Board from 'react-trello';
import { render } from "react-dom";
import $ from "jquery";

var data = {
  lanes: [
    {
      id: 'lane1',
      title: 'Planned Tasks',
      cards: [
        {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes'},
        {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', metadata: {sha: 'be312a1'}}
      ]
    },
    {
      id: 'lane2',
      title: 'Completed',
      cards: []
    }
  ]
}

class App extends React.Component {
  constructor(){
      super()
        this.state = {
          lanes: [
            {
              id: 'lane1',
              title: 'Planned Tasks',
              cards: [
                {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes'},
                {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', metadata: {sha: 'be312a1'}}
              ]
            },
            {
              id: 'lane2',
              title: 'Completed',
              cards: []
            }
          ]
        }
    }
  render() {
    const dUrl = "http://localhost:9080/myapp/boards/1/rolls";
    var result = '';
    $.ajax(
       {
         url: dUrl,

         success: function(result){
             console.log(result[0].boardId);

             this.state.lanes[0].id = result[0].boardId.toString();
             this.state.lanes[0].title = result[0].title;
             this.state.lanes[0].cards[0].id = result[0].cards[0].id.toString();
             this.state.lanes[0].cards[0].title = result[0].cards[0].title;
             this.state.lanes[0].cards[0].description = "description";
             this.setState({ data: {data} });
         }.bind(this)
       }
    );

    return (

      <Board
                      data={this.state}
                      draggable
               />

    )
     }
}

render(<App />, document.getElementById('board'));
