import React, { Component } from 'react';
import { fileName, lastDirectory } from './Mapper';
import { styledLog, startCounter, endCounter } from './Utilities';
import * as Log from './constants/log';
import { storageRef } from './constants/firebase';

import Loading from './Loading';
import AreaSelector from './AreaSelector';
import FileCard from './FileCard';
import Breadcrumb from './Breadcrumb';

import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCloudDownloadAlt, faEye, faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles/FileManager.css';

class FileManager extends Component {
  constructor(props) {
    super(props);
    this.filesToShow = [];

    this.state = {
      _isFetch: false,
      path: '/',
      files: [],
      fileUploadProgress: 0
    };
  }

  componentDidMount() {
    this.fetchFiles(this.state.path);
  }

  fetchFiles = (path) => {
    startCounter();
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
      return state;
    });
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

  handleCreateFile = e => {
    const file = e.target.files[0];
    const filepath = this.state.path + file.name;
    const ref = storageRef.child(file.name);

    // Check if file already exist
    if(this.state.files.map(f => {
      if (filepath === "/" + f.key) return true;
      return false;
    }).join().includes("true")) return;

    const uploadTask = ref.put(file);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState(state => {
        state.fileUploadProgress = progress;
        return state;
      });
    }, error => {
      styledLog(`${Log.ERROR}File ${file.name} couldn't be uploaded`);
      this.setState(state => {
        state.fileUploadProgress = 0;
        return state;
      });
    }, () => {
      styledLog(`${Log.INFO}File ${file.name} uploaded`);
      this.setState(state => {
        state.fileUploadProgress = 0;
        return state;
      });
      this.setState(state => {
        state.files.push({
          key: this.state.path + file.name,
          metadata: {
            _isFile: true,
            name: file.name,
            size: file.size,
            updated: file.lastModifiedDate,
            fullPath: this.state.path + file.name,
            contentType: file.type,
          }
        })
        return state;
      });
    });
  }

  render() {
    return (
      <div id="fileManager">
        <h1>
          Spot
          <Badge
            variant="secondary"
            id="badgeTitle"
            style={{ backgroundColor: 'rgba(#6c9eb8, 0.97)' }}
          >
            Slot
          </Badge>
        </h1>
        <hr />
        <div id="toolNav" className="flex-column fixed-right rounded">
          <Nav>
            <Nav.Link disabled>
              <Button disabled
                className="button"
                variant="primary">
                  <FontAwesomeIcon icon={faEye} />
              </Button>
            </Nav.Link>

            <Nav.Link disabled>
              <Button disabled
                className="button"
                variant="danger">
                  <FontAwesomeIcon icon={faTrash} />
              </Button>
            </Nav.Link>

            <Nav.Link disabled>
              <Button disabled
                className="button"
                variant="info">
                  <FontAwesomeIcon icon={faCloudDownloadAlt} />
              </Button>
            </Nav.Link>

            <Nav.Link>
              <Button className="button"
                variant="success"
                onClick={() => document.getElementById("fileElem").click()}>
                  <FontAwesomeIcon icon={faFolderPlus} />
              </Button>
            </Nav.Link>

            <form>
              <input type="file"
                id="fileElem"
                style={{display: "none"}}
                onChange={ (e) => this.handleCreateFile(e) } />
            </form>
          </Nav>
        </div>



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
        <AreaSelector />
        <Container>
          <Row className="justify-content-md-center fadeIn" id="cardsRow">
            {this.handleShowFileCards()}
          </Row>
        </Container>
        <ProgressBar
          id="fileUploadProgressBar"
          className="fixedFooter"
          now={this.state.fileUploadProgress}
          label={`${this.state.fileUploadProgress}%`} srOnly />
      </div>
    );
  }
}

export default FileManager;
