// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkoGBLAY_UqN-sil3prtqyBVmhFtGTeBQ",
  authDomain: "shoptown-b10c7.firebaseapp.com",
  databaseURL: "https://shoptown-b10c7-default-rtdb.firebaseio.com",
  projectId: "shoptown-b10c7",
  storageBucket: "shoptown-b10c7.appspot.com",
  messagingSenderId: "498257638901",
  appId: "1:498257638901:web:87fc4e2148cb65788fdcbc",
};

// Initialize Firebase
const fireDb = initializeApp(firebaseConfig);
export { fireDb };
