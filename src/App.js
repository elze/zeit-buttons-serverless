import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

import {
	TOGGLE_BUTTON,
	toggleButton
} from './actions/actions'

class App extends Component {

  static defaultProps = {
    //button_text: "Aquamarine", class_name: "appbutton-default"
    primary_term: "C#",
  //primarySkills: [{primary_term: "C#"}, {primary_term: ".NET"}, {primary_term: "Javascript"}, {primary_term: "Angular.js"}, {primary_term: "React.js"}], 
  associated_terms: [{
    "number_of_times": 50,
    "ratio": "0.500",
    "secondary_term": "rest"
     }, 
     {
      "number_of_times": 76,
      "ratio": "0.760",
      "secondary_term": "javascript"
    },
    {
      "number_of_times": 137,
      "ratio": "0.93",
      "secondary_term": "asp"
    },
    {
      "number_of_times": 65,
      "ratio": "0.6",
      "secondary_term": "sql server"
    }            
  ],     
  //showResults: showResultsHash
  //showResults: {"C#": false, ".NET": false, "Javascript": false, "Angular.js": false, "React.js": false}
  showResult: false
  }

  constructor(props) {
    super(props);
  }

  //dispatchButtonToggle(bText) {
  dispatchButtonToggle(primaryTerm, showRes) {
	  this.props.store.dispatch(toggleButton(showRes));
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to SkillClusters!</h1>
        </header>
          <button className={'btn btn-info btn-md button-with-margin ' + this.props.class_name} href="none" onClick={() => this.dispatchButtonToggle(this.props.primary_term, this.props.showResult)}>{this.props.primary_term}</button>
          <div>
            { 
              this.props.showResult ? 
              <span> {
              this.props.associated_terms.map((secondarySkill) => 
              <button className="btn btn-outline-dark button-with-margin">{ secondarySkill.secondary_term }</button>
              )
            }
              </span>
              : null 
            }
          </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showResult: state.showResult
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({toggleButton}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

//export default App;
