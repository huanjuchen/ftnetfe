import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router,Route} from "react-router-dom";
// import Hello from "./component/Hello"
import MainPage from "./component/MainPage"




ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path="/" component={MainPage}/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
