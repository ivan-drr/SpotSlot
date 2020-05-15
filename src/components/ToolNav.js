import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCloudDownloadAlt, faEye } from '@fortawesome/free-solid-svg-icons';

import '../styles/ToolNav.css';

class ToolNav extends Component {
  render() {
    return (
      <div id="toolNav" className="flex-column fixed-right rounded">
        <Nav>
          <Nav.Link disabled><Button disabled className="button" variant="primary"><FontAwesomeIcon icon={faEye} /></Button></Nav.Link>
          <Nav.Link disabled><Button disabled className="button" variant="danger"><FontAwesomeIcon icon={faTrash} /></Button></Nav.Link>
          <Nav.Link disabled><Button disabled className="button" variant="info"><FontAwesomeIcon icon={faCloudDownloadAlt} /></Button></Nav.Link>
        </Nav>
      </div>
    );
  }
}

export default ToolNav;
