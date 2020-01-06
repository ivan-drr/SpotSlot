import React, { Component } from 'react';
import '../styles/Loading.css';

class Loading extends Component {

  constructor(props) {
    super(props);
    this.typeWriter = this.typeWriter.bind(this);
  }

  typeWriter(str, speed, id, iterator, intervals) {
    if (document.getElementById(id) !== null) {
      const element = document.getElementById(id);

      setTimeout(() => {
        if (iterator < str.length) {
          element.innerHTML += str.charAt(iterator);
          iterator++;

          setTimeout(this.typeWriter(str, speed, id, iterator), speed);

          return true;
        } else return false;
      }, 1000/speed*2);

    }
  }

  render() {
    let iterator = 0;

    if (this.props._isFetch === 'error') {
      setTimeout(() => {
        this.typeWriter(' ✘ Error connecting to API', 70, 'errorText', iterator);
      }, 0);
      return (
        <div id="loading" className="text-danger fixed-top">
          <span id="errorText" className="ml-3"></span>
        </div>
      );
    } else if (!this.props._isFetch) {
      setTimeout(() => {
        this.typeWriter(' Loading...', 70, 'loadingText', iterator);
      }, 0);
      return(
        <div id="loading" className="text-primary fixed-top">
          <div className="spinner-border text-primary" role="status"></div>
          <span id="loadingText" className="ml-3"></span>
        </div>
      );
    } else return null;
  }

}

export default Loading;
