import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDd9bZT7EwG9Hmg4eEQMLEOdEWbYK3momo",
  authDomain: "crwn-clothing-db-806bd.firebaseapp.com",
  projectId: "crwn-clothing-db-806bd",
  storageBucket: "crwn-clothing-db-806bd.appspot.com",
  messagingSenderId: "280669511631",
  appId: "1:280669511631:web:85e2e7ed14084c7a9afcba",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
