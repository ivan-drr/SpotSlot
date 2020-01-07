import React, { Component } from 'react';
import InputGroup from 'react-bootstrap/InputGroup'

class Breadcrumb extends Component {

  render() {
    return (
      <InputGroup className="mb-3">
      <InputGroup.Text id="pathText">❖ Current path being spotted</InputGroup.Text>
      <InputGroup.Prepend>
      <InputGroup.Text id="pathInfo">&lt;Root Directory&gt;</InputGroup.Text>
      </InputGroup.Prepend>
      </InputGroup>
    );
  }
}
export default Breadcrumb;
