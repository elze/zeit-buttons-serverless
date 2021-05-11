import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation,
  useParams
} from "react-router-dom";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useMatomo } from '@datapunt/matomo-tracker-react'

import { JobPerSkillPairComponent } from './JobPerSkillPairComponent';
import { JobSnippetModal } from './JobSnippetModal';
import { PrimarySkillComponent} from './PrimarySkillComponent'
import Skills from './Skills';
import logo from './logo.svg';
import './App.css';

import {
	toggleButton,
	stateFromBackend
} from './actions/actions'


export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}	

export function App() {
	let location = useLocation();
	
	let background = location.state && location.state.background;	
	return (
      <div>
	  <Navbar bg="light" expand="lg">
		  <Nav.Link href="/">Home</Nav.Link>
		  <Nav.Link href="/allskills">Skills</Nav.Link>
		  <Nav.Link href="/details/2">Details</Nav.Link>
	 </Navbar>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch location={background || location}>
          <Route path="/allskills">
            <Skills />
          </Route>
		  <Route path="/details/:id">
			<DetailsPage/>
		  </Route>
		  <Route path="/primarySkill/:primaryTerm">
			<PrimarySkillComponent/>
		  </Route>
		  <Route exact path="/jobsnippetmodal/:id/:primaryTerm/:secondaryTerm" component={JobSnippetModal} />		  
		  <Route path="/jobsnippets/:id/:primaryTerm/:secondaryTerm">
			<JobPerSkillPairComponent/>
		  </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
		{background && <Route exact path="/jobsnippetmodal/:id/:primaryTerm/:secondaryTerm" component={JobSnippetModal}  />}
      </div>
  );
}

function Home() {
	const { trackPageView, trackEvent } = useMatomo();
    trackPageView({
      documentTitle: 'About', // optional
	  //href: `http://localhost:3000/about`, // optional
	  href: `https://zeit-buttons-serverless-elze.vercel.app/about`, // optional	  
    });	 		
  return (
  <div style={{padding: "10px"}}>  
  <h2>About</h2>
  <p>This application was written for Women Who Code Austin, TX React.js meetup to demonstrate React.js routes.</p>
  <p><a href="https://zeit-buttons-serverless-elze.vercel.app/allskills">It is deployed on Vercel here</a>. Its backend runs Express.js. </p>
  <p><a href="https://github.com/elze/zeit-buttons-serverless">The source code is here.</a></p>
  <p><a href="http://www.geekitude.com">The author's website is here.</a></p>
  </div>); 
}

function DetailsPage() {
	let { id } = useParams();
	const { trackPageView, trackEvent } = useMatomo();
    trackPageView({
      documentTitle: 'Details', // optional
	  //href: `http://localhost:3000/details/2`, // optional
	  href: `https://zeit-buttons-serverless-elze.vercel.app/details/2`, // optional	  
    });	 		
	return (		
		 <h2>The simplest demo of a parameterized route. The parameter id is equal to { id }</h2>
	);
}	

export function Test() {
	return <h2>This is a test page</h2>
}

//export default connect(mapStateToProps, mapDispatchToProps)(App);
