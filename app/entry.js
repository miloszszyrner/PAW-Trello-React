require("./style.css");
//document.write(require("./content.js"));
import React from "react";
import { render } from "react-dom";
import $ from "jquery";

class Test extends React.Component {
  constructor(){
      super()
        this.state = {
          data: []
        }

    }
  render() {
    var aaa = 'test';
    const dUrl = "http://jsonplaceholder.typicode.com/posts";
    var result = 'hmm';
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
                  <td>{item.userId}</td>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.body}</td>
              </tr>
            )

         })}</tbody>
   </table>
)
  }
}

render(<Test />, document.getElementById('root'));
