import React from 'react';
import '../styles/Loading.css';

export default function Loading(props) {
  const iterator = 0;

  if (props._isFetch === 'error') {
    setTimeout(() => {
      typeWriter(' ✘ Error connecting to API', 70, 'errorText', iterator);
    }, 0);
    return (
      <div id="loading" className="text-danger fixed-top">
        <span id="errorText" className="ml-3" />
      </div>
    );
  } if (!props._isFetch) {
    setTimeout(() => {
      typeWriter(' Loading...', 70, 'loadingText', iterator);
    }, 0);
    return (
      <div id="loading" className="text-primary fixed-top">
        <div className="spinner-border text-primary" role="status" />
        <span id="loadingText" className="ml-3" />
      </div>
    );
  } return null;
}

const typeWriter = (str, speed, id, iterator, intervals) => {
  if (document.getElementById(id) !== null) {
    const element = document.getElementById(id);

    setTimeout(() => {
      if (iterator < str.length) {
        element.innerHTML += str.charAt(iterator);
        iterator++;

        setTimeout(typeWriter(str, speed, id, iterator), speed);

        return true;
      } return false;
    }, 1000 / speed * 2);
  }
}
