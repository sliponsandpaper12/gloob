import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwhvnP6vvIqFeBd-RvPdkIeXMWeQNYeso",
  authDomain: "wad-database.firebaseapp.com",
  projectId: "wad-database",
  storageBucket: "wad-database.appspot.com",
  messagingSenderId: "574790693150",
  appId: "1:574790693150:web:ff2e3b12b1e1d565fa590f",
  measurementId: "G-2KJ46VFL25"
};


const firebaseApp = initializeApp(firebaseConfig);
const projectFirestore = getFirestore(firebaseApp);

export default projectFirestore;

