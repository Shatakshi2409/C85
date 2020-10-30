import firebase from 'firebase';
require('@firebase/firestore')

 var firebaseConfig = {
    apiKey: "AIzaSyDPfr_XijklcWn9Hs74nz3JC-Rx-ePQuWk",
    authDomain: "booksanta-19a24.firebaseapp.com",
    databaseURL: "https://booksanta-19a24.firebaseio.com",
    projectId: "booksanta-19a24",
    storageBucket: "booksanta-19a24.appspot.com",
    messagingSenderId: "745536454274",
    appId: "1:745536454274:web:d26e2bd61869f0f0a47e9b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore()