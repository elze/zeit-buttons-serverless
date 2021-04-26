import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import utils from './Utils';

import { useMatomo } from '@datapunt/matomo-tracker-react'

function getAdditionalButtonClass(currentSortingOrder, sortingOrder) {
	if (currentSortingOrder === sortingOrder) {
		return "btn-primary";
	}
	return "btn-light btn-outline-dark";
}

function sortAlphabetically(a, b) {
    var textA = a.secondary_term.toUpperCase();
    var textB = b.secondary_term.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
}

function sortByRatio(a, b) { 
	return parseFloat(b.ratio) - parseFloat(a.ratio);
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}	

export function PrimarySkillComponent() {
	 let { primaryTerm } = useParams();
	 const { trackPageView, trackEvent } = useMatomo();
	 console.log("PrimarySkillComponent begins");
	 
	const [primarySkill, setPrimarySkill] = React.useState([]);
	//const [primarySkillState, setPrimarySkillState] = React.useState([]);
	const query = useQuery();
	let sortBy = sortByRatio;
	const sortParam = query.get("sort");
	if (sortParam === "name") {
		sortBy = sortAlphabetically;
	}
	
    trackPageView({
      documentTitle: `Primary skill component ${primaryTerm}`, // optional
	  //href: `http://localhost:3000/primarySkill/${primaryTerm}?sort=${sortParam}`, // optional
	  href: `https://zeit-buttons-serverless-elze.vercel.app/primarySkill/${primaryTerm}?sort=${sortParam}`, // optional	  
      customDimensions: [
        {
          id: 1,
          value: 'Primary skill',
        },
      ], // optional
    });	 	
	
	React.useEffect(() => {    
		async function getPrimarySkill(skillName) {
			//setPrimarySkillState({dataLoading: true, primarySkill: {}});
			const response = await fetch(`/api/primarySkill/${skillName}`);
			const body = await response.json();			
			console.log(`getExcerptsFromJobs: got response.json() ; response.status = ${response.status}`);
			if (response.status !== 200) {
				throw Error(body.message);
			}
			setPrimarySkill(body);
			//setPrimarySkillState({dataLoading: false, primarySkill: body});
		}
		getPrimarySkill(primaryTerm);

	}, []);		
  return (
	<>
	 <div className="text-center" style={{ display: primarySkill.primary_term ? "none" : "block" }}>
	<Spinner animation="border" role="status">
	  <span className="sr-only">Loading...</span>
	</Spinner>	
	 </div>
     <div>
		<button key={primarySkill.primary_term} className={'btn btn-info btn-md button-with-margin '} href="none">
             {primarySkill.primary_term}
        </button>
		<a href={ '/primarySkill/' + primarySkill.primary_term + '?sort=name'} className={'btn btn-sm button-with-margin ' + getAdditionalButtonClass(sortParam, 'name')}>Sort by name</a>&nbsp;
		<a href={ '/primarySkill/' + primarySkill.primary_term + '?sort=ratio'} className={'btn btn-sm button-with-margin ' + getAdditionalButtonClass(sortParam, 'ratio')}>Sort by ratio</a>
        <div>
            <span> {
            primarySkill?.associated_terms?.sort(sortBy).map((secondarySkill) => {
              return <a href= {`/jobsnippets/${secondarySkill.id}/${primarySkill.primary_term}/${secondarySkill.secondary_term}`} key={secondarySkill.secondary_term} key={secondarySkill.secondary_term} className={'btn btn-outline-dark button-with-margin ' + utils.getButtonColor(secondarySkill.ratio)}>{ secondarySkill.secondary_term }&nbsp;<span className={"small"}>{secondarySkill.ratio}</span></a>
            }
            )
            }
            </span>
        </div>
     </div>
	</>
  );
}		