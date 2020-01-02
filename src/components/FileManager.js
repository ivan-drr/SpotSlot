import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'

import { mapModified, fileType } from '../api/Mappers';

class FileManager extends Component {

  constructor(props) {
    super(props);
    this.handleFiles = this.handleFiles.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, data) {
    console.log(e.target.parentElement.className);
    console.log(data+" was clicked");
  }

  handleFiles() {
    var files = [];
    if (this.props.files.length !== 0) {
      this.props.files.forEach(file => {
        files.push(
          <tr className={fileType(file.key)} onClick={e => this.handleClick(e, file.key)}>
            <td>{file.key}</td>
            <td>{file.size}</td>
            <td>{mapModified(file.modified)}</td>
          </tr>
        );
      });
    }

    if(!this.props.files) return 'No files';
    else return files;
  }

  render() {

    return (
      <div className="folderManager">
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Size</th>
              <th>Last modification</th>
            </tr>
          </thead>
          <tbody>{this.handleFiles()}</tbody>
        </Table>
      </div>
    )
  }

}

export default FileManager;
