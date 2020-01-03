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
    this.handleClickOut = this.handleClickOut.bind(this);
    this.handleAreaSelect = this.handleAreaSelect.bind(this);
  }

  clickedOnCard = (e) => {
    if (e.target.tagName !== 'path'
      && !e.target.className.includes('file')
      && !e.target.className.includes('card')
      && !e.target.className.includes('card-header')
      && !e.target.className.includes('footer')
      && !e.target.className.includes('card-footer')
      && !e.target.className.includes('card-title')) return false;

    else return true;
  }

  handleAreaSelect(e) {
    if (!this.clickedOnCard(e)) {
      if (e.type === 'mousedown') {
        // if mouse goes out of fileManager kill area
        console.log('mousedown');
      } else console.log('mouseup');
    }
  }

  handleClickOut(e) {
    console.log(e.target.className);
    if (!this.clickedOnCard(e)) {
      Array.prototype.slice.call(document.getElementsByClassName('file')).forEach(card => card.style.backgroundColor = '');
    }
  }

  handleClick(e, data) {
    if (e.target.className !== 'BUTTON' && e.target.tagName !== 'path' && e.target.tagName !== 'svg') {
      var target = e.target.parentElement;
      if (target.className.includes('file')) target = target.children[0];
      if (target.className.includes('card-header')) target = target.parentElement;
      if (target.className.includes('card-title')) target = target.parentElement.parentElement;

      if (target.parentElement.style.backgroundColor !== 'rgba(102, 163, 198, 0.5)') {
        target.parentElement.style.backgroundColor = 'rgba(102, 163, 198, 0.5)';
        target.parentElement.style.borderRadius = '0.3em';
        target.parentElement.style.borderColor = '#E2F1FF';
      }
      else target.parentElement.style.backgroundColor = '';
      //console.log(target);
      //console.log(data+" was clicked");
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
          <Col className="file" xs={6} sm={6} md={4} lg={3}>
            <Card className={isFolder(file.key)?"folder-white":"file-white"}
              onClick={e => this.handleClick(e, file.key)}
            >
                <Card.Header className={isFolder(file.key)?"folderHeader-white":"fileHeader-white"}>
                  <Card.Title className={isFolder(file.key)?"folderName-white":"fileName-white"}>{fileName(file.key)}</Card.Title>
                </Card.Header>

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
      <div id="fileManager" onClick={e => this.handleClickOut(e)} onMouseDown={this.handleAreaSelect} onMouseUp={this.handleAreaSelect}>
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
