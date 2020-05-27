import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAKhdToFzJKcW45iy4Yd3qS4pvELmbEKhM',
  authDomain: 'spotslot-cloud.firebaseapp.com',
  databaseURL: 'https://spotslot-cloud.firebaseio.com',
  projectId: 'spotslot-cloud',
  storageBucket: 'spotslot-cloud.appspot.com',
  messagingSenderId: '911180862163',
  appId: '1:911180862163:web:5ef4f2d09d58cc2e427a26',
};
const firebaseApp = firebase.initializeApp(firebaseConfig, 'Splot');
export const storageRef = firebase.storage(firebaseApp).ref();
