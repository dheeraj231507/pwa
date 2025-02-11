// db.js
const DB_NAME = "notifications_db";
const STORE_NAME = "notifications";

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function addNotification(notification) {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);

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

export async function getNotifications() {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function deleteNotification(id) {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  store.delete(id);
}
