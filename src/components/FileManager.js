import React, { Component } from 'react';

import { PATH } from './constants/global';
import { createElement, removeElement, renameElement } from '../api/Crud';

import '../styles/FileManager.css';
import Grid from './Grid';
import InputGroup from 'react-bootstrap/InputGroup'
import Badge from 'react-bootstrap/Badge'
import ToolNav from './ToolNav'

class FileManager extends Component {

  render() {
    return (
      <div>
        <h1>Spot<Badge variant="secondary" id="badgeTitle">Slot</Badge></h1>
        <hr></hr>

        <ToolNav/>

        <InputGroup className="mb-3">
          <InputGroup.Text id="pathText">❖ Current path being spotted</InputGroup.Text>
          <InputGroup.Prepend>
            <InputGroup.Text id="pathInfo">{PATH}</InputGroup.Text>
          </InputGroup.Prepend>
        </InputGroup>

        <Grid/>
      </div>
    );
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
}

export default FileManager;
