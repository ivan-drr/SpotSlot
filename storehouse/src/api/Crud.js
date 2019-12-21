import $ from 'jquery';

export function fetchData(path) {
  return $.ajax({
    url: 'http://ejercicios.lan/API/fetchData.php',
    type: 'POST',
    dataType: "json",
    data: {
      "PATH": path
    },
    success: function (result) {
      console.info('%c✔ Fetching complete', 'color: green');
      return result;
    },
    error: function(error) {
      console.info('%c✘ Error fetching files', 'color: red');
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
