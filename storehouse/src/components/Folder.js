import React, { Component } from 'react';
import '../styles/Folder.css';
import Moment from 'moment';

import Loading from './Loading';
import { fetchData, createElement, removeElement, renameElement } from '../api/Crud';
import { mapModified } from '../api/Mappers';

import FileBrowser, {Icons} from 'react-keyed-file-browser';

class Folder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      path: '',
      files: [],
      _isFetch: false
    }
  }

  componentDidMount() {
    console.info('%c⇄ Fetching Files...', 'color: blue');

    fetchData('/home/snowtray/test/')
      .then(result => {
        this.setState(state => {
          state.files = result.map((file) => {
            return mapModified(file);
          });
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
    //$('#loading').fadeOut(800);
    return (
        <div>
          <input type="file" id="explorer" className="d-none" />
          <div>
            <FileBrowser
              files={this.state.files}
              icons={Icons.FontAwesome(4)}

              onCreateFolder={this.handleCreateFolder}
              onCreateFiles={this.handleCreateFile}
              onMoveFolder={this.handleRenameFolder}
              onMoveFile={this.handleRenameFile}
              onRenameFolder={this.handleRenameFolder}
              onRenameFile={this.handleRenameFile}
              onDeleteFolder={this.handleDeleteFolder}
              onDeleteFile={this.handleDeleteFile}
            />
          </div>

          <Loading _isFetch={this.state._isFetch}/>
        </div>

    )
  }
}

export default Folder;
