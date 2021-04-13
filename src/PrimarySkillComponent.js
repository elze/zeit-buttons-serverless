import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useParams } from "react-router-dom";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import utils from './Utils';

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
	 console.log("PrimarySkillComponent begins");
	const [primarySkill, setPrimarySkill] = React.useState([]);
	const query = useQuery();
	let sortBy = sortByRatio;
	const sortParam = query.get("sort");
	if (sortParam === "name") {
		sortBy = sortAlphabetically;
	}
	
	React.useEffect(() => {    
		async function getPrimarySkill(skillName) {
			const response = await fetch(`/api/primarySkill/${skillName}`);
			const body = await response.json();			
			console.log(`getExcerptsFromJobs: got response.json() ; response.status = ${response.status}`);
			if (response.status !== 200) {
				throw Error(body.message);
			}
			setPrimarySkill(body);
		}
		getPrimarySkill(primaryTerm);

	}, []);		
  return (
     <div key={primarySkill.primary_term}>
		<button key={primarySkill.primary_term} className={'btn btn-info btn-md button-with-margin '} href="none">
             {primarySkill.primary_term}
        </button>
		<a href={ '/primarySkill/' + primarySkill.primary_term + '?sort=name'} className={'btn btn-sm button-with-margin ' + getAdditionalButtonClass(sortParam, 'name')}>Sort by name</a>&nbsp;
		<a href={ '/primarySkill/' + primarySkill.primary_term + '?sort=ratio'} className={'btn btn-sm button-with-margin ' + getAdditionalButtonClass(sortParam, 'ratio')}>Sort by ratio</a>
        <div>
            <span> {
            primarySkill?.associated_terms?.sort(sortBy).map((secondarySkill) => {
              return <a href= {'/jobsnippets/' + secondarySkill.id} key={secondarySkill.secondary_term} key={secondarySkill.secondary_term} className={'btn btn-outline-dark button-with-margin ' + utils.getButtonColor(secondarySkill.ratio)}>{ secondarySkill.secondary_term }&nbsp;<span className={"small"}>{secondarySkill.ratio}</span></a>
            }
            )
            }
            </span>
        </div>
     </div>
	);
}		