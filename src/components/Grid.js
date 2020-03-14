import React, { Component } from 'react';

import Loading from './Loading';
import AreaSelector from './AreaSelector';
import FileCard from './FileCard';
import { fileName } from './Mapper';
import { styledLog, startCounter, endCounter } from './Utilities';
import * as Log from './constants/log';
import { storageRef } from './constants/firebase';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.filesToShow = [];

    this.state = {
      _isFetch: false,
      files: []
    }
  }

  componentDidMount() {
    this.fetchFiles();
  }

  fetchFiles = () => {
    startCounter();
    styledLog(Log.REQUEST + 'Fetching Files...');

    return storageRef.listAll().then(res => {
      res.prefixes.forEach((folderRef, index) => {
        this.setState(state => {
          state.files.push({
            key: folderRef.location.path + "/",
            metadata: {
              _isFile: false,
              name: fileName(folderRef.location.path + "/"),
              index: index
            }
          });
          return state;
        });
      });
      res.items.forEach(itemRef => {
        this.fetchFilesMetadata(itemRef).then(item => {
          this.setState(state => {
            state.files.push(item);
            return state;
          })
        });
      });
      styledLog(Log.SUCCESS + 'Fetch with no metadata complete' + endCounter());
      if (this.state.files.length === 0) styledLog(Log.INFO + 'Directory is empty');
      this.setState(state => {
        state._isFetch = true;
        return state;
      });
    }).catch(function(error) {
      console.log(error);
      return false;
    });
  }

  fetchFilesMetadata = (itemRef, index) => {
    startCounter();
    return itemRef.getMetadata().then(metadata => {
      styledLog(Log.SUCCESS + 'Metadata fetched for ' + metadata.name + endCounter());
      return {
        key: itemRef.location.path,
        metadata: {
          _isFile: true,
          name: metadata.name,
          index: index,
          size: metadata.size,
          timeCreated: metadata.timeCreated,
          updated: metadata.updated,
          fullPath: metadata.fullPath,
          contentType: metadata.contentType
        }
      }
    }).catch(error => {
      console.log(error);
      return false;
    });
  }

  getFilesKeys = (files) => {
    let fileKeys = [];
    files.forEach(file => { fileKeys.push(file.key) });
    return fileKeys;
  }

  handleFolders = (files) => {
    if (files !== 0) {
      files.forEach(name => {
        let key = name.substring(1, name.length);

        if ((!key.includes('/') || key.charAt(key.indexOf('/')+1) === '') && this.filesToShow.indexOf(key) === -1) this.filesToShow.push(key);
        else {

        }
      })
    }
  }

  handleFilesAndEmptyFolders = () => {
    if (this.state.files === null || this.state.files.length < 0) return (
      <span className="text-info mt-3">
        {
          this.state._isFetch
          ? "No files"
          : false
        }
      </span>
    );

    let fileCards = [];
    console.log(this.state.files);

    this.state.files.forEach(file => {
      fileCards.push(<FileCard key={file.metadata.index} file={file} />);
    });
    return fileCards;
  }

  render() {
    console.log(this.state.files);
    return (
      <div id="fileManager">
        <Loading _isFetch={this.state._isFetch}/>
        <AreaSelector />
        <Container>
          <Row className="justify-content-md-center fadeIn">
            {this.handleFilesAndEmptyFolders()}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Grid;
