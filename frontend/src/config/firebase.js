import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDK1qugHaPEiKbcIK7ciAdr7zqbELwHvyU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "foodbridge-app-186ac.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "foodbridge-app-186ac",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "foodbridge-app-186ac.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "234945395855",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:234945395855:web:2e18d45918e2bdeda104fa"
};

// Initialize Firebase cleanly without duplicating apps
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
