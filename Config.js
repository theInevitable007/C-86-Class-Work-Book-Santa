import firebase from 'firebase';
require('@firebase/firestore');
var firebaseConfig = {
    apiKey: "AIzaSyBKI4GducP1rGtYP7mbJjTwc7hgyD5OYt4",
    authDomain: "book-santa-7a0c4.firebaseapp.com",
    projectId: "book-santa-7a0c4",
    storageBucket: "book-santa-7a0c4.appspot.com",
    messagingSenderId: "1084344283043",
    appId: "1:1084344283043:web:b4296b9a58c17ed2193416"
  };
  // Initialize Firebase 
  if(!firebase.apps.length){ 
    firebase.initializeApp(firebaseConfig);
   }


  export default firebase.firestore();