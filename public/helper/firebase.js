import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDTUuvkjg6pJrxpW-7L7uOTH_fHqY9Id08",
  authDomain: "oneup1-402f5.firebaseapp.com",
  projectId: "oneup1-402f5",
  storageBucket: "oneup1-402f5.firebasestorage.app",
  messagingSenderId: "636618535187",
  appId: "1:636618535187:web:0ac9a5eebea78f561d2ae6",
  measurementId: "G-NT2JZ2TZCS",
};

export const app = initializeApp(firebaseConfig);
export let messaging = typeof window !== "undefined" ? getMessaging(app) : null;

if (process.browser) {
  // because I'm getting error "Navigator not defined"
  messaging = getMessaging(app);
}

export const VAPID_KEY = process.env.VAPID_KEY;
