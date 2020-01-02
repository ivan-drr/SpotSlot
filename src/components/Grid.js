import React, { Component } from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

import { mapModified, isFolder, isVisible, fileType, fileName } from '../api/Mappers';

import '../styles/Grid.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCloudDownloadAlt, faEye } from '@fortawesome/free-solid-svg-icons'



class Grid extends Component {

  constructor(props) {
    super(props);
    this.filesToShow = [];
    this.handleFolders = this.handleFolders.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.getFilesKeys = this.getFilesKeys.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, data) {
    if(e.target.className !== 'BUTTON' && e.target.tagName !== 'path' && e.target.tagName !== 'svg' && isFolder(data)) {
      console.log(e.target.parentElement.class);
      console.log(data+" was clicked");
    }
  }

  getFilesKeys(files) {
    var fileKeys = [];
    files.forEach(file => {
      fileKeys.push(file.key);
    })

    return fileKeys;
  }

  handleFolders(files) {
    if (files !== 0) {

      files.forEach(name => {
        let key = name.substring(1, name.length);
        console.log(key);

        if ((!key.includes('/') || key.charAt(key.indexOf('/')+1) === '') && this.filesToShow.indexOf(key) === -1) this.filesToShow.push(key);
        else {
          //this.handleFolders()
          //this.filesToShow.push(key.substring(0, key.indexOf('/')));
        }
        //console.log(key.substring(0, key.indexOf('/')));
      })
      console.log(this.filesToShow);
    }
  }

  handleFiles() {
    var files = [];
    if (this.props.files.length !== 0) {
      this.props.files.forEach(file => {
        files.push(
          <Col xs={6} sm={6} md={4} lg={3}>
            <Card className={isFolder(file.key)?"folder-white":"file-white"} onClick={e => this.handleClick(e, file.key)}>
                <Card.Header className={isFolder(file.key)?"folderHeader-white":"fileHeader-white"}>
                  <Card.Title className={isFolder(file.key)?"folderName-white":"fileName-white"}>{fileName(file.key)}</Card.Title>
                </Card.Header>
                <Card.Body>
                  {isFolder(file.key)?true:isVisible(file.key)?<Button className="button" variant="primary"><FontAwesomeIcon icon={faEye} /></Button>:false}

                  <Button className="button" variant="danger"><FontAwesomeIcon icon={faTrash} /></Button>
                  <Button className="button" variant="info"><FontAwesomeIcon icon={faCloudDownloadAlt} /></Button>
                </Card.Body>
                <Card.Footer className="text-muted footer">
                  Last updated {mapModified(file.modified)} ago<br></br>
                  {isFolder(file.key)?true:'Size: ' + file.size + ' - '}<FontAwesomeIcon icon={fileType(file.key)} />
                </Card.Footer>
            </Card>
          </Col>
        );
      });
    }

    if(!this.props.files) return 'No files';
    else return files;
  }

  render() {
    this.handleFolders(this.getFilesKeys(this.props.files));
    return (
      <div>
        <Container>
          <Row className="justify-content-md-center fadeIn">
          {this.handleFiles()}
          </Row>
        </Container>
      </div>
    )
  }
}

export default Grid;
