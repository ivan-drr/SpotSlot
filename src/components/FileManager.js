import React, { Component } from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import { mapModified, isFolder, isVisible, fileType } from '../api/Mappers';

import '../styles/FileManager.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faCloudDownloadAlt, faEye } from '@fortawesome/free-solid-svg-icons'



class FileManager extends Component {

  constructor(props) {
    super(props);
    this.handleFiles = this.handleFiles.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, data) {
    if(e.target.className !== 'BUTTON' && e.target.tagName !== 'path' && e.target.tagName !== 'svg' && isFolder(data)) {
      console.log(e.target.parentElement.class);
      console.log(data+" was clicked");
    }
  }

  handleFiles() {
    var files = [];
    if (this.props.files.length !== 0) {
      this.props.files.forEach(file => {
        files.push(
          <Card style={{ width: '18rem' }} className={isFolder(file.key)?"folder-white":"file-white" + " text-center"} onClick={e => this.handleClick(e, file.key)}>
              <Card.Header className={isFolder(file.key)?"folderHeader-white":"fileHeader-white"}><Card.Title className={isFolder(file.key)?"folderName-white":"fileName-white"}>{file.key}</Card.Title></Card.Header>
              <Card.Body>
                {isFolder(file.key)?true:isVisible(file.key)?<Button className="button" variant="primary"><FontAwesomeIcon icon={faEye} /></Button>:false}

                <Button className="button" variant="danger"><FontAwesomeIcon icon={faTrash} /></Button>
                <Button className="button" variant="info"><FontAwesomeIcon icon={faCloudDownloadAlt} /></Button>
              </Card.Body>
              <Card.Footer className="text-muted">
                Last updated {mapModified(file.modified)} ago<br></br>
                {isFolder(file.key)?true:'Size: ' + file.size + ' - '}<FontAwesomeIcon icon={fileType(file.key)} />
                </Card.Footer>
          </Card>
        );
      });
    }

    if(!this.props.files) return 'No files';
    else return files;
  }

  render() {

    return (
      <Container>
        <Row className="justify-content-md-center">
        {this.handleFiles()}
        </Row>
      </Container>
    )
  }

}

export default FileManager;
