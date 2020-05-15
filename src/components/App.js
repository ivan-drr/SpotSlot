import React from 'react';

import '../styles/App.css';
import FileManager from './FileManager';

function App() {
  return (
    <div className="App" id="app">
      <div className="fluid-container m-5 text-center noselect">
        <FileManager />
      </div>
    </div>
  );
}

export default App;
