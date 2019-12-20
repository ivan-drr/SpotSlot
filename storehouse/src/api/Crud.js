import $ from 'jquery';

export function fetchElements(path) {
  return $.ajax({
    url: 'http://ejercicios.lan/API/listFiles.php',
    type: 'POST',
    dataType: "json",
    data: {
      "PATH": path
    },
    success: function (result) {
      return result;
    },
    error: function(error) {
      console.error(error);
    },
    complete: function() {
      console.log("Fetching COMPLETE");
      console.log("Rendering...");
    }
  });
}

export function createFolder(path, key) {;
  return $.ajax({
    url: 'http://ejercicios.lan/API/createFolder.php',
    type: 'POST',
    data: {
      "PATH": path,
      "folderName": key
    },
    success: function (result) {
      console.log(result);
    },
    error: function(error) {
      console.error(error);
    }
  });
}

export function removeElement(path, key) {
  return $.ajax({
    url: 'http://ejercicios.lan/API/removeElement.php',
    type: 'POST',
    data: {
      "PATH": path,
      "folderName": key
    },
    success: function (result) {
      console.log(result);
    },
    error: function(error) {
      console.error(error);
    }
  });
}

export function createFile(path, key) {
  return $.ajax({
    url: 'http://ejercicios.lan/API/createFile.php',
    type: 'POST',
    data: {
      "PATH": path,
      "fileName": key
    },
    success: function (result) {
      console.log(result);
    },
    error: function(error) {
      console.error(error);
    }
  });
}

export function renameElement(path, oldKey, newKey) {
  return $.ajax({
    url: 'http://ejercicios.lan/API/renameElement.php',
    type: 'POST',
    data: {
      "PATH": path,
      "newKey": newKey,
      "oldKey": oldKey
    },
    success: function (result) {
      console.log(result);
    },
    error: function(error) {
      console.error(error);
    }
  });
}
