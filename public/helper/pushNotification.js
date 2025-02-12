import { getToken } from "firebase/messaging";
import { VAPID_KEY, messaging } from "./firebase";
import { databases } from "../../app/appwrite";
import { ID } from "appwrite";

export const requestNotificationPermission = async () => {
  if ("Notification" in window) {
    const storedToken = localStorage.getItem("fcmToken");
    if (!storedToken) {
      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        console.log("Notification permission granted.");

        const token = await getToken(messaging, { vapidKey: VAPID_KEY });
        console.log("+++ token", token);

        // Save the token to localStorage
        localStorage.setItem("fcmToken", token);

        await databases.createDocument(
          process.env.NEXT_PUBLIC_DATABASE_ID,
          process.env.NEXT_PUBLIC_COLLECTION_ID,
          ID.unique(),
          { token: token }
        );
        console.log("Token saved in database.");
        return true;
      } else if (permission === "denied") {
        console.warn("Notification permission denied.");
        return false;
      }
    } else {
      // Check if the device is Android
      const isAndroid = /Android/i.test(navigator.userAgent);
      if (isAndroid) {
        console.error("Notifications are not supported in this browser.");
      }
      return false;
    }
  } else {
    console.error("Notifications are not supported in this browser.");
    return false;
  }
};
