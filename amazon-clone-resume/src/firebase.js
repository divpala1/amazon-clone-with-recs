import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import confidential from './confidential.json';

const firebaseConfig = {
  apiKey: confidential.apiKey,
  authDomain: confidential.authDomain,
  projectId: confidential.projectId,
  storageBucket: confidential.storageBucket,
  messagingSenderId: confidential.messagingSenderId,
  appId: confidential.appId,
  measurementId: confidential.measurementId
};

// Initializing the firebase app with firebase configuration stated above.
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Initializing the database.
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };