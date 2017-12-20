import React from 'react';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';

import AddForm from "./newBoard.js";
import App from "./board";
import App1 from "./board1";
import AllBoards from "./allBoards.js";
import Login from "./loginUser.js";
import Register from "./registerUser.js";

class RouterLinks extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Route exact path='/board2/' component={App} />
          <Route exact path='/allboards' component={AllBoards} />
          <Route exact path='/board/:id' component={App1} />
          <Route exact path='/addboard' component={AddForm} />
          <Route exact path='/' component={Login} />
          <Route exact path='/register' component={Register} />
        </div>
      </Router>
    )
  }
}

export default RouterLinks;
