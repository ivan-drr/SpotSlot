import React, { Component } from 'react';
import '../styles/FileManager.css';

import Loading from './Loading';
import { fetchData, createElement, removeElement, renameElement } from '../api/Crud';
import { styledLog } from './OwnFunctions';

import Grid from './Grid';
import InputGroup from 'react-bootstrap/InputGroup'
import Badge from 'react-bootstrap/Badge'
import ToolNav from './ToolNav'

class FileManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      path: '/home/snowtray/test',
      files: [],
      _isFetch: false,
    }
  }

  componentDidMount() {
    if (this.state.path !== '' && this.state.path !== null) styledLog('%c​⇄ %cFetching Files...');
    else styledLog('%c☂ %c​𝙀𝙈𝙋𝙏𝙔 path');

    fetchData(this.state.path)
      .then(result => {
        if (result.log !== 'empty_path_given') {
          this.setState(state => {
            state.files = result;
          });
        }

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

  /*handleCreateFiles = (files, prefix) => {
    this.setState(state => {
      const newFiles = files.map((file) => {
        let newKey = prefix
        if (prefix !== '' && prefix.substring(prefix.length - 1, prefix.length) !== '/') {
          newKey += '/'
        }
        newKey += file.name
        return {
          key: newKey,
          size: file.size,
          modified: +Moment(),
        }
      })

      const uniqueNewFiles = []
      newFiles.forEach((newFile) => {
        let exists = false
        asyncForEach(state.files, (existingFile) => {
          if (existingFile.key === newFile.key) {
            exists = true
          }
        })
        if (!exists) {
          uniqueNewFiles.push(newFile)
        }
      })
      state.files = state.files.concat(uniqueNewFiles)
      return state
    })
  }*/

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
                {this.state.path}
              </InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>

          <div>
            <Grid files={this.state.files} />
          </div>

          <Loading _isFetch={this.state._isFetch}/>
        </div>
    );
  }
}

export default FileManager;
