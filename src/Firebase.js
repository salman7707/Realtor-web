// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBE94J-oJI7TK8_LFK1c-Ubkx8ycQUh8ZE",
  authDomain: "realtor-clone-project-95d3e.firebaseapp.com",
  projectId: "realtor-clone-project-95d3e",
  storageBucket: "realtor-clone-project-95d3e.appspot.com",
  messagingSenderId: "739438660747",
  appId: "1:739438660747:web:d322de22fe4da7bf32d88e"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()