import $ from 'jquery';

export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export function createFolder(key) {
  $.ajax({
    url: 'http://localhost/web/handler/createFolder.php',
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
  $.ajax({
    url: 'http://localhost/web/handler/removeElement.php',
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
