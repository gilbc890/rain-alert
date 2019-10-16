import firebase from 'firebase';
import {firebaseConfig } from '../config';
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  export const database = firebase.database();


