import React from 'react';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';

import AddForm from "./newBoard.js";
import App from "./board";
import App1 from "./board1";
import AllBoards from "./allBoards.js";
import Login from "./loginUser.js";
import Register from "./registerUser.js";
// import Choose from "./chooseBoard.js";

class RouterLinks extends React.Component {
  render() {
    var roll = "1";
    return (
      <Router>
        <div className='container'>
        <nav class="navbar navbar-default">
        <div class="container-fluid">
          <ul class="nav navbar-nav">
          <li>
          <Link to='/allboards'>
            AllBoards
          </Link>
        </li>
        <li>
          <Link to='/board2'>
            board
          </Link>
        </li>
        <li>
          <Link to='/addboard'>
            Add Board
          </Link>
        </li>
        <li>
          <Link to='/login'>
            login
          </Link>
        </li>
        <li>
          <Link to='/register'>
            register
          </Link>
        </li>
          </ul>
        </div>
      </nav>
          <Route exact path='/board2/' component={App} />
          <Route exact path='/allboards' component={AllBoards} />
          <Route exact path='/board/:id' component={App1} />
          <Route exact path='/addboard' component={AddForm} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </div>
      </Router>
    )
  }
}

export default RouterLinks;
