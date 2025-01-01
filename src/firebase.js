// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmzZ28AeSxVHo9NTeANiM-l-DRAQoc45s",
  authDomain: "ereading-e5931.firebaseapp.com",
  projectId: "ereading-e5931",
  storageBucket: "ereading-e5931.firebasestorage.app",
  messagingSenderId: "172534545379",
  appId: "1:172534545379:web:2a692d37fd9402d902bed6",
  measurementId: "G-0QJCV41S6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore and Storage instances
const db = getFirestore(app);
const storage = getStorage(app);

// Export Firestore functions and instances
export { db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where, storage };
