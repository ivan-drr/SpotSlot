import React from 'react';
import ReactDOM from 'react-dom'
import Enzyme, { shallow, render } from 'enzyme';
import FileManager from '../../components/FileManager';

describe('Render', function () {
  it('should render correctly without props', function () {
    const folderManager = render(<FileManager />);

    expect(folderManager).toMatchSnapshot();
  });
});

describe('handleFiles', function () {
  const INSTANCE = ReactDOM.render(<FileManager />, document.createElement('div'));

  it('should get files from API', function () {
    const PATH = '/home/snowtray/Proyects';
    expect(INSTANCE.handleFiles(PATH).length).toBeGreaterThan(0);
  });

  it('should warn that no files was given', function () {

  });
});
