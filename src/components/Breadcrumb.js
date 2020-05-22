import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';

class Breadcrumb extends Component {
  render() {
    let currentPath;
    if (this.props.currentPath === '/') currentPath = 'root';
    else currentPath = `root/${this.props.currentPath}`;

    return (
      <InputGroup className="mb-3">
        <InputGroup.Text id="pathText">
          <span style={{color: "#377e8c"}}>❖ Current path being spotted</span>
        </InputGroup.Text>
        <InputGroup.Prepend>
          <InputGroup.Text id="pathInfo" style={{ fontWeight: 'bold' }}>
            <span style={{color: "white"}}>〈{currentPath}〉</span>
          </InputGroup.Text>
        </InputGroup.Prepend>
      </InputGroup>
    );
  }
}
export default Breadcrumb;
