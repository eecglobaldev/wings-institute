// firebaseConfig.ts - SSR-Safe Firebase Configuration
// Firebase must only initialize on the client side

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCHr4OXY_EcKxApVH9nz3kbUQQhQCPGZfY",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "usa-visa-prep-c72f7.firebaseapp.com",
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://usa-visa-prep-c72f7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "usa-visa-prep-c72f7",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "usa-visa-prep-c72f7.firebasestorage.app",
  messagingSenderId: "777839011356",
  appId: "1:777839011356:web:125ba58cd0a86da0e561d9"
};

// Lazy initialization - only on client side
let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

if (typeof window !== 'undefined') {
  // Only initialize on client side
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  db = getFirestore(app);
  auth = getAuth(app);
}

export { app, db, auth };

