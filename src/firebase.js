import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCz96JUwLxg6sBIvtELTNcNyo1wRZgMZao",
  authDomain: "rol-chats.firebaseapp.com",
  projectId: "rol-chats",
  storageBucket: "rol-chats.appspot.com",
  messagingSenderId: "731014435716",
  appId: "1:731014435716:web:c61e988e0b0331af6983d1",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);


export { auth, firestore, doc, getDoc, setDoc, deleteDoc };
