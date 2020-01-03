import React, { Component } from 'react';
import '../styles/App.css';
import 'font-awesome/css/font-awesome.min.css';

import FileManager from './FileManager';

class App extends Component {

  render() {
    return (
      <div className="App" id="app">
        <div className="fluid-container m-5 text-center noselect">
          <FileManager />
        </div>
      </div>
    );
  }

}

export default App;
