import React, { Component } from 'react';
import Badge from 'react-bootstrap/Badge';
import NavBar from './NavBar';
import FileSystem from './FileSystem';
import Dashboard from './Dashboard';

import '../styles/FileManager.css';

class FileManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dashboard: false,
      filesystem: true,
    };
  }

  componentDidMount() {
    document.body.addEventListener('mousedown', (e) => this.handleClickOutOfMenu(e));
  }

  componentWillUnmount() {
    document.body.cloneNode(true);
  }

  handleClickOutOfMenu = (e) => {
    let { target } = e;
    const menu = document.getElementById('menu-toggler');

    if (menu.checked) {
      if (target.id !== 'menu-toggler' && target.className !== 'item') {
        target = target.parentElement;
        if (target.className !== 'item') {
          target = target.parentElement;
          if (target.className !== 'item') menu.click();
        }
      }
    }
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
            });
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
