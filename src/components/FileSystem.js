import React, { Component } from 'react';

import Loading from './Loading';
import AreaSelector from './AreaSelector';
import FileCard from './FileCard';
import Breadcrumb from './Breadcrumb';
import { fileName, lastDirectory } from './Mapper';
import {
  styledLog, startCounter, endCounter, clone,
} from './Utilities';
import * as Log from './constants/log';
import { storageRef } from './constants/firebase';
import { fetchFilesMetadata } from './FirebaseAPI';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faArrowLeft, faEye, faLowVision
} from '@fortawesome/free-solid-svg-icons';

import '../styles/FileSystem.css';

class FileSystem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _isFetch: false,
      existingFile: false,
      hiddenFiles: false,
      dashboard: false,
      filesystem: true,
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
        fetchFilesMetadata(itemRef).then((item) => {
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

  checkIfFileExist = (file) => {
    if (this.state.files.map((f) => {
      if (file[0] === '/') file = file.substr(1);
      if (file === f.key) {
        styledLog(`${Log.WARNING}Archive ${f.key} already exist`);
        this.setState({existingFile: true});
        return true;
      }
      return false;
    }).join().includes('true')) return true;
    return false;
  }

  handleCreateFile = (e) => {
    const file = e.target.files[0];
    e.target.value = '';

    const path = clone(this.state.path);
    let filepath = path + file.name;
    const ref = storageRef.child(path + file.name);

    if (this.checkIfFileExist(filepath)) return;

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

      if (this.state.path !== path) return;
      this.setState((state) => {
        state.files.push({
          key: filepath,
          metadata: {
            _isFile: true,
            name: file.name,
            size: file.size,
            updated: new Date(),
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
        }
      });
    });
    this.forceUpdate();
  }

  handleCreateFolder = () => {
    setTimeout(() => {
      const folderInput = document.getElementById('folderName');
      const path = clone(this.state.path);

      if (folderInput === null) return;
      const overlay = document.getElementById('newfolderOverlay');

      folderInput.onkeydown = (e) => {
        if (!e) e = window.event;
        const keyCode = e.keyCode || e.which;
        if (keyCode === 27) overlay.click();
      }
      folderInput.onkeypress = (e) => {
        if (!e) e = window.event;
        const keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
          let folderpath = path + folderInput.value + '/';
          if (this.checkIfFileExist(folderpath)) return;

          overlay.click();
          if (e.target.value.replace(/\s/g, '').length <= 0) return;

          const ref = storageRef.child(`${path}/${e.target.value}/.folder`);
          ref.put(new File([''], '.folder')).then(() => {
            styledLog(`${Log.INFO}Folder ${e.target.value} was created`);

            setTimeout(() => {
              if (path !== this.state.path) return;
              this.setState((state) => {
                state.files.push({
                  key: `${path}${e.target.value}/`,
                  metadata: {
                    _isFile: false,
                    name: fileName(`${e.target.value}/`),
                  },
                });
                return state;
              });
            }, 100);
          });
        }
      };
    }, 0);
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
      if (!this.state.hiddenFiles) {
        if(fileName(file.key)[0] === '.') return;
      }

      fileCards.push(
        <FileCard
          key={file.key}
          file={file}
          customOnClick={(e) => this.handleOpenFolder(file.key)}
        />
      );
    });
    return fileCards;
  }

  render() {
    return (
      <div id="filesystem">
        {this.state.existingFile
          ? (<Alert variant="warning" style={{width: '50%', marginLeft: '26%',}} onClose={() => this.setState({existingFile: false})} dismissible>
              <Alert.Heading>Archive already exist!</Alert.Heading>
              <p>
                To rewrite it try to delete and reupload the file.
              </p>
            </Alert>)
          : false}
        <AreaSelector />
        <form>
          <input
            type="file"
            id="addFile"
            style={{ display: 'none' }}
            onChange={(e) => this.handleCreateFile(e)}
          />
          <input
            type="text"
            id="deleteStateFile"
            style={{ display: 'none' }}
            onChange={(e) => this.handleDeleteStateFile(e)}
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
              color: '#377e8c',
              fontSize: '40px',
              display: 'inline-block',
              marginRight: '1.8rem',
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <div
            id="btnRoot"
            type="button"
            onClick={() => this.handleOpenRoot()}
            style={{
              color: '#377e8c',
              fontSize: '40px',
              display: 'inline-block',
            }}
          >
            <FontAwesomeIcon icon={faHome} />
          </div>
          <div
            id="btnHide"
            type="button"
            onClick={() => {
              this.setState((state) => {
                state.hiddenFiles = !state.hiddenFiles;
                return state;
              });
            }}
            style={{
              color: '#377e8c',
              fontSize: '40px',
              display: 'inline-block',
              marginLeft: '24px'
            }}
          >
            <FontAwesomeIcon icon={this.state.hiddenFiles ? faEye : faLowVision} />
          </div>
        </div>
        <Loading _isFetch={this.state._isFetch} />
        <Container>
          <Row className="justify-content-md-center" id="cardsRow">
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

export default FileSystem;
