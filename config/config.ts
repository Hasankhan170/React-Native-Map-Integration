import { initializeApp } from "firebase/app";
import { initializeAuth } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2BHtT2PghB6C2o0KY_DOwvp9ic0lR_jA",
  authDomain: "portfolio-by-hasan.firebaseapp.com",
  projectId: "portfolio-by-hasan",
  storageBucket: "portfolio-by-hasan.appspot.com",
  messagingSenderId: "658571338920",
  appId: "1:658571338920:web:182ccdb7f50a281003ce9d",
  measurementId: "G-QFNBTS5TWJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);

export { auth };
