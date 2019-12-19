import React, { Component } from 'react';
import Enzyme, { shallow } from 'enzyme';
import Folder from '../components/Folder';

import FileBrowser, { Icons } from 'react-keyed-file-browser';
import { fetchElements, createFolder, removeElement, createFile, renameElement } from '../api/Crud';
import { mapModified } from '../api/Mappers';

beforeAll(function () {
  jest.mock("react-keyed-file-browser");
  jest.mock("../api/Crud");
  jest.mock("../api/Mappers");
});

describe('Unit Tests', () => {
  it('should render correctly with no props', () => {
    const folder = shallow(<Folder/>);

    expect(folder).toMatchSnapshot();
  });

  it('should fetch files and put them into state', () => {
    const state = {
      files: [],
    }
    const response = [
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
    ];
    var mockFetchElements = jest
      .fn()
      .mockResolvedValue(response);

    mockFetchElements().then(data => {
      state.files = data;
      expect(state.files).toEqual(response);
    });

    mockFetchElements.mockClear();
  });

});
