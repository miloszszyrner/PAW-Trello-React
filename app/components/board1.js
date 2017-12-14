import React from 'react';
import Board from 'react-trello';
import { render } from "react-dom";
//import $ from "jquery";
var idOfLane;
var idOfCard;
var LaneName;
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
          lanes: []
        }
        this.addList = this.addList.bind(this);
        this.removeList = this.removeList.bind(this);
        this.removeCard = this.removeCard.bind(this);
        this.addCard = this.addCard.bind(this);
        this.SaveChangesOfList = this.SaveChangesOfList.bind(this);
        this.SaveChangesOfCard = this.SaveChangesOfCard.bind(this);
        this.handleNameOfListChange = this.handleNameOfListChange.bind(this);
        this.NameOfListChange = this.NameOfListChange.bind(this);
        this.NameOfCardChange = this.NameOfCardChange.bind(this);
        this.DescriptionOfCardChange = this.DescriptionOfCardChange.bind(this);
        console.log(this);
    }

    componentDidMount() {
      var Url = "http://localhost:9080/myapp/boards/";
      Url += this.props.match.params.id;
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
      console.log(data2);
      $.ajax({
        type: 'GET',
         url: Url,
         headers: { 'Authorization': this.props.location.state.authorization},
         success: function(result){
             console.log(result);
             console.log(data2);
             this.state.lanes = [];
             for (var i = 0; i < result.lanes.length; i++) {
               if(result.lanes[i].status == "CREATED") {
                 data.lanes.id = result.lanes[i].id.toString();
                 data.lanes.title = result.lanes[i].title;
                 for (var j = 0; j < result.lanes[i].cards.length; j++) {
                   if(result.lanes[i].cards[j].status == "CREATED") {
                     data2.cards.id = result.lanes[i].cards[j].id.toString();
                     data2.cards.title = result.lanes[i].cards[j].title;
                     data2.cards.description = result.lanes[i].cards[j].description;
                     data.lanes.cards.push(data2.cards);
                     data2 = {
                       cards:
                       {
                         id: '', title: '', description: ''
                       }
                     }
                   }
                 }
                 this.state.lanes.push(data.lanes);
                 data = {
                   lanes:
                     {
                       id: '',
                       title: '',
                       cards: [
                       ]
                     }
                 }
               }
             }
             console.log(this.state.lanes);
             this.setState({ data: data.lanes });
         }.bind(this)
       });
    }



  render() {
    const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
        console.log('drag ended')
        console.log(`cardId: ${cardId}`)
        console.log(`sourceLaneId: ${sourceLaneId}`)
        console.log(`targetLaneId: ${targetLaneId}`)
    }

    const onLaneClick = (laneId) => {
      idOfLane=laneId;
      var nextState = this.state.lanes;
      for(var i=0;i<nextState.length;i++){
         if(nextState[i].id==idOfLane){
          this.state.nameOfList=nextState[i].title;

          console.log(`laneName: ${this.state.nameOfList}`)
         }
      }

        console.log(`laneId: ${laneId}`)


      this.setState(this.state.lanes);
      $('#laneId').val(laneId);
      $('#myModal').modal('show');

    }
    const onCardClick = (cardId,metadata,laneId) => {
      idOfCard=cardId;
      idOfLane=laneId
      var nextState = this.state.lanes;
      for(var i=0;i<nextState.length;i++){
        for(var j=0;j<nextState[i].cards.length;j++){
         if(nextState[i].cards[j].id==idOfCard){
          this.state.nameOfCard=nextState[i].cards[j].title;
          this.state.DescriptionOfCard=nextState[i].cards[j].description;
        //  console.log(`laneName: ${this.state.nameOfCard}`)
          }
         }
      }
      this.setState(this.state.lanes);
      $('#cardId').val(cardId);
      $('#myModal2').modal('show');
        console.log(`laneId: ${laneId}`)
        console.log(`CardId: ${cardId}`)


    }


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
                          <input type="text" nameOfList="nameOfList"   value={this.state.nameOfList} onChange={this.NameOfListChange} />
                          <button type="button"  data-dismiss="modal" onClick={this.SaveChangesOfList}>Save</button><br /><br />
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
                        Name<br />
                        <input type="text" nameOfCard="nameOfCard"   value={this.state.nameOfCard} onChange={this.NameOfCardChange} /><br /><br />
                        Description<br />
                        <input type="text" DescriptionOfCardOfList="DescriptionOfCard" size="70"   value={this.state.DescriptionOfCard} onChange={this.DescriptionOfCardChange} /><br /><br />

                        <table id="myTable">
                        <tr>
                            <td>
                                <input type="text" class="fname" />
                            </td>
                            <td>
                                <input type="button" value="Delete" />
                            </td>
                        </tr>

                    </table>

                        <input type="button" value="Add new"/><br/><br/>


                        <button type="button" class="btn btn-success"   data-dismiss="modal" onClick={this.SaveChangesOfCard}>Save</button>
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
         var Url = 'http://localhost:9080/myapp/boards/';
         Url += this.props.match.params.id;
         Url += '/lanes/';
         Url += idOfLane;
         Url += '/cards';
         $.ajax(
            {
              type: 'POST',
              url: Url,
              headers: {
                'Authorization': this.props.location.state.authorization,
                'Content-Type': 'application/json'
              },
              data: JSON.stringify({
                'laneId': idOfLane,
                'title': nextState2[nextState2.length - 1].title
              })
            }
         );
     }
     SaveChangesOfList() {
        console.log(`laneName: ${this.state.nameOfList}`)
        var nextState = this.state.lanes;
        for(var i=0;i<nextState.length;i++){
           if(nextState[i].id==idOfLane){
            nextState[i].title=this.state.nameOfList
           }
        }
         this.setState(this.state.lanes);
     }
     SaveChangesOfCard() {
       console.log(`cardName: ${this.state.nameOfCard}`)
        var nextState = this.state.lanes;
        for(var i=0;i<nextState.length;i++){
          for(var j=0;j<nextState[i].cards.length;j++){

           if(nextState[i].cards[j].id==idOfCard){
            nextState[i].cards[j].title=this.state.nameOfCard;
            nextState[i].cards[j].description=this.state.DescriptionOfCard;

           }
         }
        }
         this.setState(this.state.lanes);
     }
     addList() {
        // var nextState = this.state.lanes;
         this.state.lanes.push ({id:"lane"+(this.state.lanes.length+1),
         title: this.state.name,
         cards: []});
         //nextState.push();
         this.setState(this.state.lanes);
         var Url = 'http://localhost:9080/myapp/boards/';
         Url += this.props.match.params.id;
         Url += '/lanes';
         $.ajax(
            {
              type: 'POST',
              url: Url,
              headers: {
                'Authorization': this.props.location.state.authorization,
                'Content-Type': 'application/json'
              },
              data: JSON.stringify({
                'boardId': this.props.match.params.id,
                'title': this.state.name
              })
            }
         );
     }
     handleNameOfListChange(e) {
       this.setState({name: e.target.value});
     }
     NameOfListChange(e) {
       this.setState({nameOfList: e.target.value});
     }
     NameOfCardChange(e) {
       this.setState({nameOfCard: e.target.value});
     }
     DescriptionOfCardChange(e) {
       this.setState({DescriptionOfCard: e.target.value});
     }
     removeList(){
       var nextState = this.state.lanes;
       for(var i=0;i<nextState.length;i++){
          if(nextState[i].id==idOfLane){
            nextState.splice (i,1);
          }
       }
       this.setState(nextState);
       var Url = 'http://localhost:9080/myapp/boards/';
       Url += this.props.match.params.id;
       Url += '/lanes/';
       Url += idOfLane;
       fetch(Url, {
         method: 'DELETE',
         headers: {
           'Authorization': this.props.location.state.authorization
         }
       })
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
       var Url = 'http://localhost:9080/myapp/boards/';
       Url += this.props.match.params.id;
       Url += '/lanes/';
       Url += idOfLane;
       Url += '/cards/'
       Url += idOfCard;
       fetch(Url, {
         method: 'DELETE',
         headers: {
           'Authorization': this.props.location.state.authorization
         }
       })
     }
}

export default App;
