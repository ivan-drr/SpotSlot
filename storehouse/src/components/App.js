import React, { Component } from 'react';
import '../styles/App.css';
import 'font-awesome/css/font-awesome.min.css';

import Folder from './Folder';

class App extends Component {

  //updateLoading(_isActive) {
    //updateIsActiveLoading(_isActive);
  //}

  render() {
    return (
      <div className="App">
        <div className="fluid-container m-5 text-center">
          <Folder />
        </div>
      </div>
    );
  }

}

export default App;
