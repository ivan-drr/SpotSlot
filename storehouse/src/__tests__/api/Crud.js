import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { fetchElements, createFolder, removeElement, createFile, renameElement } from '../../api/Crud';

beforeAll(() => {
  const PATH = '<rootDir>/src/__tests__/rootFolderToTestAPI';
});

describe('Integration Tests', () => {
  describe('fetchElements', function () {
    it('should fetch files and folders of PATH', () => {
      fetchElements().then(data => {
        expect(data.length).toHaveLength(4).toBe(true);
      })
    });
  });

});
