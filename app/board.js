import React from 'react';
import Board from 'react-trello';
import { render } from "react-dom";
import $ from "jquery";

var data = {
  lanes: [
    {
      id: '',
      title: '',
      cards: [
        {id: '', title: '', description: ''},
      ]
    }
  ]
}

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    console.log('drag ended')
    console.log(`cardId: ${cardId}`)
    console.log(`sourceLaneId: ${sourceLaneId}`)
    console.log(`targetLaneId: ${targetLaneId}`)
}

class App extends React.Component {
  constructor(){
      super()
        this.state = {
          lanes: [
            {
              id: '',
              title: '',
              cards: [
                {id: '', title: '', description: ''},
              ]
            }
          ]
        }
    }

  render() {
    var dUrl = "http://localhost:9080/myapp/boards/";
    dUrl += window.location.href.substring(window.location.href.length - 1);
    dUrl += "/rolls";
    //console.log(dUrl);
    var result = '';
    $.ajax(
       {
         url: dUrl,

         success: function(result){
             console.log(this.state);
             for (var i = 0; i < result.length; i++) {
               this.state.lanes[i].id = result[i].boardId.toString();
               this.state.lanes[i].title = result[i].title;
               for (var j = 0; j < result[i].cards.length; j++) {
                 this.state.lanes[i].cards[j].id = result[i].cards[j].id.toString();
                 this.state.lanes[i].cards[j].title = result[i].cards[j].title;
                 this.state.lanes[i].cards[j].description = "description";
               }
             }
             this.setState({ data: result });
         }.bind(this)
       }
    );
    return (
      <Board
                      data={this.state}
                      draggable
                      handleDragEnd={handleDragEnd}
               />
    )
     }
}

render(<App />, document.getElementById('board'));
