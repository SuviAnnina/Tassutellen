import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/* Firestore config */
const firestoreConfig = JSON.parse(process.env.EXPO_PUBLIC_FIRESTORE);
const app = initializeApp(firestoreConfig);

const firestoreDB = getFirestore(app);
export default firestoreDB;