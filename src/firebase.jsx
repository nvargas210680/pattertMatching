import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZ_esHTs0FJorzuFDUdJ_ZkLjYJb-Yzfc",
  authDomain: "striveopp2.firebaseapp.com",
  databaseURL: "https://striveopp2-default-rtdb.firebaseio.com",
  projectId: "striveopp2",
  storageBucket: "striveopp2.appspot.com",
  messagingSenderId: "553738272972",
  appId: "1:553738272972:web:e914ee9ff8af5ece0b0269",
  measurementId: "G-0YF2CL6ZTJ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);