import { storageRef } from './constants/firebase';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import * as Log from './constants/log';
import { styledLog, startCounter, endCounter } from './Utilities';
import { fileName } from './Mapper';

export const deleteAllFilesFrom = (startPath) => {
  const listRef = storageRef.child(startPath);

  listRef.listAll().then((res) => {
    res.prefixes.forEach((folderRef) => {
      deleteAllFilesFrom(folderRef.location.path);
    });
    res.items.forEach((itemRef) => {
      itemRef.delete();
    });
  }).catch((error) => {
    console.log(error);
    return false;
  });
};

export const getAllFilesSize = (path) => {
  const listRef = storageRef.child(path);

  listRef.listAll().then((res) => {
    res.prefixes.forEach((folderRef) => {
      getAllFilesSize(folderRef.location.path);
    });
    res.items.forEach((itemRef) => {
      fetchFilesMetadata(itemRef, true).then((file) => {
        const changeSpace = document.getElementById('addSpaceUsed');
        changeSpace.value = file.metadata.size;
        changeSpace.click();
      });
    });
  }).catch((error) => {
    console.log(error);
    return false;
  });
};

export const handleZipAllFiles = (ref) => {
  const zip = new JSZip();
  zipAllFiles(ref, zip).then(() => {
    setTimeout(() => {
    zip.generateAsync({type:"blob"})
    .then((content) => {
      saveAs(content, fileName(ref) + '.zip');
    });
  }, 5000);
  });
}

const zipAllFiles = (ref, zip) => {
  const listRef = storageRef.child(ref);

  return listRef.listAll().then((res) => {
    res.prefixes.forEach((folderRef) => {
      zipAllFiles(folderRef.location.path, zip.folder(folderRef.location.path));
    });
    res.items.forEach((itemRef) => {
      return itemRef.getDownloadURL().then(url => {
        return fetch(url)
        .then(response => response.text())
        .then(content => {
          zip.file(itemRef.name, content);
        });
      });
    });
  }).catch((error) => {
    console.log(error);
    return false;
  });
}

export const fetchFilesMetadata = (itemRef, hidden) => {
  startCounter();
  return itemRef.getMetadata().then((metadata) => {
    if (!hidden) styledLog(`${Log.SUCCESS}Metadata fetched for ${metadata.name}${endCounter()}`);
    return {
      key: itemRef.location.path,
      metadata: {
        _isFile: true,
        name: metadata.name,
        size: metadata.size,
        timeCreated: metadata.timeCreated,
        updated: metadata.updated,
        fullPath: metadata.fullPath,
        contentType: metadata.contentType,
      },
    };
  }).catch((error) => {
    console.log(error);
    return false;
  });
};
