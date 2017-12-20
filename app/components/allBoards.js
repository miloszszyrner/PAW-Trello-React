import React from "react";
import $ from "jquery";
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';

class AllBoards extends React.Component {
  constructor(){
      super()
        this.state = {
          data: []
        }
        this.deleteBoard = this.deleteBoard.bind(this);
        this.changeVisibility = this.changeVisibility.bind(this);
        console.log(this);
    }

    componentDidMount() {
      var Url = "http://localhost:9080/myapp/boards";
      $.ajax(
         {
           type: 'GET',
           url: Url,
           headers: { 'Authorization': this.props.location.state.authorization},
           success: function(result){
               console.log(result);
                for (var i = 0; i < result.length; i++) {
                    result[i].authorization = this.props.location.state.authorization;
                }
               this.setState({data: result});
           }.bind(this)
         }
      );
    }

  render() {
    var _this = this;
    return (
      <table class="table table-striped">
        <tbody>
          <tr>
            <td>
              <center>
                Private
              </center>
            </td>
          </tr>
          {this.state.data.map(function(item, key) {
            if(item.status == 'CREATED' && item.visibility == 'PRIVATE') {
               return (
                   <tr key = {key}>
                       <td>
                         <Link
                           to={{
                           pathname: `/board/${item.id}`,
                           state: { authorization: item.authorization }
                         }}>
                           {item.name}
                         </Link>
                       </td>
                       <td align='Right'>
                         <button class="btn btn-default" onClick={() => _this.changeVisibility(item.id)}>change to public</button>
                       </td>
                       <td align='Right'>
                         <button class="btn btn-danger" onClick={() => _this.deleteBoard(item.id)}>Remove</button>
                       </td>
                   </tr>
                )
              }
             })}
             <tr>
               <td>
                 <center>
                   Public
                 </center>
               </td>
             </tr>
             {this.state.data.map(function(item, key) {
               if(item.status == 'CREATED' && item.visibility == 'PUBLIC') {
                  return (
                      <tr key = {key}>
                          <td>
                            <Link
                              to={{
                              pathname: `/board/${item.id}`,
                              state: { authorization: item.authorization }
                            }}>
                              {item.name}
                            </Link>
                          </td>
                          <td align='Right'>
                            <button class="btn btn-default" onClick={() => _this.changeVisibility(item.id)}>change to private</button>
                          </td>
                          <td align='Right'>
                            <button class="btn btn-danger" onClick={() => _this.deleteBoard(item.id)}>Remove</button>
                          </td>
                      </tr>
                   )
                 }
                })}
             <tr>
              <td>
                <Link
                  to={{
                  pathname: `/addboard`,
                  state: { authorization: this.props.location.state.authorization }
                }}>
                  Add Board
                </Link>
              </td>
            </tr>
         </tbody>
       </table>
     )
  }

  deleteBoard(id) {
    var Url = 'http://localhost:9080/myapp/boards/';
    Url += id;
    var _this = this;
    fetch(Url, {
      method: 'DELETE',
      headers: {
        'Authorization': this.props.location.state.authorization
      }
    }).then(function(response) {
      var data = [];
      for(var i = 0; i < _this.state.data.length; i++) {
        if(_this.state.data[i].id != id) {
          data.push(_this.state.data[i]);
        }
      }
      _this.setState({data: data});
    })
  }

  changeVisibility(id) {
    var status;
    for(var i = 0; i < this.state.data.length; i++) {
      if(this.state.data[i].id == id) {
        if(this.state.data[i].visibility == 'PUBLIC') {
          status = 'PRIVATE';
        }
        if(this.state.data[i].visibility == 'PRIVATE') {
          status = 'PUBLIC';
        }
      }
    }
    var Url = 'http://localhost:9080/myapp/boards/';
    Url += id;
    var _this = this;
    $.ajax(
      {
        type: 'PUT',
        url: Url,
        headers: {
          'Authorization': this.props.location.state.authorization,
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          'visibility': status
        }),
        success: function(result){
          for(var i = 0; i < this.state.data.length; i++) {
            if(this.state.data[i].id == id) {
              if(this.state.data[i].visibility == 'PUBLIC') {
                this.state.data[i].visibility = 'PRIVATE';
              }
              if(this.state.data[i].visibility == 'PRIVATE') {
                this.state.data[i].visibility = 'PUBLIC';
              }
            }
          }
          this.setState({data: this.state.data});
        }.bind(this)
      }
    );
  }

}

export default AllBoards;
