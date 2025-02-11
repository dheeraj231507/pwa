"use client";

import Header from "./components/Header";
import { useEffect, useState } from "react";
import Cover from "./components/Cover";
import Categories from "./components/Categories";
import Courses from "./components/Courses";

const isSafari = () => {
    if (typeof window !== "undefined" && window.navigator) {
        return /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
    }
    return false;
};

const Home = () => {
    const [theme, setTheme] = useState("light");
    const [isSafariBrowser, setIsSafariBrowser] = useState(false);

    const isSafari = () => {
        if (typeof window !== "undefined" && window.navigator) {
            return /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);
        }
        return false;
    };

    //notification coming and store the  indexdb
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data.type === "NEW_NOTIFICATION") {
                fetchNotifications();
            }
        };

        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.addEventListener("message", handleMessage);
        }

        return () => {
            if ("serviceWorker" in navigator) {
                navigator.serviceWorker.removeEventListener("message", handleMessage);
            }
        };
    }, []);

    return (
        <>
            <Header showLogo={true} showSearch={false} showProfile={true} showNotification={true} theme={theme} setTheme={setTheme} />

            <Cover theme={theme} />
            <Categories theme={theme} />
            <Courses theme={theme} />
        </>
    );
};

export default Home;
