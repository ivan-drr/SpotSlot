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

export const handleZipAllFiles = async (ref) => {
  const zip = new JSZip();
  await zipAllFiles(ref, zip);
  zip.generateAsync({type:"blob"})
  .then((content) => {
    saveAs(content, fileName(ref) + '.zip');
  });
}

const zipAllFiles = async (ref, zip) => {
  const listRef = storageRef.child(ref);

  await listRef.listAll().then(async (res) => {
    await Promise.all(res.prefixes.map(async (folderRef) => {
      await zipAllFiles(folderRef.location.path, zip.folder(fileName(folderRef.location.path)));
    }));
    await Promise.all(res.items.map(async (itemRef) => {
      if (itemRef.name === '.folder') return;
      await itemRef.getDownloadURL().then(async url => {
        await fetch(url)
        .then(async response => await response.blob())
        .then(async content => {
          await zip.file(itemRef.name, content);
        });
      });
    }));
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
        contentType: metadata.contentType,
      },
    };
  }).catch((error) => {
    console.log(error);
    return false;
  });
};
