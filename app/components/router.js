import React from 'react';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';

import AddForm from "./newBoard.js";
import App from "./board";
import AllBoards from "./allBoards.js";
import Login from "./login.js";
import Register from "./register.js";
// import Choose from "./chooseBoard.js";

class RouterLinks extends React.Component {
  render() {
    var roll = "1";
    return (
      <Router>
        <div className='container'>
          <ul className='nav'>
            <li>
              <Link exact activeClassName='active' to='/allboards'>
                AllBoards
              </Link>
            </li>
            <li>
              <Link exact activeClassName='active' to='/board'>
                board
              </Link>
            </li>
            <li>
              <Link exact activeClassName='active' to='/addboard'>
                Add Board
              </Link>
            </li>
            <li>
              <Link exact activeClassName='active' to='/login'>
                login
              </Link>
            </li>
            <li>
              <Link exact activeClassName='active' to='/register'>
                register
              </Link>
            </li>
          </ul>
          <Route exact path='/allboards' component={AllBoards} />
          <Route exact path='/board' component={App} />
          <Route exact path='/addboard' component={AddForm} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </div>
      </Router>
    )
  }
}

export default RouterLinks;
