// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  getFirestore,
  query,
  where,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBZII48XAyWMpYOjXA9oHf36-bcNQVI3eA",
  authDomain: "countries-leson.firebaseapp.com",
  projectId: "countries-leson",
  storageBucket: "countries-leson.appspot.com",
  messagingSenderId: "109796717670",
  appId: "1:109796717670:web:5a3be71b294edae55fa9a7",
  measurementId: "G-BEGZSVHNQ3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const loginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successfully");
  } catch (err) {
    console.log(err);
    toast.error("Wrong email/password, please check again");
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      email,
      authProvider: "local",
    });
    toast.success("Register successfully with your new account");
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
};

const logout = () => {
  signOut(auth);
  toast.success("Log out successfully");
};

export {
  auth,
  db,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};
