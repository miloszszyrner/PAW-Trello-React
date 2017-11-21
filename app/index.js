require("./style.css");
import React from 'react';
import { render } from "react-dom";

import App from "./components/board";
import AllBoards from "./components/allBoards.js";
import AddForm from "./components/newBoard.js";
import Login from "./components/login.js";
import Register from "./components/register.js";
import Choose from "./components/chooseBoard.js";

render(<App />, document.getElementById('board'));
render(<AllBoards />, document.getElementById('root'));
render(<AddForm />, document.getElementById('newBoard'));
// render(<Choose />, document.getElementById('choose'));
// render(<Login />, document.getElementById('login'));
// render(<Register />, document.getElementById('register'));
