import React, { Component } from 'react';
import '../styles/Loading.css';

class Loading extends Component {

  constructor(props) {
    super(props);
    this.typeWriter = this.typeWriter.bind(this);
  }

  componentDidMount() {
    var iterator = 0;
    this.typeWriter('Loading...', 55, 'loadingText', iterator);
  }

  typeWriter(str, speed, id, iterator) {
    setTimeout(() => {
      if (iterator < str.length) {
        document.getElementById(id).innerHTML += str.charAt(iterator);
        iterator++;
        setTimeout(this.typeWriter(str, speed, id, iterator), speed);
      }
    }, 60);
  }

  render() {
    return(
      <div id="loading" className="text-primary fixed-top">

        <div className="spinner-border text-primary" role="status">
          <div className="spinner-border" role="status">
            <div className="spinner-border" role="status">
              <div className="spinner-border" role="status">
              </div>
            </div>
          </div>
        </div> <span id="loadingText" className="ml-3"></span>
      </div>
    );
  }

}

export default Loading;
