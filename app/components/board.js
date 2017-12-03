import React from 'react';
import Board from 'react-trello';
import { render } from "react-dom";
//import $ from "jquery";
var idOfLane;
var idOfCard;
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
const onCardClick = (cardId,metadata,laneId) => {
  idOfCard=cardId;
  idOfLane=laneId
  $('#cardId').val(cardId);
  $('#myModal2').modal('show');
    console.log(`laneId: ${laneId}`)
    console.log(`CardId: ${cardId}`)


}

class App extends React.Component {
  constructor(){
      super()
        this.state = {
          lanes: []
        }
        this.addList = this.addList.bind(this);
        this.removeList = this.removeList.bind(this);
        this.removeCard = this.removeCard.bind(this);
        this.addCard = this.addCard.bind(this);
        this.handleNameOfListChange = this.handleNameOfListChange.bind(this);
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
      <div className="App-intro">
                    <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleNameOfListChange} />
                    <button onClick={this.addList} style={{margin: 5}}>
                    Add List
                    </button>
                    <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">                      <div class="modal-content">
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
                  <div class="modal fade" id="myModal2" role="dialog">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>

                      </div>
                      <div class="modal-body">
                        <input type="hidden" id="laneId"/>

                          <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={this.removeCard}>Remove Card</button>

                      </div>

                    </div>

                  </div>

                </div>
      <Board
                      data={this.state}
                      draggable
                      handleDragEnd={handleDragEnd}
                      onLaneClick={onLaneClick}
                      onCardClick={onCardClick}

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
       removeCard(){
         var nextState = this.state.lanes;
        for(var i=0;i<nextState.length;i++){
           for(var y=0;y<nextState[i].cards.length;y++)
            if(nextState[i].cards[y].id==idOfCard){
              nextState[i].cards.splice (y,1);
            }

       }


       this.setState(nextState);
     }
}

export default App;
