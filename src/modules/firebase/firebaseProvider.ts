import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
  });
}

export const auth = firebase.app().auth();
export const persistenceNone = firebase.auth.Auth.Persistence.NONE;
export const persistenceSession = firebase.auth.Auth.Persistence.SESSION;
export const authProviderGoogle = new firebase.auth.GoogleAuthProvider();
export const authProviderFacebook = new firebase.auth.FacebookAuthProvider();

export const firestore = firebase.app().firestore();

export type firebaseError = firebase.FirebaseError;
