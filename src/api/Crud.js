import $ from 'jquery';
import { styledLog } from '../components/Utilities';

import * as Log from '../components/constants/log';

export function fetchData(path) {
  return $.ajax({
    url: 'http://ejercicios.lan/sot-API/src/fetchData.php',
    type: 'POST',
    dataType: "json",
    data: {
      "PATH": path
    },
    success: function (result) {
      styledLog(Log.SUCCESS + 'Fetching complete');
      return result;
    },
    error: function(error) {
      styledLog(Log.ERROR + 'Error fetching files');
      error.statusText = 'undefined_path_given';

      return error;
    },
  });
}

export function createElement(path, key) {;
  return $.ajax({
    url: 'http://ejercicios.lan/API/createElement.php',
    type: 'POST',
    data: {
      "PATH": path,
      "KEY": key
    },
    success: function (result) {
      return result
    },
    error: function(error) {
      console.warn('Unavailable to create element');
      error.statusText = 'could_not_create_element';

      return error;
    }
  });
}

export function removeElement(path, key) {
  return $.ajax({
    url: 'http://ejercicios.lan/API/removeElement.php',
    type: 'POST',
    data: {
      "PATH": path,
      "KEY": key
    },
    success: function (result) {
      return result;
    },
    error: function(error) {
      console.warn('Unavailable to remove element');
      error.statusText = 'could_not_remove_element';

      return error;
    }
  });
}

export function renameElement(path, oldKey, newKey) {
  return $.ajax({
    url: 'http://ejercicios.lan/API/renameElement.php',
    type: 'POST',
    data: {
      "PATH": path,
      "NEW_KEY": newKey,
      "OLD_KEY": oldKey
    },
    success: function (result) {
      return result;
    },
    error: function(error) {
      console.warn('Unavailable to rename element');
      error.statusText = 'could_not_rename_element';

      return error;
    }
  });
}
