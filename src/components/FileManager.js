import React, { Component } from 'react';
import '../styles/FileManager.css';

import Loading from './Loading';
import { fetchData, createElement, removeElement, renameElement } from '../api/Crud';
import { styledLog } from './OwnFunctions';
import * as Log from './constants/log';

import Grid from './Grid';
import InputGroup from 'react-bootstrap/InputGroup'
import Badge from 'react-bootstrap/Badge'
import ToolNav from './ToolNav'

class FileManager extends Component {

  constructor(props) {
    super(props);
    this.path = '/home/snowtray/test';
    this.files = [];
    this.state = {
      _isFetch: false
    }
  }

  componentDidMount() {
    if (this.path !== '' && this.path !== null) styledLog(Log.REQUEST + 'Fetching Files...');
    else styledLog(Log.WARNING + '​𝙀𝙈𝙋𝙏𝙔 path');

    fetchData(this.path)
      .then(result => {
        if (result.log !== 'empty_path_given') this.files = result;
        this.setState(state => {
          state._isFetch = true;
          return state;
        });
      })
      .catch(error => {
        this.setState(state => {
          state._isFetch = 'error';
          return state;
        })
      })
  }

  handleChangePath = () => {
    this.setState(state => {
      state.path = document.getElementById('selectPath').value;
      return state;
    });
  }

  handleCreateFolder = (key) => {
    createElement(this.state.path, key);

    this.setState(state => {
      state.files = state.files.concat([{
        key: key,
      }])
      return state
    })
  }

  handleCreateFile = (key) => {
    createElement(this.state.path, key)

    this.setState(state => {
      state.files = state.files.concat([{
        key: key,
        size: this.file.size,
        modified: 'Now'
      }])
      return state
    })
  }

  handleRenameFolder = (oldKey, newKey) => {

    renameElement(this.state.path, oldKey, newKey);

    this.setState(state => {
      state.files.forEach((file) => {
        if (file.key === '/'+oldKey) {
          file.key = newKey;
        }
      })
      return state
    })
  }

  handleRenameFile = (oldKey, newKey) => {
    renameElement(this.state.path, oldKey, newKey);

    this.setState(state => {
      state.files.forEach((file) => {
        if (file.key === '/'+oldKey) {
          file.key = newKey;
        }
      })
      return state
    })
  }

  handleDeleteFolder = (folderKey) => {
    removeElement(this.state.path, folderKey);

    this.setState(state => {
      const newFiles = []
      state.files.forEach((file) => {
        if (file.key.substr(0, folderKey.length) !== folderKey) {
          newFiles.push(file)
        }
      })
      state.files = newFiles
      return state
    })
  }

  handleDeleteFile = (fileKey) => {
    removeElement(this.state.path, fileKey);

    this.setState(state => {
      const newFiles = []
      state.files.forEach((file) => {
       if (file.key !== fileKey) {
          newFiles.push(file)
        }
      })
      state.files = newFiles
      return state
    })
  }

  render() {
    return (
      <div>
        <h1>Spot<Badge variant="secondary" id="badgeTitle">Slot</Badge></h1>
        <hr></hr>

        <ToolNav/>

        <InputGroup className="mb-3">
          <InputGroup.Text id="pathText">❖ Current path being spotted</InputGroup.Text>
          <InputGroup.Prepend>
            <InputGroup.Text id="pathInfo">
              {this.path}
            </InputGroup.Text>
          </InputGroup.Prepend>
        </InputGroup>

        {this.state._isFetch?<div><Grid files={this.files} /></div>:<Loading _isFetch={this.state._isFetch}/>}
      </div>
    );
  }
}

export default FileManager;
