import React from 'react';
import Board from 'react-trello';
import { render } from "react-dom";
//import $ from "jquery";
var idOfLane;
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

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
    console.log('drag ended')
    console.log(`cardId: ${cardId}`)
    console.log(`sourceLaneId: ${sourceLaneId}`)
    console.log(`targetLaneId: ${targetLaneId}`)
}

const onLaneClick = (laneId) => {
  idOfLane=laneId;
  $('#laneId').val(laneId);
  $('#myModal').modal('show');
    console.log(`laneId: ${laneId}`)

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
        this.addList = this.addList.bind(this);
        this.removeList = this.removeList.bind(this);
        this.addCard = this.addCard.bind(this);
        this.handleNameOfListChange = this.handleNameOfListChange.bind(this);
    }



  render() {

    /*const dUrl = "http://localhost:9080/myapp/boards/1/rolls";
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
    );*/

    return (
      <div className="App-intro">
                    <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleNameOfListChange} />
                    <button onClick={this.addList} style={{margin: 5}}>
                    Add List
                    </button>
                    <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <button type="button" class="close" data-dismiss="modal">&times;</button>

                        </div>
                        <div class="modal-body">
                          <input type="hidden" id="laneId"/>

                            <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={this.removeList}>Remove List</button>
                              <button type="button" class="btn btn-success" data-dismiss="modal" onClick={this.addCard}>Add new card</button>
                        </div>

                      </div>

                    </div>
                  </div>
      <Board
                      data={this.state}
                      draggable
                      handleDragEnd={handleDragEnd}
                      onLaneClick={onLaneClick}
               />

        </div>
    )
     }
     addCard() {
       var nextState = this.state.lanes;
       for(var i=0;i<nextState.length;i++){
          if(nextState[i].id==idOfLane){
            var nextState2 = this.state.lanes[i].cards;
            nextState2.push ({id:"Card"+(this.state.lanes[i].cards.length+1+"."+i),
            title: "Card"+(this.state.lanes[i].cards.length+1+"."+i)});

          }
        }
         //nextState.push();
         this.setState(this.state.lanes);
     }
     addList() {
        // var nextState = this.state.lanes;
         this.state.lanes.push ({id:"lane"+(this.state.lanes.length+1),
         title: this.state.name,
         cards: []});
         //nextState.push();
         this.setState(this.state.lanes);
     }
     handleNameOfListChange(e) {
       this.setState({name: e.target.value});
     }
     removeList(){
       var nextState = this.state.lanes;
       for(var i=0;i<nextState.length;i++){
          if(nextState[i].id==idOfLane){
            nextState.splice (i,1);
          }
       }


       this.setState(nextState);
     }
}

render(<App />, document.getElementById('board'));
