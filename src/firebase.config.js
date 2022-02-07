import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBEi52ANCeWdVOJeDKjDZWHOfjwG-V72gE",
  authDomain: "react-fire-test-b2bfd.firebaseapp.com",
  projectId: "react-fire-test-b2bfd",
  storageBucket: "react-fire-test-b2bfd.appspot.com",
  messagingSenderId: "290694487003",
  appId: "1:290694487003:web:257a70f3734713bd4965fe",
  measurementId: "G-21WB5LY286",
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);
const auth = getAuth();
const store = getFirestore(fire);

export {
  fire,
  auth,
  store,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
};
