// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0tEPgIg5pl_YEYhw5EUDt3TTzDHTjwXE",
  authDomain: "learning-english-website.firebaseapp.com",
  projectId: "learning-english-website",
  storageBucket: "learning-english-website.appspot.com",
  messagingSenderId: "244122898827",
  appId: "1:244122898827:web:13990b5af1ac7e34f81f8e"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(firebase);

export default firebaseStorage;