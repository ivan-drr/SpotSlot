import React, { Component } from 'react';
import { styledLog } from './Utilities';
import * as Constant from './constants/AreaSelector';
import * as Log from './constants/log';

class AreaSelector extends Component {
  constructor() {
    super();
    this.selectedCards = [];
    this.lastMouseMove = false;
    this.sx0 = 0;
    this.sy0 = 0;
    this.sx1 = 0;
    this.sy1 = 0;

    this.state = {
      container: document,
      cards: Array.prototype.slice.call(document.getElementsByClassName('cardFile'))
    }
  }

  componentDidMount() {
    this.setEvents();
    styledLog(Log.SUCCESS + '𝘼𝙍𝙀𝘼-𝙎𝙀𝙇𝙀𝘾𝙏𝙊𝙍 ready');
  }

  render() {
    return <div id="areaSelector" hidden>&nbsp;</div>;
  }

  setEvents = () => {
    this.state.container.addEventListener('mousedown', e => {
      this.handleAreaSelect(e);
      this.handleClickOutOfCard(e);
    }, false);

    this.state.container.addEventListener('mouseup', e => { this.handleAreaSelect(e) }, false);
    this.state.container.addEventListener('mousemove', e => { this.handleAreaSelect(e) }, false);

    this.state.cards.forEach(card => {
      card.addEventListener('click', e => { this.handleClickOnCard(e) });
    });
  }

  getMousePosition = e => {
    let eventDoc, doc, body;
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

  attachMousePosTo = target => {
    const x3 = Math.min(this.sx0, this.sx1);
    const x4 = Math.max(this.sx0, this.sx1);
    const y3 = Math.min(this.sy0, this.sy1);
    const y4 = Math.max(this.sy0, this.sy1);
    target.style.left = x3 + 'px';
    target.style.top = y3 + 'px';
    target.style.width = x4 - x3 + 'px';
    target.style.height = y4 - y3 + 'px';
  }

  clickedOnCard = e => {
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

  getCardTarget = e => {
    if (e.target.className !== 'BUTTON' && e.target.tagName !== 'path' && e.target.tagName !== 'svg') {
      let target = e.target.parentElement;
      if (target.className.includes('file')) target = target.children[0];
      if (target.className.includes('card-header')) target = target.parentElement;
      if (target.className.includes('card-title')) target = target.parentElement.parentElement;

      return target.parentElement;
    } else return false
  }

  handleClickOnCard = e => {
    const target = this.getCardTarget(e);
    if (!target) return false;
    else {
      if (target.style.backgroundColor !== Constant.ONCLICK_COLOR) {
        target.style.backgroundColor = Constant.ONCLICK_COLOR;
        target.style.borderRadius = Constant.MOUSEOVER_BORDER_RADIUS;
        target.style.borderColor = Constant.MOUSEOVER_BORDER_COLOR;
        return true;
      }
      else target.style.backgroundColor = '';
      return false;
    }
  }

  handleClickOutOfCard = e => {
    if (!this.clickedOnCard(e)) {
      Array.prototype.slice.call(document.getElementsByClassName('file')).forEach(card => card.style.backgroundColor = '');
    }
  }

  handleMouseDown = data => {
    if (this.lastMouseMove === 'mousedown') {
      data.forEach((target, index) => {
        const card = target.parentElement;
        if (this.visibleOnArea(card)) {
          if (!this.selectedCards.includes(target)) this.selectedCards.push(target);
          card.style.backgroundColor = Constant.MOUSEOVER_COLOR;
          card.style.borderRadius = Constant.MOUSEOVER_BORDER_RADIUS;
          card.style.borderColor = Constant.MOUSEOVER_BORDER_COLOR;
        } else if (this.lastMouseMove !== 'mouseup') {
          this.selectedCards.splice(index, 1);
          card.style.backgroundColor = '';
          card.style.borderRadius = 'none';
          card.style.borderColor = '';
        }
      });
    }
  }

  visibleOnArea = element => {
    const width = element.offsetWidth;
    const height = element.offsetHeight;

    let x0 = 0, y0 = 0;
    do {
        x0 += element.offsetLeft  || 0;
        y0 += element.offsetTop || 0;
        element = element.offsetParent;
    } while(element);

    const x1 = x0 + width;
    const y1 = y0 + height;

    const areaStartAtTopLeft = !(x0 > this.sx1 || x1 < this.sx0 || y0 > this.sy1 || y1 < this.sy0);
    //const areaStartAtBottomLeft = !(x0 > this.sx1 || x1 < this.sx0 || y1 > this.sy0 || y0 < this.sy1);

    return areaStartAtTopLeft;
  }

  handleAreaSelect = e => {
    const areaSelector = document.getElementById("areaSelector");
    const cards = Array.prototype.slice.call(document.getElementsByClassName("card"));
    const pos = this.getMousePosition(e);

    this.sx1 = pos.x;
    this.sy1 = pos.y;

    if (this.lastMouseMove === 'mousedown') this.attachMousePosTo(areaSelector);
    this.handleMouseDown(cards);

    if (!pos) return false;
    else {
      if (e.type === 'mousedown') {
        areaSelector.hidden = 0;
        this.sx0 = pos.x;
        this.sy0 = pos.y;
        this.attachMousePosTo(areaSelector);
        this.lastMouseMove = 'mousedown';
      } else if (e.type === 'mouseup') {
        this.selectedCards.forEach(card => {
          card.parentElement.style.backgroundColor = Constant.ON_AREASELECT_COLOR;
          card.parentElement.style.borderRadius = Constant.MOUSEOVER_BORDER_RADIUS;
          card.parentElement.style.borderColor = Constant.MOUSEOVER_BORDER_COLOR;
        });
        this.selectedCards = [];
        areaSelector.hidden = 1;
        this.lastMouseMove = 'mouseup';
      }
    }
  }
}

export default AreaSelector;
