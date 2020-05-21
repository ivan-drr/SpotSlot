import React, { Component } from 'react';
import { styledLog } from './Utilities';
import * as Constant from './constants/AreaSelector';
import * as Log from './constants/log';
import { storageRef } from './constants/firebase';

import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCloudDownloadAlt, faEye, faFolderPlus } from '@fortawesome/free-solid-svg-icons';

import '../styles/AreaSelector.css';
import '../styles/ToolNav.css';

class AreaSelector extends Component {
  constructor() {
    super();
    this.lastMouseMove = false;
    this.sx0 = 0;
    this.sy0 = 0;
    this.sx1 = 0;
    this.sy1 = 0;

    this.state = {
      selectedCards: [],
      container: document,
      cards: Array.prototype.slice.call(document.getElementsByClassName('cardFile')),
    };
  }

  componentDidMount() {
    this.setEvents();
    styledLog(`${Log.SUCCESS}𝘼𝙍𝙀𝘼-𝙎𝙀𝙇𝙀𝘾𝙏𝙊𝙍 ready`);
  }

  setEvents = () => {
    const { container } = this.state;

    container.addEventListener('mousedown', (e) => {
      this.handleAreaSelect(e);
      this.handleClickOutOfCard(e);
    }, false);

    container.addEventListener('mouseup', (e) => { this.handleAreaSelect(e); }, false);
    container.addEventListener('mousemove', (e) => { this.handleAreaSelect(e); }, false);

    container.addEventListener('touchstart', (e) => {
      this.handleAreaSelect(e);
      this.handleClickOutOfCard(e);
    }, false);

    container.addEventListener('touchend', (e) => { this.handleAreaSelect(e); }, false);
    container.addEventListener('touchmove', (e) => { this.handleAreaSelect(e); }, false);
  }

  getMousePosition = (e) => {
    let eventDoc;
    let doc;
    let body;

    let event;
    if (e.type.includes('mouse')) event = e;
    else if (e.type.includes('touch') && e.type !== 'touchend') event = e.touches[0];
    else return false;

    if (event.pageX == null && event.clientX != null) {
      eventDoc = (event.target && event.target.ownerDocument) || document;
      doc = eventDoc.documentElement;
      body = eventDoc.body;

      event.pageX = event.clientX
        + ((doc && doc.scrollLeft) ? body && body.scrollLeft : 0)
        - ((doc && doc.clientLeft) ? body && body.clientLeft : 0);
      event.pageY = event.clientY
        + ((doc && doc.scrollTop) ? body && body.scrollTop : 0)
        - ((doc && doc.clientTop) ? body && body.clientTop : 0);
    }

    return {
      x: event.pageX,
      y: event.pageY,
    };
  }

  attachMousePosTo = (target) => {
    const x3 = Math.min(this.sx0, this.sx1);
    const x4 = Math.max(this.sx0, this.sx1);
    const y3 = Math.min(this.sy0, this.sy1);
    const y4 = Math.max(this.sy0, this.sy1);
    target.style.left = `${x3}px`;
    target.style.top = `${y3}px`;
    target.style.width = `${x4 - x3}px`;
    target.style.height = `${y4 - y3}px`;
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

    return true;
  }

  getCardTarget = (e) => {
    if (e.target.className !== 'BUTTON' && e.target.tagName !== 'path' && e.target.tagName !== 'svg') {
      let target = e.target.parentElement;
      if (target.className.includes('file')) target = target.children[0];
      if (target.className.includes('card-header')) target = target.parentElement;
      if (target.className.includes('card-title')) target = target.parentElement.parentElement;

      return target.parentElement;
    } return false;
  }

  handleClickOutOfCard = (e) => {
    if (!this.clickedOnCard(e)) {
      Array.prototype.slice.call(document.getElementsByClassName('file')).forEach((card) => card.style.backgroundColor = '');
      this.setState(state => {
        if (state.selectedCards.length !== 0) {
          state.selectedCards = [];
          return state;
        }
      });
    }
  }

  detectLeftButton = (e) => {
    e = e || window.event;
    if ('buttons' in e) {
      return e.buttons === 1;
    }
    const button = e.which || e.button;
    return button === 1;
  }

