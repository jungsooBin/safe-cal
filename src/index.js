import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux'

import store from './store'
import {BrowserRouter as Router} from 'react-router-dom'
import App from "./components/App.jsx";

import style from "./styles/style.css";

ReactDOM.render(
  
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

