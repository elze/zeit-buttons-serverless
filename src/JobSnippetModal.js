import React, {useState} from "react";
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";

import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

import { JobPerSkillPairComponent } from './JobPerSkillPairComponent';

export function JobSnippetModal(props) {
  let { id, primaryTerm, secondaryTerm } = useParams();
  var history = props.history;
  const [show, setShow] = useState(true);

  const handleClose = () => { 
	setShow(false);	
	history.goBack();
	//console.log(`handleClose: show = ${show}`);
  }

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
