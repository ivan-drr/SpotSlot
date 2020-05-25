import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';

export default function Breadcrumb(props) {
  let currentPath;
  if (props.currentPath === '/') currentPath = 'root';
  else currentPath = `root/${props.currentPath}`;

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text id="pathText">
        <span style={{ color: '#377e8c' }}>❖ Current path being spotted</span>
      </InputGroup.Text>
      <InputGroup.Prepend>
        <InputGroup.Text id="pathInfo" style={{ fontWeight: 'bold' }}>
          <span style={{ color: 'white' }}>
            〈
            {currentPath}
            〉
          </span>
        </InputGroup.Text>
      </InputGroup.Prepend>
    </InputGroup>
  );
}
