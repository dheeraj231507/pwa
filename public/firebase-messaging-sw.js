import { messaging } from "./helper/firebase";

importScripts(
  "https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js"
);

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("notifications_db", 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("notifications")) {
        db.createObjectStore("notifications", {
          keyPath: "id",
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function addNotification(notification) {
  const db = await openDB();
  const transaction = db.transaction("notifications", "readwrite");
  const store = transaction.objectStore("notifications");

  // Get all keys to find the smallest available key
  const keys = await new Promise((resolve, reject) => {
    const request = store.getAllKeys();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  // Find the smallest available key
  let newKey = 1;
  while (keys.includes(newKey)) {
    newKey++;
  }

  // Add the notification with the new key
  notification.id = newKey;

  store.add(notification);
}

firebase.initializeApp({
  apiKey: "AIzaSyD1eR66a4wzSB-4s3EFs5w7dgpv8Ryxarw",
  authDomain: "oneup-f71f5.firebaseapp.com",
  projectId: "oneup-f71f5",
  storageBucket: "oneup-f71f5.firebasestorage.app",
  messagingSenderId: "560676854221",
  appId: "1:560676854221:web:c13786026853a1e2660c84",
  measurementId: "G-E8Z8TLLNYG",
});

const isSupported = firebase.messaging.isSupported();
if (isSupported) {
  const messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
    };

    console.log("background");

    const notification = {
      title: notificationTitle,
      body: notificationOptions.body,
      timestamp: new Date().getTime(),
    };

    addNotification(notification);
  });

  messaging.onMessage((payload) => {
    const { title, body } = payload.notification;
    no = {
      title: title,
      body: body,
    };

    const notification = {
      title: title,
      body: body,
      timestamp: new Date().getTime(),
    };
    addNotification(notification);

    // self.registration.showNotification(title, {
    //   body: body,
    // });

    self.skipWaiting().then(() => {
      self.clients.matchAll().then((clinets) => {
        clinets.forEach((client) => {
          client.postMessage({
            type: "NEW_NOTIFICATION",
            no,
          });
        });
      });
    });
  });
}
