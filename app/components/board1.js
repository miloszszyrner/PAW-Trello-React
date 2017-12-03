import React from 'react';
import Board from 'react-trello';
import $ from "jquery";

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    console.log('drag ended')
    console.log(`cardId: ${cardId}`)
    console.log(`sourceLaneId: ${sourceLaneId}`)
    console.log(`targetLaneId: ${targetLaneId}`)
}

class App1 extends React.Component {
  constructor(){
    super()
      this.state = {
        lanes: []
    }
  }

  componentDidMount() {
    var dUrl = "http://localhost:9080/myapp/";
    dUrl += this.props.match.params.userid;
    dUrl += "/boards/";
    dUrl += this.props.match.params.id;
    var result = '';
    var data = {
      lanes:
        {
          id: '',
          title: '',
          cards: [
          ]
        }
    }
    var data2 = {
      cards:
      {
        id: '', title: '', description: ''
      }
    }
    $.ajax({
       url: dUrl,
       success: function(result){
           console.log(result);
           console.log(data2);
           this.state.lanes = [];
           for (var i = 0; i < result.lanes.length; i++) {
             data.lanes.id = result.lanes[i].id.toString();
             data.lanes.title = result.lanes[i].title;
             for (var j = 0; j < result.lanes[i].cards.length; j++) {
               data2.cards.id = result.lanes[i].cards[j].id.toString();
               data2.cards.title = result.lanes[i].cards[j].title;
               data2.cards.description = result.lanes[i].cards[j].description;
               data.lanes.cards.push(data2.cards);
             }
             this.state.lanes.push(data.lanes);
           }
           console.log(this.state.lanes);
           this.setState({ data: data.lanes });
       }.bind(this)
     });
  }

  render() {
    return (
      <Board
        data={this.state}
        draggable
        handleDragEnd={handleDragEnd}
      />
    )
  }
}

export default App1;
