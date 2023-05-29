import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB1SC64FQ-pJ0TepJhJDJqr24vyGHqj01U",
  authDomain: "sample-project-3d044.firebaseapp.com",
  projectId: "sample-project-3d044",
  storageBucket: "sample-project-3d044.appspot.com",
  messagingSenderId: "713160470419",
  appId: "1:713160470419:web:a8f710494d95ad94444266"
};


const app = initializeApp(firebaseConfig);



export  const db = getFirestore(app)