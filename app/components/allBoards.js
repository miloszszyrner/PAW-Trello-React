import React from "react";
import $ from "jquery";
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';

class AllBoards extends React.Component {
  constructor(){
      super()
        this.state = {
          data: []
        }
    }

    componentDidMount() {
      var dUrl = "http://localhost:9080/myapp/";
      dUrl += this.props.match.params.id;
      dUrl += "/boards"
      var result = '';
      $.ajax(
         {
           url: dUrl,

           success: function(result){
               //console.log(result);
               this.setState({data: result});
           }.bind(this)
         }
      );
    }

  render() {
    return (
      <table>
        <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>
                        <Link to={`/board/${item.userId}/${item.id}`}>
                          {item.name}
                        </Link>
                      </td>
                  </tr>
                )

             })}</tbody>
       </table>
     )
  }
}

export default AllBoards;
