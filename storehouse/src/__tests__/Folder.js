import React, { Component } from 'react';
import Enzyme, { shallow } from 'enzyme';
import Folder from '../components/Folder';

import { fetchElements, createFolder, removeElement, createFile, renameElement } from '../api/Crud';
import { mapModified } from '../api/Mappers';

beforeAll(function () {
  jest.mock("react-keyed-file-browser");
  jest.mock("../api/Crud");
  jest.mock("../api/Mappers");
});

describe('Unit Tests', () => {
  describe('Render', function () {
    it('should render correctly with no props', () => {
      const folder = shallow(<Folder/>);

      expect(folder).toMatchSnapshot();
    });
  });

  describe('Fetch files', function () {
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
      const mockFetchElements = jest
        .fn()
        .mockResolvedValue(response);

      mockFetchElements().then(data => {
        state.files = data;
        expect(state.files).toEqual(response);
      });

      mockFetchElements.mockClear();
    });
  });

  describe('Create Folder', () => {
    it('should create a folder', () => {
      const key = "newFolder";
      const mockCreateFolder = jest
        .fn(key)
        .mockImplementation(() => {

        })
    });

    it('should warn that the folder already exists', function () {

    });

    it('should warn that the key for the new folder is empty or undefined', function () {

    });
  });

  describe('Create File', () => {
    it('should create a file', () => {
      const key = "newFolder";
      const mockCreateFolder = jest
        .fn(key)
        .mockImplementation(() => {

        })
    });

    it('should warn that the file already exists', function () {

    });

    it('should warn that the key for the new file is empty or undefined', function () {

    });
  });

  describe('Remove Element', () => {
    it('should remove an element', () => {
      const key = "newFolder";
      const mockCreateFolder = jest
        .fn(key)
        .mockImplementation(() => {

        })
    });

    it('should warn that the element do not exists', function () {

    });
  });

  describe('Rename Element', () => {
    it('should rename an element', () => {
      const key = "newFolder";
      const mockCreateFolder = jest
        .fn(key)
        .mockImplementation(() => {

        })
    });

    it('should warn that the element do not exists', function () {

    });

    it('should warn that the key for the new element is empty or undefined', function () {

    });
  });

});
