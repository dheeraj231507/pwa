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
  apiKey: "AIzaSyDTUuvkjg6pJrxpW-7L7uOTH_fHqY9Id08",
  authDomain: "oneup1-402f5.firebaseapp.com",
  projectId: "oneup1-402f5",
  storageBucket: "oneup1-402f5.firebasestorage.app",
  messagingSenderId: "636618535187",
  appId: "1:636618535187:web:0ac9a5eebea78f561d2ae6",
  measurementId: "G-NT2JZ2TZCS",
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

    self.skipWaiting().then(() => {
      self.clients.matchAll().then((clinets) => {
        clinets.forEach((client) => {
          client.postMessage({
            type: "NEW_NOTIFICATION",
            notification,
          });
        });
      });
    });
  });
}
