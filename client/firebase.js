import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC9ilG5wYZ5o07hfA3hPmTmFhDhL8lk1gE",
    authDomain: "chat-app-13f96.firebaseapp.com",
    projectId: "chat-app-13f96",
    storageBucket: "chat-app-13f96.appspot.com",
    messagingSenderId: "493499304618",
    appId: "1:493499304618:web:7c327472a907bc54689ed3"
  };

  const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

  const db = app.firestore();
  const auth = app.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };