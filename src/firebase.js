import firebase from "firebase";

const firebaseApp = firebase.initializeApp({

  apiKey: "AIzaSyDPfy2I0oypzHueU387Je4DMHadDYel-E4",
  authDomain: "messenger-chat-21205.firebaseapp.com",
  projectId: "messenger-chat-21205",
  storageBucket: "messenger-chat-21205.appspot.com",
  messagingSenderId: "1084456144843",
  appId: "1:1084456144843:web:db500dab0a42f050b8f04e"

});

const db = firebaseApp.firestore();


export default db;