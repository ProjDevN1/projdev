import { initializeApp } from 'firebase/app';

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration info
const firebaseConfig = {
}
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };