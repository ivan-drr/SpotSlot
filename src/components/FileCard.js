import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { fileType, elapsedTime, sizeFilter } from './Mapper';

import '../styles/FileCard.css';

class FileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: false,
    };
  }

  componentDidMount() {
    this.setState((state) => {
      state.file = this.props.file;
      return state;
    });
  }

  render() {
    if (!this.state.file) return false;
    const { file } = this.state;
    return (
      <Col className="file fade-in" onClick={this.props.customOnClick} xs={6} sm={6} md={4} lg={3}>
        <Card id={file.key} className={file.metadata._isFile ? 'file-white cardFile' : 'folder-white cardFile'}>
          <Card.Header className={file.metadata._isFile ? 'fileHeader-white' : 'folderHeader-white'}>
            <Card.Title className={file.metadata._isFile ? 'fileName-white' : 'folderName-white'}>{file.metadata.name}</Card.Title>
          </Card.Header>

          <Card.Footer className="footer" style={{ backgroundColor: '#e8e8e85e' }}>
            <span style={{ color: '#4e4e4e' }}>
              {file.metadata._isFile ? `Last updated: ${elapsedTime(new Date(file.metadata.updated))}` : 'Click to open'}
              <br />
              {file.metadata._isFile ? `Size: ${sizeFilter(file.metadata.size)} - ` : true}
              <FontAwesomeIcon icon={fileType(file.key)} />
            </span>
          </Card.Footer>
        </Card>
      </Col>
    );
  }
}

export default FileCard;
