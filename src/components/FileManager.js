import React, { Component } from 'react';

import { PATH } from './constants/global';

import '../styles/FileManager.css';
import Grid from './Grid';
import InputGroup from 'react-bootstrap/InputGroup'
import Badge from 'react-bootstrap/Badge'
import ToolNav from './ToolNav'

class FileManager extends Component {

  render() {
    return (
      <div>
        <h1>Spot<Badge variant="secondary" id="badgeTitle">Slot</Badge></h1>
        <hr></hr>

        <ToolNav/>

        <InputGroup className="mb-3">
          <InputGroup.Text id="pathText">❖ Current path being spotted</InputGroup.Text>
          <InputGroup.Prepend>
            <InputGroup.Text id="pathInfo">{PATH}</InputGroup.Text>
          </InputGroup.Prepend>
        </InputGroup>

        <Grid/>
      </div>
    );
  }
}

export default FileManager;
