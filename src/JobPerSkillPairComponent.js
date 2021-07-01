import React, {useRef, useEffect} from "react";
import { useParams } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner'

import { useMatomo } from '@datapunt/matomo-tracker-react'

export function JobPerSkillPairComponent(props) {
	let { id, primaryTerm, secondaryTerm } = useParams();
	if (props.id && props.primaryTerm && props.secondaryTerm) {
		id = props.id;
		primaryTerm = props.primaryTerm;
		secondaryTerm = props.secondaryTerm;
	}
	 const { trackPageView, trackEvent } = useMatomo();
	 console.log("JobPerSkillPairComponent begins");
	 //const [excerptsFromJobs, setExcerptsFromJobs] = React.useState([]);
	 const [excerptState, setExcerptState] = React.useState([]);
	 const primaryTermRef = useRef(); 
	 const secondaryTermRef = useRef(); 
	 primaryTermRef.current = primaryTerm;
	 secondaryTermRef.current = secondaryTerm;
	
    trackPageView({
      documentTitle: `JobPerSkillPairComponent ${id} : ${primaryTerm} - ${secondaryTerm}`, // optional
	  //href: `http://localhost:3000/jobsnippets/${id}`, // optional
	  href: `https://zeit-buttons-serverless-elze.vercel.app/jobsnippets/${id}`, // optional
	  /*
      customDimensions: [
        {
          id: 1,
          value: 'JobPerSkillPair',
        },
      ], // optional
	  */
    });	 	
	
	
	useEffect(() => {    
		async function getExcerptsFromJobs(skPairId) {
			let excerptStateCombo;
			const response = await fetch(`/api/jobsPerSkillPair/${skPairId}`);
			if (response.status !== 200) {
				//throw Error(body.message);
				const error = await response.json();
				const errorMessage = error.error?.message;
				trackEvent({ category: `jobsPerSkillPair ${skPairId} - ${primaryTermRef?.current}, ${secondaryTermRef?.current} retrieval error`, action: errorMessage });				
				excerptStateCombo = {excerptsFromJobs: [], error: errorMessage};
				console.log(`getExcerptsFromJobs: an error occurred: excerptStateCombo = ${JSON.stringify(excerptStateCombo)}`);
			}
			else {
				const excerpts = await response.json();			
				if (!excerpts || excerpts.length === 0) {
					const errorMessage = `Job excerpts for skill pair ${skPairId} - ${primaryTermRef?.current}, ${secondaryTermRef?.current} not found.`;
					trackEvent({ category: `jobsPerSkillPair ${skPairId} - ${primaryTermRef?.current}, ${secondaryTermRef?.current} retrieval error`, action: errorMessage });
					excerptStateCombo = {excerptsFromJobs: [], error: errorMessage};
				}
				else {
				//console.log(`getExcerptsFromJobs: got response.json() ; response.status = ${response.status}`);
					excerptStateCombo = {excerptsFromJobs: excerpts, error: null};				
				}
			}
			//setExcerptsFromJobs(body);
			setExcerptState(excerptStateCombo);
		}
		getExcerptsFromJobs(id);

	}, []);		
	
	
	return (
	
		<Container className="JobPerSkillPairComponent">
		<h3>Snippets of job ads that contain { primaryTermRef.current } and { secondaryTermRef.current } </h3>
		  <div className="text-center" style={{ display: excerptState.excerptsFromJobs && excerptState.excerptsFromJobs.length > 0 || excerptState.error ? "none" : "block" }}>
			<Spinner animation="border" role="status">
			  <span className="sr-only">Loading...</span>
			</Spinner>	
		  </div>
		 <div className="text-center" style={{ display: excerptState.error ? "block" : "none" }}>
		 <Alert variant="danger">
			An error occurred: { excerptState.error }
		 </Alert>
		 </div>	 
		
		  <div className="excerpt-list" style={{ display: excerptState.excerptsFromJobs && excerptState.excerptsFromJobs.length > 0 ? "block" : "none" }}>
			{
				excerptState?.excerptsFromJobs?.map(excerpt => {
					//console.log(`excerpt = ${JSON.stringify(excerpt.job_ad_snippet)}`);
					return (
					<Row key={excerpt.job_file_name} style={{ marginTop: '10px' }}>
		 <Card border="primary" style={{ width: '35rem' }}>
		  <Card.Body>
		  <ListGroup> {
			  excerpt.job_ad_snippet.split("...").map(snippet => { 
				snippet = `... ${snippet} ...`;
				return (
					<ListGroupItem style={{ border: 'none' }} key={snippet} dangerouslySetInnerHTML={{ __html: snippet }}/>
				)
			  })
		  }
		  </ListGroup>		  
		  </Card.Body>
		 </Card>
			</Row>
				  )
				})
			}
		  </div>
		</Container>	
	
	);
}		