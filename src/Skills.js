import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExternalLinkAlt, faEllipsisH } from '@fortawesome/free-solid-svg-icons'

import { PrimarySkillComponent } from './PrimarySkillComponent'

import {
	toggleButton,
	stateFromBackend
} from './actions/actions'

import utils from './Utils';

/*
  function getButtonColor(ratio){
	  const ratioNum = parseFloat(ratio);
	  if (ratioNum <= 0.2) {
		  //return "#ebf6f9";
		  return "color_02"
	  }
	  if (ratioNum <= 0.4) {
		  return "color_04"
		  //return "#d8ecf3";
	  }
	  if (ratioNum <= 0.6) {
		  return "color_06"
		  //return "#c4e2ed";
	  }
	  if (ratioNum <= 0.8) {
		  return "color_08"
		  //return "#b1d9e7";
	  }
	  //if (ratioNum <= 1.0) {
		  return "color_10";
		//return "#9dcfe1";
	  //}
  }  
*/

export class Skills extends Component {
	static defaultProps = { primary_skills: []};

  callApi = async () => {
    const response = await fetch('/api/skills');
	//const response = await fetch('/api/structskills');
	console.log(`callApi: returned from fetch`);
    const body = await response.json();
	console.log(`callApi: got response.json() ; response.status = ${response.status}`);
    if (response.status !== 200) {
		throw Error(body.message);
	}
    return body;
  };	
  
  componentDidMount() {
    this.callApi()
	  .then(res => {
		console.log(`componentDidMount: res.primary_skills = ${res.primary_skills}`);
		this.props.setStateFromBackend(res.primary_skills);
		console.log(`componentDidMount: this.props.primary_skills = ${this.props.primary_skills}`);
	  })
      .catch(err => console.log(err));
  }   	  

  render() {
	      return (
      <div className="Skills">
        <header>
          <h1 className="Skills-title">Welcome to SkillClusters!</h1>
        </header>
        {
          this.props.primary_skills.map((primarySkill, ind) => { 
            return (
			 <div key={primarySkill.primary_term}>
				<button key={primarySkill.primary_term} className={'btn btn-info btn-md button-with-margin ' + this.props.class_name} href="none"
					onClick={() => this.props.toggleSecondarySkills(ind)}>
					 {primarySkill.primary_term}
				</button>
				<a href= { '/primarySkill/' + primarySkill.primary_term + '?sort=name'} ><FontAwesomeIcon icon={faExternalLinkAlt} /></a>
				<div>
				  { 
					primarySkill.showResult ? 
					<>
					<span> {
						primarySkill.associated_terms.map((secondarySkill) => {
						  return <a href= { '/jobsnippets/' + secondarySkill.id} key={secondarySkill.secondary_term} className={'btn btn-outline-dark button-with-margin ' + utils.getButtonColor(secondarySkill.ratio)} >{ secondarySkill.secondary_term }&nbsp;<span className={"small"}>{secondarySkill.ratio}</span></a>
						}
						)
					}
					</span>
					{
						primarySkill.totalCount > primarySkill.associated_terms.length ? <a href= { '/primarySkill/' + primarySkill.primary_term} ><FontAwesomeIcon icon={faEllipsisH} /></a> : ""
					}
					</>
					: console.log(`${primarySkill.primary_term}: No showResult for you`)
				  }
				</div>
			 </div>
			)
          }
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
	primary_skills: state.primary_skills
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleSecondarySkills: (ind) => dispatch(toggleButton(ind)),
	setStateFromBackend: (primary_skills) => dispatch(stateFromBackend(primary_skills))
  };
}



export default connect(mapStateToProps, mapDispatchToProps)(Skills);
