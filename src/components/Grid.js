import React, { Component } from 'react';

import Loading from './Loading';
import AreaSelector from './AreaSelector';
import { fetchData } from '../api/Crud';
import { mapModified, isFolder, fileType, fileName } from '../api/Mappers';
import { styledLog } from './Utilities';
import { PATH } from './constants/global';
import * as Log from './constants/log';

import '../styles/Grid.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

class Grid extends Component {
  constructor(props) {
    super(props);
    this.files = [];
    this.filesToShow = [];

    this.state = {
      _isFetch: false
    }
  }

  componentDidMount() {
    if (PATH !== '' && PATH !== null) styledLog(Log.REQUEST + 'Fetching Files...');
    else styledLog(Log.WARNING + '​𝙀𝙈𝙋𝙏𝙔 path');

    fetchData(PATH)
      .then(result => {
        if (result.log !== 'empty_path_given') this.files = result;
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

  render() {
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
    let files = [];
    if (this.files !== null && this.files.length !== 0) {
      this.files.forEach(file => {
        files.push(
          <Col key={fileName(file.key)} className="file" xs={6} sm={6} md={4} lg={3}>
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
}

export default Grid;
