import React from 'react';
import Board from 'react-trello';
import { render } from "react-dom";

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

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    console.log('drag ended')
    console.log(`cardId: ${cardId}`)
    console.log(`sourceLaneId: ${sourceLaneId}`)
    console.log(`targetLaneId: ${targetLaneId}`)
    console.log(data.lanes[0].id);
//     data.lanes.forEach(function(element) {
//       data.lanes[1].label = "test";
//       console.log(  data.lanes[1].id);
//       if(element.id == targetLaneId) {
//         console.log(element);
//         this.forceUpdate();
//       }
//
// });
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
         //console.log(result);
         this.setState({data: result});
         data.lanes[0].id = this.state.data.id;
         data.lanes[0].title = this.state.data.name;
         data.lanes[0].cards[0].id = this.state.data.cards[0].id;
         data.lanes[0].cards[0].title = this.state.data.cards[0].title;
         data.lanes[0].cards[1].id = this.state.data.cards[1].id;
         data.lanes[0].cards[1].title = this.state.data.cards[1].title;
     }.bind(this)
   }
);


    render() {

        return  <Board
                        data={data}
                        draggable
                        handleDragEnd = {handleDragEnd}
                 />
    }
}

render(<App />, document.getElementById('board'));
