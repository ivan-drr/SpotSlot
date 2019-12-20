import $ from 'jquery';

function definePath(path) {
  return $.ajax({
    url: 'http://ejercicios.lan/API/listFiles.php',
    type: 'POST',
    data: {"PATH": path},
    success: function (result) {
      console.log(result);
    },
    error: function(error) {
      console.error(error);
    }
  });
}

function fetchElements() {
  return $.ajax({
    url: 'http://ejercicios.lan/API/listFiles.php',
    type: 'GET',
    dataType: "json",
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

export async function asyncFetchElements(path) {
  await definePath(path);
  await fetchElements();
}

export function createFolder(key) {;
  return $.ajax({
    url: 'http://ejercicios.lan/API/createFolder.php',
    type: 'POST',
    data: {"folderName": key},
    success: function (result) {
      console.log(result);
    },
    error: function(error) {
      console.error(error);
    }
  });
}

export function removeElement(key) {
  return $.ajax({
    url: 'http://ejercicios.lan/API/removeElement.php',
    type: 'POST',
    data: {"folderName": key},
    success: function (result) {
      console.log(result);
    },
    error: function(error) {
      console.error(error);
    }
  });
}

export function createFile(key) {
  return $.ajax({
    url: 'http://ejercicios.lan/API/createFile.php',
    type: 'POST',
    data: {"fileName": key},
    success: function (result) {
      console.log(result);
    },
    error: function(error) {
      console.error(error);
    }
  });
}

export function renameElement(oldKey, newKey) {
  return $.ajax({
    url: 'http://ejercicios.lan/API/renameElement.php',
    type: 'POST',
    data: {
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
