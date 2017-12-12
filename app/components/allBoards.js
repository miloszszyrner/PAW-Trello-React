import React from "react";
import $ from "jquery";
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';

class AllBoards extends React.Component {
  constructor(){
      super()
        this.state = {
          data: []
        }
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
    return (
      <table>
        <tbody>{this.state.data.map(function(item, key) {
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
                  </tr>
                )

             })}</tbody>
       </table>
     )
  }
}

export default AllBoards;
