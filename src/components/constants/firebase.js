import firebase from 'firebase/app';
import 'firebase/storage';
import { styledLog, startCounter, endCounter } from '../Utilities';
import * as Log from './log';

const firebaseConfig = {
  apiKey: 'AIzaSyAKhdToFzJKcW45iy4Yd3qS4pvELmbEKhM',
  authDomain: 'spotslot-cloud.firebaseapp.com',
  databaseURL: 'https://spotslot-cloud.firebaseio.com',
  projectId: 'spotslot-cloud',
  storageBucket: 'spotslot-cloud.appspot.com',
  messagingSenderId: '911180862163',
  appId: '1:911180862163:web:5ef4f2d09d58cc2e427a26',
};
export const firebaseApp = firebase.initializeApp(firebaseConfig, 'Splot');
export const storageRef = firebase.storage(firebaseApp).ref();

export const getAllFiles = (startPath) => {
  const listRef = storageRef.child(startPath);
  let result = [];

  return listRef.listAll().then((res) => {
    res.prefixes.forEach((folderRef) => {
      getAllFiles(folderRef.location.path);
    });
    res.items.forEach((itemRef) => {
      result.push(synchronousFilesMetadata(itemRef, true));
    });
    return result;
  }).catch((error) => {
    console.log(error);
    return false;
  });
}

const synchronousFilesMetadata = async function(itemRef, hidden) {
  const result = await fetchFilesMetadata(itemRef, hidden);
  return result;
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
}
