import $ from 'jquery';

export function fetchElements() {
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

export function createFolder(key) {;
  return $.ajax({
    url: 'http://ejercicios.lan/API/createFolder.php',
    type: 'POST',
    data: {"folderName": key},
    success: function (result) {
      console.log(result);
    },
    error: function(error) {
      console.error(error.responseText);
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
