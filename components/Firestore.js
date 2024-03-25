import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Firestore config */
const firestoreConfig = JSON.parse(process.env.EXPO_PUBLIC_FIRESTORE);
const app = initializeApp(firestoreConfig);

export const firestoreDB = getFirestore(app);

/* Initialize Firebase Authentication */
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };

