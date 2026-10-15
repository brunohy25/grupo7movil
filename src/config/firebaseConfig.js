import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(Boolean);

let auth = null;
let db = null;
if (isFirebaseConfigured) {
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  try {
    if (typeof getReactNativePersistence === 'function') {
      auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
      });
    } else {
      auth = getAuth(app);
    }
  } catch (e) {
    auth = getAuth(app);
  }
  db = getFirestore(app);
}

let proximaAlertaAuth = null;

export const setProximaAlertaAuth = (alerta) => {
  proximaAlertaAuth = alerta;
};

export const getProximaAlertaAuth = () => {
  const temp = proximaAlertaAuth;
  proximaAlertaAuth = null;
  return temp;
};

export { auth, db };
