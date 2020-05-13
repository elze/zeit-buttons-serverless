import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
//import * as fromSkills from './Skills';
import * from './Skills';
import logo from './logo.svg';
import './App.css';

import {
	toggleButton,
	stateFromBackend
} from './actions/actions'


export default function App() {
return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/allskills">Skills</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/allskills">
            <Skills />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}
//export default connect(mapStateToProps, mapDispatchToProps)(App);
