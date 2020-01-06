import React, { Component } from 'react';

import AreaSelector from './AreaSelector';
import { mapModified, isFolder, fileType, fileName } from '../api/Mappers';

import '../styles/Grid.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

/**
 * General component description in JSDoc format. Markdown is *supported*.
 */
class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      container: false,
      cards: false
    }

    this.filesToShow = [];

    this.handleFolders = this.handleFolders.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.getFilesKeys = this.getFilesKeys.bind(this);
  }

  componentDidMount() {
    this.setState(state => {
      state.container = document.getElementById('app');
      state.cards = Array.prototype.slice.call(document.getElementsByClassName('cardFile'));

      return state;
    });
  }

  getFilesKeys(files) {
    let fileKeys = [];
    files.forEach(file => { fileKeys.push(file.key) });
    return fileKeys;
  }

  handleFolders(files) {
    if (files !== 0) {

      files.forEach(name => {
        let key = name.substring(1, name.length);

        if ((!key.includes('/') || key.charAt(key.indexOf('/')+1) === '') && this.filesToShow.indexOf(key) === -1) this.filesToShow.push(key);
        else {

        }
      })
    }
  }

  handleFiles() {
    let files = [];
    if (this.props.files !== null && this.props.files.length !== 0) {
      this.props.files.forEach(file => {
        files.push(
          <Col className="file" xs={6} sm={6} md={4} lg={3}>
            <Card id={fileName(file.key)} className={isFolder(file.key)?" folder-white cardFile":" file-white cardFile"}>
                <Card.Header className={isFolder(file.key)?"folderHeader-white":"fileHeader-white"}>
                  <Card.Title className={isFolder(file.key)?"folderName-white":"fileName-white"}>{fileName(file.key)}</Card.Title>
                </Card.Header>

                <Card.Footer className="text-muted footer">
                  Last updated {mapModified(file.modified)} ago<br></br>
                  {isFolder(file.key)?true:'Size: ' + file.size + ' - '}<FontAwesomeIcon icon={fileType(file.key)} />
                </Card.Footer>
            </Card>
          </Col>
        );
      });
    } else return <span className="text-info mt-3">No files</span>;

    return files;
  }

  render() {
    return (
      <div id="fileManager">
        <AreaSelector container={this.state.container} cards={this.state.cards} />
        <Container>
          <Row className="justify-content-md-center fadeIn">
            {this.handleFiles()}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Grid;
