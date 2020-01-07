import React from 'react';

import '../styles/FileManager.css';
import Badge from 'react-bootstrap/Badge';
import ToolNav from './ToolNav';
import Breadcrumb from './Breadcrumb';
import Grid from './Grid';

const FileManager = () => {
  return (
    <div>
      <h1>Spot<Badge variant="secondary" id="badgeTitle">Slot</Badge></h1>
      <hr></hr>
      <ToolNav/>
      <Breadcrumb/>
      <Grid/>
    </div>
  );
}

export default FileManager;
