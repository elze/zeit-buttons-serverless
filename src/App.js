import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import { JobPerSkillPairComponent } from './JobPerSkillPairComponent';
import { PrimarySkillComponent } from './PrimarySkillComponent'
import Skills from './Skills';
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
            <li>
              <Link to="/details/2">Details</Link>
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
		  <Route path="/details/:id">
			<DetailsPage/>
		  </Route>
		  <Route path="/jobsnippets/:id">
			<JobPerSkillPairComponent/>
		  </Route>			
		  <Route path="/primarySkill/:primaryTerm">
			<PrimarySkillComponent/>
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
  return <h2>About: all about SkillClusters</h2>;
}

function DetailsPage() {
	let { id } = useParams();
	return (		
		 <h2>Here is a detail with id { id }</h2>
	);
}	

//export default connect(mapStateToProps, mapDispatchToProps)(App);
