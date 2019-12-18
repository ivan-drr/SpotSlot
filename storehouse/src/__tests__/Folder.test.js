import React, { Component } from 'react';
import Enzyme, { shallow } from 'enzyme';
import Folder from '../components/Folder';

import 'font-awesome/css/font-awesome.min.css';
import FileBrowser, { Icons } from 'react-keyed-file-browser';
import { fetchElements, createFolder, removeElement, createFile, renameElement } from '../api/Crud';
import { mapModified } from '../api/Mappers';

beforeEach(function () {
  jest.clearAllMocks();

  jest.mock("react-keyed-file-browser", () => () => <div id="FileBrowser">FileBrowserMock</div>);
  jest.mock("../api/Crud", () => {
    return {
      fetchElements: jest.fn(() => {
        Promise.resolve(
          [
            {
              "key":"\/folder1\/",
              "modified":{
                "days":"2",
                "hours":"21",
                "minutes":"49",
                "seconds":"21"
              },
              "size":0
            },
            {
              "key":"\/folder2\/folder2.1\/",
              "modified":{
                "days":"2",
                "hours":"21",
                "minutes":"49",
                "seconds":"13"
              },
              "size":0
            },
            {
              "key":"\/text.txt",
              "modified":{
                "days":"2",
                "hours":"1",
                "minutes":
                "57",
                "seconds":"6"
              },
              "size":2
            }
          ]
        )
      }),
      createFolder: true,
      removeElement: true,
      createFile: true,
      renameElement: true
    };
  });

  jest.mock("../api/Mappers", () => {
    return {
      mapModified: true,
    };
  });
});

describe('Unit Folder component', () => {
  test('render', () => {
    const wrapper = shallow(<Folder />);

    expect(wrapper.exists()).toBe(true);
  });

  it('should fetch data from API', () => {

  });
});
