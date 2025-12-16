import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiUfww9oY-hucBX-1l0hkzl5hlfgbW_tM",
  authDomain: "fits-ce52f.firebaseapp.com",
  projectId: "fits-ce52f",
  storageBucket: "fits-ce52f.firebasestorage.app",
  messagingSenderId: "333898598446",
  appId: "1:333898598446:web:a4791c4f9891e0d440f7bf",
  measurementId: "G-9QLFE145SB"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);