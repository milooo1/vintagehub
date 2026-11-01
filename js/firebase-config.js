// ===== FIREBASE CONFIG =====
// Firebase console → Project settings → Your apps → Web app → copy the config here
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDx0-c0bjqG0CMUeOr-hvV5GfxhhVBE5pk",
  authDomain: "vintagehub-30545.firebaseapp.com",
  projectId: "vintagehub-30545",
  storageBucket: "vintagehub-30545.firebasestorage.app",
  messagingSenderId: "198014695530",
  appId: "1:198014695530:web:4572266bbe536640dd3213",
  measurementId: "G-K5BLQRYPPL"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
