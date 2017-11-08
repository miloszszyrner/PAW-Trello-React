import React from "react";
import { render } from "react-dom";
import $ from "jquery";

class AllBoards extends React.Component {
  constructor(){
      super()
        this.state = {
          data: []
        }

    }
  render() {
    const dUrl = "http://localhost:9080/myapp/boards";
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
return (
  <table>
    <tbody>{this.state.data.map(function(item, key) {

           return (
              <tr key = {key}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
              </tr>
            )

         })}</tbody>
   </table>
 )
  }
}

render(<AllBoards />, document.getElementById('root'));
