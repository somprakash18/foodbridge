import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA1B2C3D4E5F6G7H8I9J0-FoodBridgeDemo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "foodbridge-app-186ac.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "foodbridge-app-186ac",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "foodbridge-app-186ac.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "234945395855",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:234945395855:web:foodbridgeapp186ac"
};

// Initialize Firebase cleanly without duplicating apps
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
