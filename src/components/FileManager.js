import React, { Component } from 'react';
import FileSystem from './FileSystem';
import Dashboard from './Dashboard';
import NavBar from './NavBar';

import Badge from 'react-bootstrap/Badge';

import '../styles/FileManager.css';

class FileManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dashboard: false,
      filesystem: true,
    };
  }

  render() {
    return (
      <div id="filemanager">
        <h1>
          Spot
          <Badge
            variant="secondary"
            id="badgeTitle"
          >
            <span style={{ color: 'white' }}>Slot</span>
          </Badge>
        </h1>

        <NavBar />

        <button
          id="renderFilesystem"
          style={{ display: 'none' }}
          onClick={() => {
            this.setState((state) => {
              state.filesystem = true;
              state.dashboard = false;
              return state;
            })
          }}
        />
        <button
          id="renderDashboard"
          style={{ display: 'none' }}
          onClick={() => {
            this.setState((state) => {
              state.filesystem = false;
              state.dashboard = true;
              return state;
            });
          }}
        />

        <hr />

        {this.state.filesystem ? <FileSystem /> : false}
        {this.state.dashboard ? <Dashboard /> : false}
      </div>
    );
  }
}

export default FileManager;
