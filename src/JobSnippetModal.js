import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams } from "react-router-dom";
import { JobPerSkillPairComponent } from './JobPerSkillPairComponent';

import { useMatomo } from '@datapunt/matomo-tracker-react'

export function JobSnippetModal(props) {
  var history = props.history;
  const [show, setShow] = useState(true);
  const { trackPageView, trackEvent } = useMatomo();
  let { id, primaryTerm, secondaryTerm } = useParams();

  const handleClose = () => { 
	setShow(false);	
	history.goBack();
	//console.log(`handleClose: show = ${show}`);
  }

    trackPageView({
      documentTitle: `JobSnippetModal id = ${id} primaryTerm = ${primaryTerm} secondaryTerm = ${secondaryTerm}`, // optional
	  //href: `http://localhost:3000/primarySkill/${primaryTerm}?sort=${sortParam}`, // optional
	  href: `https://zeit-buttons-serverless-elze.vercel.app/JobSnippetModal/${id}/${primaryTerm}/${secondaryTerm}`, // optional	  
      customDimensions: [
        {
          id: 1,
          value: 'Primary skill',
        },
      ], // optional
    });	 	
  
  
  return (
      <Modal show={show} onHide={handleClose} scrollable="true">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
			<JobPerSkillPairComponent/>
		</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
