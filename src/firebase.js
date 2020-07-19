import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDgx_LLnq4pYtyA1smn0Tw5aIUP3KZc-X4",
    authDomain: "fb-messenger-clone-60282.firebaseapp.com",
    databaseURL: "https://fb-messenger-clone-60282.firebaseio.com",
    projectId: "fb-messenger-clone-60282",
    storageBucket: "fb-messenger-clone-60282.appspot.com",
    messagingSenderId: "1053203741968",
    appId: "1:1053203741968:web:16d3122b92554564c3b995",
    measurementId: "G-5EJ6R17KRX",
});

const db = firebaseApp.firestore();
export default db;
