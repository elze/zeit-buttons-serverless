import React, {useRef, useEffect} from "react";
//import ReactDOM from 'react-dom';
import Alert from 'react-bootstrap/Alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Link, useLocation, useParams } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'
import utils from './Utils';
import { useSelector } from 'react-redux';
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
	 let location = useLocation();
	 const { trackPageView, trackEvent } = useMatomo();
	 console.log("PrimarySkillComponent begins");
	 
	const [primarySkill, setPrimarySkill] = React.useState([]);
	//const {loading, primarySkill, error} = useSelector((state) => ({loading: state.loading, primarySkill: state.primarySkill, error: state.error }));
	const query = useQuery();
	let sortBy = sortByRatio;
	const sortParam = query.get("sort");
	if (sortParam === "name") {
		sortBy = sortAlphabetically;
	}
	const primaryTermRef = useRef(); 
	primaryTermRef.current = primaryTerm;
	
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
	
	useEffect(() => {    
		async function getPrimarySkill(skillName) {
			const response = await fetch(`/api/primarySkill/${skillName}`);
			let primarySkillCombo;
			if (response.status !== 200) {
				const error = await response.json();
				const errorMessage = error.error?.message;
				trackEvent({ category: `primarySkill ${skillName} retrieval error`, action: errorMessage });
				primarySkillCombo = {pSkill: {}, error: `Server error: ${errorMessage}`};
				console.log(`getPrimarySkill: an error occurred: primarySkillCombo = ${JSON.stringify(primarySkillCombo)}`);
			}			
			else {
				const body = await response.json();			
				console.log(`getExcerptsFromJobs: got response.json() ; response.status = ${response.status}`);
				primarySkillCombo = {pSkill: body, error: null};
			}
			
			//setPrimarySkill(primarySkill);
			setPrimarySkill(primarySkillCombo);
			//setPrimarySkillState({loading: false, primarySkill: body});
		}
		//setPrimarySkillState({loading: true, primarySkill: {}});
		getPrimarySkill(primaryTerm);

	}, []);		
  return (
	<>	
	 <div className="text-center" style={{ display: (primarySkill.pSkill?.primary_term || primarySkill.error) ? "none" : "block" }}>
		<Spinner animation="border" role="status">
		  <span className="sr-only">Loading...</span>
		</Spinner>	
	 </div>
	 <div className="text-center" style={{ display: primarySkill.error ? "block" : "none" }}>
	 <Alert variant="danger">
		An error occurred: { primarySkill.error }
	 </Alert>
	 </div>	 
     <div>
		<button key={primaryTermRef.current} className={'btn btn-info btn-md button-with-margin '} href="none">
             {primaryTermRef.current}
        </button>
		<a href={ '/primarySkill/' + primarySkill.pSkill?.primary_term + '?sort=name'} className={'btn btn-sm button-with-margin ' + getAdditionalButtonClass(sortParam, 'name')}>Sort by name</a>&nbsp;
		<a href={ '/primarySkill/' + primarySkill.pSkill?.primary_term + '?sort=ratio'} className={'btn btn-sm button-with-margin ' + getAdditionalButtonClass(sortParam, 'ratio')}>Sort by ratio</a>
        <div>
            <span> {
            primarySkill?.pSkill?.associated_terms?.sort(sortBy).map((secondarySkill) => {
              return (
				<span key={secondarySkill.id}>
				<a href= {`/jobsnippets/${secondarySkill.id}/${primarySkill.pSkill?.primary_term}/${secondarySkill.secondary_term}`} key={secondarySkill.secondary_term} key={secondarySkill.secondary_term} className={'btn btn-outline-dark button-with-margin ' + utils.getButtonColor(secondarySkill.ratio)}>{ secondarySkill.secondary_term }&nbsp;<span className={"small"}>{secondarySkill.ratio}</span></a>
				<Link to={{pathname: `/jobsnippetmodal/${secondarySkill.id}/${primarySkill.pSkill?.primary_term}/${secondarySkill.secondary_term}`, state: { background: location }}}>
				 <FontAwesomeIcon icon={faPaperPlane} />
				</Link>
			</span>
		)
            }
			)
            }
            </span>
        </div>
     </div>
	</>
  );
}		