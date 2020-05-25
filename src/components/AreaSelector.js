import React, { Component } from 'react';

import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash, faCloudDownloadAlt, faFolderPlus, faFileMedical,
} from '@fortawesome/free-solid-svg-icons';
import { fileName, isFolder } from './Mapper';
import { storageRef, deleteAllFilesFrom } from './constants/firebase';
import * as Log from './constants/log';
import * as Constant from './constants/AreaSelector';
import { styledLog, downloadFile } from './Utilities';

import '../styles/AreaSelector.css';
import '../styles/ToolNav.css';

class AreaSelector extends Component {
  constructor() {
    super();
    this._isMounted = false;
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
    this._isMounted = true;

    this.setEvents();
    styledLog(`${Log.SUCCESS}𝘼𝙍𝙀𝘼-𝙎𝙀𝙇𝙀𝘾𝙏𝙊𝙍 ready`);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  eMouseDown = (e) => {
    this.handleAreaSelect(e);
    this.handleClickOutOfCard(e);
  }

  setEvents = () => {
    const { container } = this.state;

    container.addEventListener('mousedown', (e) => { this.eMouseDown(e); });

    container.addEventListener('mouseup', (e) => this.handleAreaSelect(e));
    container.addEventListener('mousemove', (e) => this.handleAreaSelect(e));

    container.addEventListener('touchstart', (e) => this.eMouseDown(e));

    container.addEventListener('touchend', (e) => this.handleAreaSelect(e));
    container.addEventListener('touchmove', (e) => this.handleAreaSelect(e));
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
      && !e.target.className.includes('card-title')
      && !e.target.className.includes('navButton')) return false;

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

  unselectCards = () => {
    Array.prototype.slice.call(document.getElementsByClassName('file')).forEach((card) => card.style.backgroundColor = '');
    this.setState((state) => {
      if (state.selectedCards.length !== 0) {
        state.selectedCards = [];
        return state;
      }
    });
  }

  handleClickOutOfCard = (e) => {
    if (!this._isMounted) return;

    if (document.getElementById('areaSelector') === null) return;
    if (!this.clickedOnCard(e)) {
      Array.prototype.slice.call(document.getElementsByClassName('file')).forEach((card) => card.style.backgroundColor = '');
      this.setState((state) => {
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

  handleMouseDown = (e, data) => {
    if (this.lastMouseMove === 'mousedown') {
      if (e.target.tagName !== 'svg' && e.target.tagName !== 'path') {
        if (!e.target.className.includes('navButton')) this.unselectCards();
      }

      const popover = document.getElementById('newFolder');
      if (e.target.className !== 'popover-header'
        && e.target.className !== 'popover-body'
        && popover !== null
        && popover.className.includes('show')) document.getElementById('newfolderOverlay').click();

      data.forEach((target, index) => {
        const card = target.parentElement;
        if (this.visibleOnArea(card)) {
          if (!this.state.selectedCards.includes(target)) {
            this.setState((state) => {
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

    const sx0 = Math.min(this.sx0, this.sx1);
    const sx1 = Math.max(this.sx0, this.sx1);
    const sy0 = Math.min(this.sy0, this.sy1);
    const sy1 = Math.max(this.sy0, this.sy1);

    return !(x0 > sx1 || x1 < sx0 || y0 > sy1 || y1 < sy0);
  }

  handleAreaSelect = (e) => {
    if (!this._isMounted) return;

    const areaSelector = document.getElementById('areaSelector');
    if (areaSelector === null) return;

    const cards = Array.prototype.slice.call(document.getElementsByClassName('card'));
    const pos = this.getMousePosition(e);

    this.sx1 = pos.x;
    this.sy1 = pos.y;

    if (this.lastMouseMove === 'mousedown') this.attachMousePosTo(areaSelector);
    this.handleMouseDown(e, cards);

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
  }

  handleDownloadFiles = () => {
    this.state.selectedCards.forEach((file) => {
      const ref = storageRef.child(file.id);
      ref.getDownloadURL().then((url) => {
        downloadFile(url, fileName(file.id));
      }).catch((error) => {
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
            styledLog(`${Log.ERROR}Unhandled error by firebase, check de code`);
            break;
        }
      });
    });
  }

  handleDeleteFiles = () => {
    const files = this.state.selectedCards;
    const deleteFile = document.getElementById('deleteStateFile');

    files.forEach((file) => {
      const ref = storageRef.child(file.id);
      if (isFolder(file.id)) {
        styledLog(`${Log.INFO}Deleting ${file.id} folder...`);
        deleteAllFilesFrom(file.id);
      } else {
        ref.delete().catch((error) => {
          styledLog(`${Log.ERROR}File ${file.id} couldn't be deleted`);
        });
      }

      styledLog(`${Log.SUCCESS}Folder ${file.id} deleted`);
      deleteFile.value = file.id;
      deleteFile.click();

      file.parentElement.style.display = 'none';
    });
    this.unselectCards();
  }

  disableButtonOnUnselectedCards = () => {
    if (this.state.selectedCards.length > 0) return '';
    return ' btnDisable';
  }

  render() {
    const popover = (
      <Popover id="newFolder">
        <Popover.Title style={{ backgroundColor: '#f3c3a3', color: '#0a4685' }} as="h3">New folder name</Popover.Title>
        <Popover.Content style={{ backgroundColor: '#f5f5f5' }}>
          <input id="folderName" style={{ textAlign: 'center', color: '#0a4685' }} type="text" autoFocus autoComplete="off" />
        </Popover.Content>
      </Popover>
    );

    return (
      <>
        <div id="areaSelector" hidden>&nbsp;</div>
        <button id="unselectCards" style={{ display: 'none' }} onClick={() => this.unselectCards()} />

        <div id="toolNav" className="flex-column fixed-right rounded">
          <Nav>
            <Button
              className="navButton"
              aria-label="Add file"
              style={{ backgroundColor: '#4cbb66', borderColor: '#4cbb66' }}
              onClick={() => document.getElementById('addFile').click()}
            >
              <FontAwesomeIcon icon={faFileMedical} />
            </Button>

            <OverlayTrigger trigger="click" placement="left" overlay={popover}>
              <Button
                className="navButton"
                aria-label="Add folder"
                id="newfolderOverlay"
                style={{ backgroundColor: '#479057', borderColor: '#479057' }}
                onClick={() => document.getElementById('addFolder').click()}
              >
                <FontAwesomeIcon icon={faFolderPlus} />
              </Button>
            </OverlayTrigger>

            <Button
              className={`navButton${this.disableButtonOnUnselectedCards()}`}
              aria-label="Downlaod files"
              variant="info"
              onClick={() => this.handleDownloadFiles()}
            >
              <FontAwesomeIcon icon={faCloudDownloadAlt} />
            </Button>

            <Button
              className={`navButton${this.disableButtonOnUnselectedCards()}`}
              aria-label="Delete files"
              variant="danger"
              onClick={() => this.handleDeleteFiles()}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Nav>
        </div>
      </>
    );
  }
}

export default AreaSelector;
