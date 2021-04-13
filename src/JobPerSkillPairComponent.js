import React from 'react';
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Row from 'react-bootstrap/Row';

export function JobPerSkillPairComponent() {
	 let { id } = useParams();
	 console.log("JobPerSkillPairComponent begins");
	const [excerptsFromJobs, setExcerptsFromJobs] = React.useState([]);
	
	React.useEffect(() => {    
		async function getExcerptsFromJobs(skPairId) {
			const response = await fetch(`/api/jobsPerSkillPair/${skPairId}`);
			const body = await response.json();			
			console.log(`getExcerptsFromJobs: got response.json() ; response.status = ${response.status}`);
			if (response.status !== 200) {
				throw Error(body.message);
			}
			setExcerptsFromJobs(body);
		}
		getExcerptsFromJobs(id);

	}, []);		
	
	
	return (
	
		<Container className="JobPerSkillPairComponent">
		  <div className="excerpt-list">
			{
				excerptsFromJobs.map(excerpt => {
					console.log(`excerpt = ${JSON.stringify(excerpt.job_ad_snippet)}`);
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