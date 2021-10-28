import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuaFG5cpNBgq32XrzJ9m8wx4bwgij1Q-E",
  authDomain: "youmayneedthis-c4926.firebaseapp.com",
  projectId: "youmayneedthis-c4926",
  storageBucket: "youmayneedthis-c4926.appspot.com",
  messagingSenderId: "350229409641",
  appId: "1:350229409641:web:95c5d096137534e9e357f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);