"use client";

import FloatingActionButton from "../components/FloatingActionButton";
import Search from "../components/Search";
import Courses from "../components/Courses";
import Exams from "../components/Exams";
import CreatorHeader from "../components/CreatorHeader";
import { useEffect, useState } from "react";

const Creator = () => {
    const [theme, setTheme] = useState("light");

    const floatingLinks = [
        { text: "Course", link: "/creator/create/course" },
        // { text: "Create Chapter", link: "/creator/create/chapter" },
        // { text: "Create Topic", link: "/creator/create/topic" },
        // { text: "Create Test", link: "/creator/create/test" },
        // { text: "Create Question", link: "/creator/create/question" },
        { text: "Exam", link: "/creator/create/exam" },
    ];

    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <>
            <CreatorHeader theme={theme} setTheme={setTheme} />
            <Search theme={theme} />
            <Courses theme={theme} user="creator" />
            <FloatingActionButton links={floatingLinks} theme={theme === "light" ? "dark" : "light"} />
            <Exams theme={theme} user="creator" />
        </>
    );
};

export default Creator;
