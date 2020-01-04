import React, { Component } from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import { mapModified, isFolder, fileType, fileName } from '../api/Mappers';
import '../styles/Grid.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Grid extends Component {

  constructor(props) {
    super(props);
    this.filesToShow = [];
    this.selectedCards = [];
    this.sx0 = 0; this.sy0 = 0; this.sx1 = 0; this.sy1 = 0;
    this.lastMouseMove = false;

    this.handleFolders = this.handleFolders.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.getFilesKeys = this.getFilesKeys.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickOut = this.handleClickOut.bind(this);
    this.handleAreaSelect = this.handleAreaSelect.bind(this);
  }

  clickedOnCard = (e) => {
    if (e.target.tagName !== 'path'
      && typeof e.target.className === 'string'
      && !e.target.className.includes('file')
      && !e.target.className.includes('card')
      && !e.target.className.includes('card-header')
      && !e.target.className.includes('footer')
      && !e.target.className.includes('card-footer')
      && !e.target.className.includes('card-title')) return false;

    else return true;
  }

  handleMouseMove = (e) => {
    var eventDoc, doc, body;
    e = e || window.e;

    if (e.pageX == null && e.clientX != null) {
      eventDoc = (e.target && e.target.ownerDocument) || document;
      doc = eventDoc.documentElement;
      body = eventDoc.body;

      e.pageX = e.clientX +
        ((doc && doc.scrollLeft)?body && body.scrollLeft:0) -
        ((doc && doc.clientLeft)?body && body.clientLeft:0);
      e.pageY = e.clientY +
        ((doc && doc.scrollTop)?body && body.scrollTop:0) -
        ((doc && doc.clientTop)?body && body.clientTop:0);
    }

    return {
      x: e.pageX,
      y: e.pageY
    }
  }

  setDiv = (target) => {
    var x3 = Math.min(this.sx0, this.sx1);
    var x4 = Math.max(this.sx0, this.sx1);
    var y3 = Math.min(this.sy0, this.sy1);
    var y4 = Math.max(this.sy0, this.sy1);
    target.style.left = x3 + 'px';
    target.style.top = y3 + 'px';
    target.style.width = x4 - x3 + 'px';
    target.style.height = y4 - y3 + 'px';
  }

  visibleOnArea = element => {
    var width = element.offsetWidth;
    var height = element.offsetHeight;

    var x0 = 0, y0 = 0;
    do {
        x0 += element.offsetLeft  || 0;
        y0 += element.offsetTop || 0;
        element = element.offsetParent;
    } while(element);

    var x1 = x0 + width;
    var y1 = y0 + height;

    console.log(!(x0 > this.sx1 ||
           x1 < this.sx0 ||
           y0 > this.sy1 ||
           y1 < this.sy0));

    return !(x0 > this.sx1 ||
           x1 < this.sx0 ||
           y0 > this.sy1 ||
           y1 < this.sy0);
  }

  handleMouseDown = (data) => {
    if (this.lastMouseMove === 'mousedown') {
      data.forEach(card => {
        if (this.visibleOnArea(card)) {
          card.parentElement.style.backgroundColor = 'rgba(102, 163, 198, 0.3)';
          card.parentElement.style.borderRadius = '0.3em';
          card.parentElement.style.borderColor = '#E2F1FF';
          if (!this.selectedCards.includes(card)) this.selectedCards.push(card);
        } else if (this.lastMouseMove !== 'mouseup') {
          card.parentElement.style.backgroundColor = '';
          card.parentElement.style.borderRadius = 'none';
          card.parentElement.style.borderColor = '';
          this.selectedCards.splice(this.selectedCards.indexOf(card), 1);
        }
      });
      console.log('-----------------------------------------------------');
    }
  }

  handleAreaSelect(e) {
    const target = document.getElementById("areaSelector");
    const cards = Array.prototype.slice.call(document.getElementsByClassName("card"));
    const pos = this.handleMouseMove(e);

    this.sx1 = pos.x;
    this.sy1 = pos.y;

    this.setDiv(target);
    this.handleMouseDown(cards);

    if (!pos) return false;
    else {
      if (e.type === 'mousedown') {
        target.hidden = 0;
        this.sx0 = pos.x;
        this.sy0 = pos.y;
        this.setDiv(target);
        this.lastMouseMove = 'mousedown';
      } else if (e.type === 'mouseup') {
        console.log('mouseup');
        console.log(this.selectedCards);
        this.selectedCards.forEach(card => {
          card.parentElement.style.backgroundColor = 'rgba(102, 163, 198, 0.5)';
          card.parentElement.style.borderRadius = '0.3em';
          card.parentElement.style.borderColor = '#E2F1FF';
        });
        this.selectedCards = [];
        target.hidden = 1;
        this.lastMouseMove = 'mouseup';
      }

    }
  }

  handleClickOut(e) {
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
        //console.log(key);

        if ((!key.includes('/') || key.charAt(key.indexOf('/')+1) === '') && this.filesToShow.indexOf(key) === -1) this.filesToShow.push(key);
        else {
          //this.handleFolders()
          //this.filesToShow.push(key.substring(0, key.indexOf('/')));
        }
        //console.log(key.substring(0, key.indexOf('/')));
      })
      //console.log(this.filesToShow);
    }
  }

  handleFiles() {
    var files = [];
    if (this.props.files.length !== 0) {
      this.props.files.forEach(file => {
        files.push(
          <Col className="file" xs={6} sm={6} md={4} lg={3}>
            <Card id={fileName(file.key)} className={isFolder(file.key)?"folder-white":"file-white"}
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
      <div id="fileManager" onMouseDown={e => {this.handleAreaSelect(e); this.handleClickOut(e)}} onMouseUp={this.handleAreaSelect} onMouseMove={this.handleAreaSelect}>
        <div id="areaSelector" hidden>&nbsp;</div>
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
