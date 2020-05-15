import React, { Component } from 'react';

import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Loading from './Loading';
import AreaSelector from './AreaSelector';
import FileCard from './FileCard';
import ToolNav from './ToolNav';
import Breadcrumb from './Breadcrumb';
import { fileName, lastDirectory } from './Mapper';
import { styledLog, startCounter, endCounter } from './Utilities';
import * as Log from './constants/log';
import { storageRef } from './constants/firebase';

import '../styles/FileManager.css';

class FileManager extends Component {
  constructor(props) {
    super(props);
    this.filesToShow = [];

    this.state = {
      _isFetch: false,
      path: '/',
      files: [],
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
        <ToolNav />
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
          <Row className="justify-content-md-center fadeIn">
            {this.handleShowFileCards()}
          </Row>
        </Container>
      </div>
    );
  }
}

export default FileManager;
