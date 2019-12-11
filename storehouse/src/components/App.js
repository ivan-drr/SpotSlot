import React, { Component } from 'react';
import '../styles/App.css';
import 'font-awesome/css/font-awesome.min.css';
import { Loading } from './Loading';

import Folder from './Folder';

class App extends Component {

  state = {
    loading: false
  }

  render() {
    return (
      <div className="App">
        <div className="fluid-container m-5 text-center">
          <Folder />
        </div>
        <Loading />
      </div>
    );
  }

}

export default App;
