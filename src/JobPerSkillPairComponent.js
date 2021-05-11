import React, {useRef, useEffect} from "react";
import { useParams } from "react-router-dom";
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
	 const [excerptsFromJobs, setExcerptsFromJobs] = React.useState([]);
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
	
	
	React.useEffect(() => {    
		async function getExcerptsFromJobs(skPairId) {
			const response = await fetch(`/api/jobsPerSkillPair/${skPairId}`);
			const body = await response.json();			
			//console.log(`getExcerptsFromJobs: got response.json() ; response.status = ${response.status}`);
			if (response.status !== 200) {
				throw Error(body.message);
			}
			setExcerptsFromJobs(body);
		}
		getExcerptsFromJobs(id);

	}, []);		
	
	
	return (
	
		<Container className="JobPerSkillPairComponent">
		<h3>Snippets of job ads that contain { primaryTermRef.current } and { secondaryTermRef.current } </h3>
		  <div className="text-center" style={{ display: excerptsFromJobs && excerptsFromJobs.length > 0 ? "none" : "block" }}>
			<Spinner animation="border" role="status">
			  <span className="sr-only">Loading...</span>
			</Spinner>	
		  </div>
		
		  <div className="excerpt-list">
			{
				excerptsFromJobs.map(excerpt => {
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