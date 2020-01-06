import React from 'react';
import { styledLog } from './OwnFunctions';
import * as Constant from './constants/AreaSelector';
import * as Log from './constants/log';

const AreaSelector = (props) => {
  if (!props.container || !props.cards) return styledLog(Log.WARNING + 'Waiting 𝙥𝙧𝙤𝙥𝙨 to init 𝘼𝙍𝙀𝘼-𝙎𝙀𝙇𝙀𝘾𝙏𝙊𝙍');
  else  {
    styledLog(Log.SUCCESS + '𝘼𝙍𝙀𝘼-𝙎𝙀𝙇𝙀𝘾𝙏𝙊𝙍 ready');
    setEvents(props);
    return <div id="areaSelector" hidden>&nbsp;</div>;
  }
}

var selectedCards = [];
var lastMouseMove = false;
var sx0 = 0;
var sy0 = 0;
var sx1 = 0;
var sy1 = 0;

const setEvents = props => {
  props.container.addEventListener('mousedown', e => {
    handleAreaSelect(e);
    handleClickOutOfCard(e);
  }, false);

  props.container.addEventListener('mouseup', e => { handleAreaSelect(e) }, false);
  props.container.addEventListener('mousemove', e => { handleAreaSelect(e) }, false);

  props.cards.forEach(card => {
    card.addEventListener('click', e => {
      handleClickOnCard(e);
    });
  });
}

const getMousePosition = e => {
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

const attachMousePosTo = target => {
  var x3 = Math.min(sx0, sx1);
  var x4 = Math.max(sx0, sx1);
  var y3 = Math.min(sy0, sy1);
  var y4 = Math.max(sy0, sy1);
  target.style.left = x3 + 'px';
  target.style.top = y3 + 'px';
  target.style.width = x4 - x3 + 'px';
  target.style.height = y4 - y3 + 'px';
}

const clickedOnCard = e => {
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

const getCardTarget = e => {
  if (e.target.className !== 'BUTTON' && e.target.tagName !== 'path' && e.target.tagName !== 'svg') {
    var target = e.target.parentElement;
    if (target.className.includes('file')) target = target.children[0];
    if (target.className.includes('card-header')) target = target.parentElement;
    if (target.className.includes('card-title')) target = target.parentElement.parentElement;

    return target.parentElement;
  } else return false
}

const handleClickOnCard = e => {
  let target = getCardTarget(e);
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

const handleClickOutOfCard = e => {
  if (!clickedOnCard(e)) {
    Array.prototype.slice.call(document.getElementsByClassName('file')).forEach(card => card.style.backgroundColor = '');
  }
}

const handleMouseDown = data => {
  if (lastMouseMove === 'mousedown') {
    data.forEach((target, index) => {
      let card = target.parentElement;
      if (visibleOnArea(card)) {
        if (!selectedCards.includes(target)) selectedCards.push(target);
        card.style.backgroundColor = Constant.MOUSEOVER_COLOR;
        card.style.borderRadius = Constant.MOUSEOVER_BORDER_RADIUS;
        card.style.borderColor = Constant.MOUSEOVER_BORDER_COLOR;
      } else if (lastMouseMove !== 'mouseup') {
        selectedCards.splice(index, 1);
        card.style.backgroundColor = '';
        card.style.borderRadius = 'none';
        card.style.borderColor = '';
      }
    });
  }
}

const visibleOnArea = element => {
  const width = element.offsetWidth;
  const height = element.offsetHeight;

  var x0 = 0, y0 = 0;
  do {
      x0 += element.offsetLeft  || 0;
      y0 += element.offsetTop || 0;
      element = element.offsetParent;
  } while(element);

  const x1 = x0 + width;
  const y1 = y0 + height;

  const areaStartAtTopLeft = !(x0 > sx1 || x1 < sx0 || y0 > sy1 || y1 < sy0);
  const areaStartAtBottomLeft = !(x0 > sx1 || x1 < sx0 || y1 > sy0 || y0 < sy1);

  return areaStartAtTopLeft;
}



const handleAreaSelect = e => {
  const areaSelector = document.getElementById("areaSelector");
  const cards = Array.prototype.slice.call(document.getElementsByClassName("card"));
  const pos = getMousePosition(e);

  sx1 = pos.x;
  sy1 = pos.y;

  attachMousePosTo(areaSelector);
  handleMouseDown(cards);

  if (!pos) return false;
  else {
    if (e.type === 'mousedown') {
      areaSelector.hidden = 0;
      sx0 = pos.x;
      sy0 = pos.y;
      attachMousePosTo(areaSelector);
      lastMouseMove = 'mousedown';
    } else if (e.type === 'mouseup') {
      selectedCards.forEach(card => {
        card.parentElement.style.backgroundColor = Constant.ON_AREASELECT_COLOR;
        card.parentElement.style.borderRadius = Constant.MOUSEOVER_BORDER_RADIUS;
        card.parentElement.style.borderColor = Constant.MOUSEOVER_BORDER_COLOR;
      });
      selectedCards = [];
      areaSelector.hidden = 1;
      lastMouseMove = 'mouseup';
    }
  }
}

export default AreaSelector;
