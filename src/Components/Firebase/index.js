import firebase from "firebase/compat/app";
import "firebase/compat/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDoUtpXJx_Zvv818czcPr7aE4c0Z96W1M",
  authDomain: "mpproject-335920.firebaseapp.com",
  databaseURL: "gs://mpproject-335920.appspot.com",
  projectId: "mpproject-335920",
  storageBucket: "mpproject-335920.appspot.com",
  messagingSenderId: "73426821317",
  appId: "1:73426821317:web:8a55db802cbee296b610ac",
  measurementId: "G-SY977THLE7",
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
