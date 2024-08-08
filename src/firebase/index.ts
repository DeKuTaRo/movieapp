import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBE06R_jRmrUzy-D00BZZG911ZhPlvV1FM",
  authDomain: "movie-app-15088.firebaseapp.com",
  projectId: "movie-app-15088",
  storageBucket: "movie-app-15088.appspot.com",
  messagingSenderId: "266989218790",
  appId: "1:266989218790:web:2ddab01028f12729f70427",
  measurementId: "G-N0MTN0R3MD",
};

const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const fbProvider = new FacebookAuthProvider();
export const db = getFirestore(app);
export const auth = getAuth(app);