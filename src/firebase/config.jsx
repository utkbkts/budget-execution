import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey:import.meta.env.VITE_API_URL,
  authDomain: "muhasebe-ea6b2.firebaseapp.com",
  projectId: "muhasebe-ea6b2",
  storageBucket: "muhasebe-ea6b2.appspot.com",
  messagingSenderId: "789751230737",
  appId: "1:789751230737:web:fcda5dda49b65d7bba5cb0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