  handleMouseDown = (data) => {
    if (this.lastMouseMove === 'mousedown') {
      data.forEach((target, index) => {
        const card = target.parentElement;
        if (this.visibleOnArea(card)) {
          if (!this.state.selectedCards.includes(target)) {
            this.setState(state => {
              state.selectedCards.push(target);
              return state;
            });
          }
          card.style.backgroundColor = Constant.MOUSEOVER_COLOR;
          card.style.borderRadius = Constant.MOUSEOVER_BORDER_RADIUS;
          card.style.borderColor = Constant.MOUSEOVER_BORDER_COLOR;
        }
      });
    }
  }

  visibleOnArea = (element) => {
    const width = element.offsetWidth;
    const height = element.offsetHeight;

    let x0 = 0; let
      y0 = 0;
    do {
      x0 += element.offsetLeft || 0;
      y0 += element.offsetTop || 0;
      element = element.offsetParent;
    } while (element);

    const x1 = x0 + width;
    const y1 = y0 + height;

    const areaStartAtTopLeft = !(x0 > this.sx1 || x1 < this.sx0 || y0 > this.sy1 || y1 < this.sy0);
    // const areaStartAtBottomLeft = !(x0 > this.sx1 || x1 < this.sx0 || y1 > this.sy0 || y0 < this.sy1);

    return areaStartAtTopLeft;
  }

  handleAreaSelect = (e) => {
    const areaSelector = document.getElementById('areaSelector');
    const cards = Array.prototype.slice.call(document.getElementsByClassName('card'));
    const pos = this.getMousePosition(e);

    this.sx1 = pos.x;
    this.sy1 = pos.y;

    if (this.lastMouseMove === 'mousedown') this.attachMousePosTo(areaSelector);
    this.handleMouseDown(cards);

    if (e.type === 'mousedown' || e.type === 'touchstart') {
      if (!pos) return false;

      areaSelector.hidden = 0;
      this.sx0 = pos.x;
      this.sy0 = pos.y;
      this.attachMousePosTo(areaSelector);
      this.lastMouseMove = 'mousedown';
    } else if (e.type === 'mouseup' || e.type === 'touchend') {
      this.state.selectedCards.forEach((card) => {
        card.parentElement.style.backgroundColor = Constant.ON_AREASELECT_COLOR;
        card.parentElement.style.borderRadius = Constant.MOUSEOVER_BORDER_RADIUS;
        card.parentElement.style.borderColor = Constant.MOUSEOVER_BORDER_COLOR;
      });
      areaSelector.hidden = 1;
      this.lastMouseMove = 'mouseup';
    }
    //console.log(this.state.selectedCards);
  }

  handleDownloadFiles = () => {
    this.state.selectedCards.forEach(file => {
      const ref = storageRef.child(file.id)
      ref.getDownloadURL().then(url => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = event => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
      }).catch(function(error) {
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            styledLog(`${Log.ERROR}File doesn't exist`);
            break;

          case 'storage/unauthorized':
            styledLog(`${Log.WARNING}User doesn't have permission to access the object`);
            break;

          case 'storage/canceled':
            styledLog(`${Log.WARNING}User canceled the upload`);
            break;

          case 'storage/unknown':
            styledLog(`${Log.ERROR}Unknown error occurred, inspect the server response`);
            break;

          default:
            styledLog(`${Log.ERROR}Unhandled error by firebase`);
            break;
        }
      });
    })
  }

  handleDeleteFiles = () => {

  }

  render() {
    console.log(this.state.selectedCards);
    return(
      <>
      <div id="areaSelector" hidden>&nbsp;</div>

      <div id="toolNav" className="flex-column fixed-right rounded">
        <Nav>
          <Button className="navButton" disabled
            variant="primary">
              <FontAwesomeIcon icon={faEye} />
          </Button>

          <Button className="navButton" disabled={this.state.selectedCards.length > 0 ? 0 : 1}
            variant="danger">
              <FontAwesomeIcon icon={faTrash} />
          </Button>

          <Button className="navButton" disabled={this.state.selectedCards.length > 0 ? 0 : 1}
            variant="info"
            onClick={() => this.handleDownloadFiles()}>
              <FontAwesomeIcon icon={faCloudDownloadAlt} />
          </Button>

          <Button className="navButton"
            variant="success"
            onClick={() => document.getElementById("fileElem").click()}>
              <FontAwesomeIcon icon={faFolderPlus} />
          </Button>
        </Nav>
      </div>
      </>
    );
  }
}

export default AreaSelector;
