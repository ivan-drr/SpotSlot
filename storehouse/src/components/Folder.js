import React, { Component } from 'react';
import '../styles/Folder.css';
import Moment from 'moment';
import $ from 'jquery';
import { asyncForEach } from '../assets/OwnFunctions';
import { fetchElements, createFolder, removeElement, createFile, renameElement } from '../api/Crud';
import { mapModified } from '../api/Mappers';

import FileBrowser, {Icons} from 'react-keyed-file-browser';

class Folder extends Component {
  state = {
    files: []
  }

  componentDidMount() {
    console.log("Fetching Files...");

    fetchElements().then((result) => {
      this.setState(state => {
        state.files = result.map((file) => {
          return mapModified(file);
        });
        return state;
      });
    });
  }

  handleCreateFolder = (key) => {
    createFolder(key);

    this.setState(state => {
      state.files = state.files.concat([{
        key: key,
      }])
      return state
    })
  }

  handleCreateFile = (key) => {
    createFile(key)

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
    renameElement(oldKey, newKey);

    this.setState(state => {
      const newFiles = []
      asyncForEach(state.files , (file) => {
        if (file.key.substr(0, oldKey.length) === oldKey) {
          newFiles.push({
            ...file,
            key: file.key.replace(oldKey, newKey),
            modified: +Moment(),
          })
        } else {
          newFiles.push(file)
        }
      })
      state.files = newFiles
      return state
    })
  }
  handleRenameFile = (oldKey, newKey) => {
    renameElement(oldKey, newKey);

    this.setState(state => {
      const newFiles = []
      asyncForEach(state.files, (file) => {
        if (file.key === oldKey) {
          newFiles.push({
            ...file,
            key: newKey,
            modified: +Moment(),
          })
        } else {
          newFiles.push(file)
        }
      })
      state.files = newFiles
      return state
    })
  }
  handleDeleteFolder = (folderKey) => {
    removeElement(folderKey);

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
    removeElement(fileKey);

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
    $('#loading').fadeOut(800);
    console.log("Render COMPLETE");
    return (
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
    )
  }
}

export default Folder;
