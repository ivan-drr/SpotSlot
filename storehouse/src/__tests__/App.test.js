import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import App from '../components/App';
import Folder from '../components/Folder';

jest.mock('../components/Folder', () => ()=>
<div id="Folder">
   FolderMock
</div>)

describe('Unit App component', () => {
  test('render', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.exists()).toBe(true);
  });
});
