import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyA1B2C3D4E5F6G7H8I9J0-FoodBridgeDemo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "foodbridge-app.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "foodbridge-app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "foodbridge-app.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1098457291834",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1098457291834:web:abc123def456"
};

// Initialize Firebase cleanly without duplicating apps
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider };
