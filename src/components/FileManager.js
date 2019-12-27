import React, { Component } from 'react';
import { mapModified, fileType } from '../api/Mappers';

class FileManager extends Component {

  constructor(props) {
    super(props);
    this.handleFiles = this.handleFiles.bind(this);
  }

  handleFiles() {
    var files = [];
    var htmlClass = 'file';

    if (this.props.files.length !== 0) {
      this.props.files.forEach((file, index) => {
        files.push(
          <tr className={fileType(file.key)}>
            <th scope="row">{index+1}</th>
            <td>{file.key}</td>
            <td>{file.size}</td>
            <td>{mapModified(file.modified)}</td>
          </tr>
        );
      })
    }

    if(!files) return (<td colspan="4">No files</td>);
    else return files;
  }

  render() {
    return (
      <div className="folderManager">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Size</th>
              <th scope="col">Last modified</th>
            </tr>
          </thead>
          <tbody>
            {this.handleFiles()}

          </tbody>
        </table>
      </div>
    )
  }

}

export default FileManager;
