import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt, faEllipsisH } from '@fortawesome/free-solid-svg-icons'

import Spinner from 'react-bootstrap/Spinner';

import ReactPiwik from 'react-piwik';

import {
	toggleButton,
	stateFromBackend
} from './actions/actions'

import utils from './Utils';

// The commented-out line is not necessary, because ReactPiwik push function replaces _paq.push
//var _paq = window._paq = window._paq || [];

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
	  ReactPiwik.push(['trackPageView']);
	  ReactPiwik.push(['trackEvent', 'eventCategory', 'SkillsPageLoaded']);
    this.callApi()
	  .then(res => {
		//console.log(`componentDidMount: res.primary_skills = ${res.primary_skills}`);
		this.props.setStateFromBackend(res.primary_skills);
		//console.log(`componentDidMount: this.props.primary_skills = ${this.props.primary_skills}`);
	  })
      .catch(err => console.log(err));
  }   	  

  render() {
	      return (
      <div className="Skills">
        <header>
          <h1 className="Skills-title">Welcome to SkillClusters!</h1>
        </header>
		 <div className="text-center" style={{ display: this.props?.primary_skills && this.props?.primary_skills.length > 0 ? "none" : "block" }}>
			<Spinner animation="border" role="status">
			  <span className="sr-only">Loading...</span>
			</Spinner>	
		 </div>		
        {
          this.props.primary_skills.map((primarySkill, ind) => { 
            return (
			 <div key={primarySkill.primary_term}>
				<button key={primarySkill.primary_term} className={'btn btn-info btn-md button-with-margin ' + this.props.class_name} href="none"
					onClick={() => {
						const actionToBePerformed = primarySkill.showResult ? "collapsed" : "expanded";
						this.props.toggleSecondarySkills(ind); 
						// The commented-out line is not necessary, because the next line replaces it
						//_paq.push(['trackEvent', 'Skills', 'Opening a skill keyword']);
						ReactPiwik.push(['trackEvent', `Primary skill ${actionToBePerformed}`, primarySkill.primary_term]);
					}
						}>
					 {primarySkill.primary_term}
				</button>
				<a href= { '/primarySkill/' + primarySkill.primary_term + '?sort=name'} ><FontAwesomeIcon icon={faExternalLinkAlt} /></a>
				<div>
				  { 
					primarySkill.showResult ? 
					<>
					<span> {
						primarySkill.associated_terms.map((secondarySkill) => {							
						  return <a href= { `/jobsnippets/${secondarySkill.id}/${primarySkill.primary_term}/${secondarySkill.secondary_term}` } key={secondarySkill.secondary_term} className={'btn btn-outline-dark button-with-margin ' + utils.getButtonColor(secondarySkill.ratio)} >{ secondarySkill.secondary_term }&nbsp;<span className={"small"}>{secondarySkill.ratio}</span></a>
						}
						)
					}
					</span>
					{
						primarySkill.totalCount > primarySkill.associated_terms.length ? <a href= { '/primarySkill/' + primarySkill.primary_term} ><FontAwesomeIcon icon={faEllipsisH} /></a> : ""
					}
					</>
					: console.log(`${primarySkill.primary_term}: associated_terms are not shown`)
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
