import React, { Component } from 'react';
import '../styles/Loading.css';

class Loading extends Component {

  constructor(props) {
    super(props);
    this.typeWriter = this.typeWriter.bind(this);
  }

  // ERROR: need to cancel timeout if the function its called again
  typeWriter(str, speed, id, iterator) {
    if (document.getElementById(id) !== null) {
      var element = document.getElementById(id);

      setTimeout(() => {
        if (iterator < str.length) {
          element.innerHTML += str.charAt(iterator);
          iterator++;
          setTimeout(this.typeWriter(str, speed, id, iterator), speed);

          return true;
        } else return false;
      }, 1000/speed*2);

    } else return 'element_not_found';
  }

  render() {
    var iterator = 0;

    if (this.props._isFetch === 'error') {
      this.typeWriter(' ✘ Error connecting to API', 70, 'loadingText', iterator);
      return (
        <div id="loading" className="text-danger fixed-top">
          <span id="loadingText" className="ml-3"></span>
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
