import React, { Component } from 'react';
import '../styles/Table.css';
import Moment from 'moment';

import Loading from './Loading';
import { fetchData, createElement, removeElement, renameElement } from '../api/Crud';
import { styledLog } from './OwnFunctions';

import FileManager from './FileManager';

class Table extends Component {

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
        modified: +Moment()
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
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupFileAddon01">Empty</span>
            </div>
            <div className="custom-file">
              <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" />
              <label className="custom-file-label text-primary" htmlFor="inputGroupFile01">Choose a path to scan</label>
            </div>
          </div>

          <div>
            <FileManager files={this.state.files} />
          </div>

          <Loading _isFetch={this.state._isFetch}/>
        </div>

    )
  }
}

export default Table;
