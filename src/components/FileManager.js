import React, { Component } from 'react';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { fileName, lastDirectory } from './Mapper';
import { styledLog, startCounter, endCounter } from './Utilities';
import * as Log from './constants/log';
import { storageRef } from './constants/firebase';

import Loading from './Loading';
import AreaSelector from './AreaSelector';
import FileCard from './FileCard';
import Breadcrumb from './Breadcrumb';


import '../styles/FileManager.css';

class FileManager extends Component {
  constructor(props) {
    super(props);
    this.filesToShow = [];

    this.state = {
      _isFetch: false,
      path: '/',
      files: [],
      fileUploadProgress: 0,
    };
  }

  componentDidMount() {
    this.fetchFiles(this.state.path);
  }

  fetchFiles = (path) => {
    startCounter();
    console.log('');
    styledLog(`${Log.REQUEST}Fetching Files from ${path} ...`);

    const listRef = storageRef.child(path);

    return listRef.listAll().then((res) => {
      res.prefixes.forEach((folderRef) => {
        this.setState((state) => {
          state.files.push({
            key: `${folderRef.location.path}/`,
            metadata: {
              _isFile: false,
              name: fileName(`${folderRef.location.path}/`),
            },
          });
          return state;
        });
      });
      styledLog(`${Log.SUCCESS}Fetch with no metadata complete${endCounter()}`);
      if (this.state.files.length === 0) styledLog(`${Log.INFO}No folders found`);

      res.items.forEach((itemRef) => {
        this.fetchFilesMetadata(itemRef).then((item) => {
          this.setState((state) => {
            state.files.push(item);
            return state;
          });
        });
      });
      this.setState((state) => {
        state._isFetch = true;
        state.path = path;
        return state;
      });
    }).catch((error) => {
      console.log(error);
      return false;
    });
  }

  fetchFilesMetadata = (itemRef) => {
    startCounter();
    return itemRef.getMetadata().then((metadata) => {
      styledLog(`${Log.SUCCESS}Metadata fetched for ${metadata.name}${endCounter()}`);
      return {
        key: itemRef.location.path,
        metadata: {
          _isFile: true,
          name: metadata.name,
          size: metadata.size,
          timeCreated: metadata.timeCreated,
          updated: metadata.updated,
          fullPath: metadata.fullPath,
          contentType: metadata.contentType,
        },
      };
    }).catch((error) => {
      console.log(error);
      return false;
    });
  }

  handleShowFileCards = () => {
    if (this.state.files === null || this.state.files.length < 0) {
      return (
        <span className="text-info mt-3">
          {
          this.state._isFetch
            ? 'No files'
            : false
        }
        </span>
      );
    }

    const fileCards = [];

    this.state.files.forEach((file) => {
      fileCards.push(
        <FileCard
          key={file.key}
          file={file}
          customOnClick={(e) => { this.handleOpenFolder(file.key); }}
        />,
      );
    });
    return fileCards;
  }

  handleOpenFolder = (path) => {
    if (!path.endsWith('/')) return false;

    this.setState((state) => {
      state.files = [];
    });
    document.getElementById('unselectCards').click();
    this.fetchFiles(path);
  }

  handleGoBack = (e) => {
    if (this.state.path === '/') return;
    this.handleOpenFolder(lastDirectory(this.state.path));
  }

  handleOpenRoot = () => {
    if (this.state.path === '/') return;
    this.handleOpenFolder('/');
  }

  handleCreateFile = (e) => {
    const file = e.target.files[0];
    e.target.value = '';

    const filepath = this.state.path + file.name;
    const ref = storageRef.child(this.state.path + file.name);

    // Check if file already exist
    if (this.state.files.map((f) => {
      if (filepath === `/${f.key}`) {
        styledLog(`${Log.WARNING}File ${f.key} already exist`);
        return true;
      }
      return false;
    }).join().includes('true')) return;

    const uploadTask = ref.put(file);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState((state) => {
        state.fileUploadProgress = progress;
        return state;
      });
    }, (error) => {
      styledLog(`${Log.ERROR}File ${file.name} couldn't be uploaded`);
      this.setState((state) => {
        state.fileUploadProgress = 0;
        return state;
      });
    }, () => {
      styledLog(`${Log.INFO}File ${file.name} was uploaded`);
      this.setState((state) => {
        state.fileUploadProgress = 0;
        return state;
      });
      this.setState((state) => {
        state.files.push({
          key: filepath,
          metadata: {
            _isFile: true,
            name: file.name,
            size: file.size,
            updated: new Date(),
            fullPath: filepath,
            contentType: file.type,
          },
        });
        return state;
      });
    });
  }

  handleDeleteStateFile = (e) => {
    e.persist();
    this.setState((state) => {
      state.files.forEach((file, index) => {
        if (file.key === e.target.value) {
          state.files.splice(index, 1);
          return state;
        }
      });
    });
  }

  handleCreateFolder = () => {
    setTimeout(() => {
      const folderInput = document.getElementById('folderName');
      if (folderInput === null) return;

      document.getElementById('folderName').onkeypress = (e) => {
        if (!e) e = window.event;
        const keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
          document.getElementById('newfolderOverlay').click();
          if (e.target.value.replace(/\s/g, '').length <= 0) return;

          const ref = storageRef.child(`${this.state.path}/${e.target.value}/.folder`);
          ref.put(new File([''], '.folder')).then(() => {
            styledLog(`${Log.INFO}Folder ${e.target.value} was created`);
            this.setState((state) => {
              state.files.push({
                key: `${this.state.path}${e.target.value}/`,
                metadata: {
                  _isFile: false,
                  name: fileName(`${e.target.value}/`),
                },
              });
              return state;
            });
          });
        }
      };
    }, 0);
  }

  render() {
    return (
      <div id="fileManager">
        <input id="deleteStateFile" style={{ display: 'none' }} type="text" onClick={(e) => this.handleDeleteStateFile(e)} />
        <h1>
          Spot
          <Badge
            variant="secondary"
            id="badgeTitle"
          >
            <span style={{ color: 'white' }}>Slot</span>
          </Badge>
        </h1>
        <hr />

        <AreaSelector />
        <form>
          <input
            type="file"
            id="addFile"
            style={{ display: 'none' }}
            onChange={(e) => this.handleCreateFile(e)}
          />
        </form>
        <button
          id="addFolder"
          style={{ display: 'none' }}
          onClick={() => this.handleCreateFolder()}
        />

        <Breadcrumb currentPath={this.state.path} />

        <div id="fileNav">
          <div
            id="btnBack"
            type="button"
            onClick={(e) => this.handleGoBack(e)}
            style={{
              color: '#6c9db7',
              fontSize: '40px',
              display: 'inline-block',
              marginRight: '1.8rem',
            }}
          >
            ⬅
          </div>
          <div
            id="btnRoot"
            type="button"
            onClick={this.handleOpenRoot}
            style={{
              color: '#6c9db7',
              fontSize: '40px',
              display: 'inline-block',
            }}
          >
            ❖
          </div>
        </div>
        <Loading _isFetch={this.state._isFetch} />
        <Container>
          <Row className="justify-content-md-center fadeIn" id="cardsRow">
            {this.handleShowFileCards()}
          </Row>
        </Container>
        <ProgressBar
          id="fileUploadProgressBar"
          className="fixedFooter"
          now={this.state.fileUploadProgress}
          label={`${this.state.fileUploadProgress}%`}
          srOnly
        />
      </div>
    );
  }
}

export default FileManager;
