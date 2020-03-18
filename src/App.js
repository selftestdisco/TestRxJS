import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//import thunk from 'redux-thunk';

import Home from "./components/Home/home";
import Login from "./components/Login/login";
import Affiliates from "./components/Affiliates/affiliates";
import Register from "./components/Register/register";
import { Test, addReducer }  from "./components/Test";

import { createEpicMiddleware } from 'redux-observable';
import epics from './components/Test/Actions/epics';

const epicMiddleware = createEpicMiddleware();

function App() {
  return (
    <Provider store = {createStore(
      addReducer,
      {value : 0, userData: {}, gitUserData: {}},
      applyMiddleware(epicMiddleware))}>
        {epicMiddleware.run(epics)}
    <Router>
      <Switch>
        <Route path="/affiliates" component={Affiliates} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/test" component={Test} />
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
    </Provider>
  );
}

export default App;
