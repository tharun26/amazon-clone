// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { firebase, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCnwns1Q98g_71ExPveWkzCRq4-YwKJL00",
  authDomain: "clone-98178.firebaseapp.com",
  projectId: "clone-98178",
  storageBucket: "clone-98178.appspot.com",
  messagingSenderId: "1004516052601",
  appId: "1:1004516052601:web:5a98ab6b36f55dd4c54ea8",
  measurementId: "G-YVVQK6VWXP",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export { db, auth };
