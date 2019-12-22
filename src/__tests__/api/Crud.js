import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { fetchData, createElement, renameElement, removeElement } from '../../api/Crud';

beforeAll(() => {
  jest.disableAutomock();
});

describe('Integration Tests', () => {
  describe('fetchData', function () {
    it('should fetch files and folders of given PATH', () => {
      const TEST_PATH = './API_test/';

      return fetchData(TEST_PATH).then(data => {
        expect(data).toHaveLength(4);
      })
    });

    it('should warn that the given path is undefined', () => {
      return fetchData().catch(error => {
        expect(error.statusText).toEqual('undefined_path_given');
      })
    });

    it('should warn that the given path is empty', () => {
      const EMPTY_PATH = '';

      return fetchData(EMPTY_PATH).then(data => {
        expect(data.log).toEqual('empty_path_given');
      })
    });

    it('should warn that the target cannot be fetched', () => {
      const FILE_PATH = './API_test/image.png';

      return fetchData(FILE_PATH).then(data => {
        expect(data.log).toEqual('unavailable_path_to_fetch');
      })
    });
  });

  describe('createElement', function () {
    it('should create an element on the given PATH', () => {
      const TEST_PATH = './API_test/';
      const KEY = 'folder/';

      return createElement(TEST_PATH, KEY).then(data => {
        expect(data.log).toEqual('element_created');
      })
    });

    it('should be unavailable to create the element', () => {
      const TEST_PATH = './API_test/';
      const KEY = 'folder2/';

      return createElement(TEST_PATH, KEY).catch(error => {
        expect(error.statusText).toEqual('could_not_create_element');
      })
    });

    it('should warn that the given path is undefined', () => {
      return createElement().then(data => {
        expect(data.log).toEqual('undefined_path_given');
      })
    });

    it('should warn that the given key is undefined', () => {
      const TEST_PATH = './API_test/';

      return createElement(TEST_PATH).then(data => {
        expect(data.log).toEqual('undefined_element_name');
      })
    });

    it('should warn that the given path is empty', () => {
      const EMPTY_PATH = '';

      return createElement(EMPTY_PATH).then(data => {
        expect(data.log).toEqual('empty_path_given');
      })
    });

    it('should warn that the given key is empty', () => {
      const TEST_PATH = './API_test/';
      const KEY = '';

      return createElement(TEST_PATH, KEY).then(data => {
        expect(data.log).toEqual('empty_element_name');
      })
    });
  });

  describe('renameElement', function () {
    it('should rename the element on the given PATH', () => {
      const TEST_PATH = './API_test/';
      const OLD_KEY = 'folder/';
      const NEW_KEY = 'delete/';

      return renameElement(TEST_PATH, OLD_KEY, NEW_KEY).then(data => {
        expect(data.log).toEqual('element_renamed');
      })
    });

    it('should be unavailable to rename an element that does not exist', () => {
      const TEST_PATH = './API_test/';
      const OLD_KEY = 'do_not_exist/';
      const NEW_KEY = 'delete/';

      return renameElement(TEST_PATH, OLD_KEY, NEW_KEY).catch(error => {
        expect(error.statusText).toEqual('could_not_rename_element');
      })
    });

    it('should warn that the given path is undefined', () => {
      return renameElement().then(data => {
        expect(data.log).toEqual('undefined_path_given');
      })
    });

    it('should warn that the given old key is undefined', () => {
      const TEST_PATH = './API_test/';
      var OLD_KEY;
      const NEW_KEY = 'delete/';

      return renameElement(TEST_PATH, OLD_KEY, NEW_KEY).then(data => {
        expect(data.log).toEqual('undefined_element_name');
      })
    });

    it('should warn that the given new key is undefined', () => {
      const TEST_PATH = './API_test/';
      const OLD_KEY = 'folder/';
      var NEW_KEY;

      return renameElement(TEST_PATH, OLD_KEY, NEW_KEY).then(data => {
        expect(data.log).toEqual('undefined_element_name');
      })
    });

    it('should warn that the given path is empty', () => {
      const EMPTY_PATH = '';

      return renameElement(EMPTY_PATH).then(data => {
        expect(data.log).toEqual('empty_path_given');
      })
    });

    it('should warn that the given old key is empty', () => {
      const TEST_PATH = './API_test/';
      const OLD_KEY = '';
      const NEW_KEY = 'delete/';

      return renameElement(TEST_PATH, OLD_KEY, NEW_KEY).then(data => {
        expect(data.log).toEqual('empty_element_name');
      })
    });

    it('should warn that the given new key is empty', () => {
      const TEST_PATH = './API_test/';
      const OLD_KEY = 'folder/';
      const NEW_KEY = '';

      return renameElement(TEST_PATH, OLD_KEY, NEW_KEY).then(data => {
        expect(data.log).toEqual('empty_element_name');
      })
    });
  });

  describe('removeElement', function () {
    it('should remove an element on the given PATH', () => {
      const TEST_PATH = './API_test/';
      const KEY = 'delete/';

      return removeElement(TEST_PATH, KEY).then(data => {
        expect(data.log).toEqual('element_removed');
      })
    });

    it('should be unavailable to remove the element', () => {
      const TEST_PATH = './API_test/';
      const KEY = 'do_not_exist/';

      return removeElement(TEST_PATH, KEY).catch(error => {
        expect(error.statusText).toEqual('could_not_remove_element');
      })
    });

    it('should warn that the given path is undefined', () => {
      return removeElement().then(data => {
        expect(data.log).toEqual('undefined_path_given');
      })
    });

    it('should warn that the given key is undefined', () => {
      const TEST_PATH = './API_test/';

      return removeElement(TEST_PATH).then(data => {
        expect(data.log).toEqual('undefined_element_name');
      })
    });

    it('should warn that the given path is empty', () => {
      const EMPTY_PATH = '';

      return removeElement(EMPTY_PATH).then(data => {
        expect(data.log).toEqual('empty_path_given');
      })
    });

    it('should warn that the given key is empty', () => {
      const TEST_PATH = './API_test/';
      const KEY = '';

      return removeElement(TEST_PATH, KEY).then(data => {
        expect(data.log).toEqual('empty_element_name');
      })
    });

  });

});
