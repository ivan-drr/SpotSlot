import React, { Component } from 'react';
import '../styles/App.css';
import 'font-awesome/css/font-awesome.min.css';

import Table from './Table';

class App extends Component {

  render() {
    return (
      <div className="App" id="app">
        <div className="fluid-container m-5 text-center">
          <Table />
        </div>
      </div>
    );
  }

}

export default App;
