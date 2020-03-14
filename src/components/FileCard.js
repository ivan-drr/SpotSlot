import React, { Component } from 'react';
import { fileType } from './Mapper';

import '../styles/FileCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

class FileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: false
    }
  }

  componentDidMount() {
    this.setState(state => {
      state.file = this.props.file;
      return state;
    });
  }

  render() {
    if (!this.state.file) return false;
    const file = this.state.file;
    return (
      <Col className="file" xs={6} sm={6} md={4} lg={3}>
        <Card id={file.metadata.name} className={file.metadata._isFile?"file-white cardFile":"folder-white cardFile"}>
            <Card.Header className={file.metadata._isFile?"fileHeader-white":"folderHeader-white"}>
              <Card.Title className={file.metadata._isFile?"fileName-white":"folderName-white"}>{file.metadata.name}</Card.Title>
            </Card.Header>

            <Card.Footer className="text-muted footer">
              {file.metadata._isFile?'Last updated: ' + file.metadata.updated + ' ago':'Click to open'}<br></br>
              {file.metadata._isFile?'Size: ' + file.metadata.size + ' - ':true}<FontAwesomeIcon icon={fileType(file.key)} />
            </Card.Footer>
        </Card>
      </Col>
    );
  }

}

export default FileCard;
