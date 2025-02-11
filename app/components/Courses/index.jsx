import React, { useRef, useState } from "react";
import Image from "next/image";
import tempImage from "../../../public/images/Blue and White Bright Design Tutorial YouTube Thumbnail .png";
import tempCourse from "../../../public/images/temp-course.png";
import tempCourse2 from "../../../public/images/temp-course2.png";
import Wrapper from "./style";
import { GoPencil, GoTrash } from "react-icons/go";

const Courses = ({ theme = "light", user = "user" }) => {
    const courses = [
        { thumbnail: tempCourse, title: "Build and deploy your own website  ", description: "This is course 1", creator: "Himanshu Chandnani", overallTime: "45 Minutes", difficulty: "intermediate", cost: "Free course", link: "/course/1" },
        { thumbnail: tempCourse2, title: "Web Development", description: "This is course 2", creator: "Himanshu Chandnani", overallTime: "45 Minutes", difficulty: "intermediate", cost: "Free course", link: "/course/2" },
        { thumbnail: tempImage, title: "Course 3", description: "This is course 3", creator: "Himanshu Chandnani", overallTime: "45 Minutes", difficulty: "intermediate", cost: "Free course", link: "/course/3" },
        { thumbnail: tempImage, title: "Course 4", description: "This is course 4", creator: "Himanshu Chandnani", overallTime: "45 Minutes", difficulty: "intermediate", cost: "Free course", link: "/course/4" },
        { thumbnail: tempImage, title: "Course 5", description: "This is course 5", creator: "Himanshu Chandnani", overallTime: "45 Minutes", difficulty: "intermediate", cost: "Free course", link: "/course/5" },
    ];

    const scrollRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const handleMouseDown = (e) => {
        isDragging.current = true;
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft.current = scrollRef.current.scrollLeft;
        scrollRef.current.style.cursor = "grabbing";
    };

    const handleMouseLeave = () => {
        isDragging.current = false;
        scrollRef.current.style.cursor = "grab";
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        scrollRef.current.style.cursor = "grab";
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX.current) * 2;
        scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };

    return (
        <Wrapper theme={theme}>
            <div className="container py-4">
                <div className="title mb-3">
                    <h2>Courses</h2>
                    <a href="/allcourses">All courses</a>
                </div>
                <div className="card-container">
                    <div className="card-holder" ref={scrollRef} onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
                        {user == "user" &&
                            courses.map((course, index) => (
                                <a href={course.link} key={index} className="course-card" draggable={false}>
                                    <Image src={course.thumbnail} alt={course.title} height="500" width="500" draggable={false} />
                                    <div className="text px-3 mt-2">
                                        <p className="title">{course.title}</p>
                                        <p className="creator">By {course.creator}</p>
                                        <p className="time">{course.overallTime}</p>
                                        <div className="d-flex justify-content-between">
                                            <p className="dificulty">{course.difficulty}</p>
                                            <p className="cost">{course.cost}</p>
                                        </div>
                                    </div>
                                </a>
                            ))}
                        {user == "creator" &&
                            courses.map((course, index) => (
                                <div key={index} className="course-card" draggable={false}>
                                    <Image src={course.thumbnail} alt={course.title} height="500" width="500" draggable={false} />
                                    <div className="text px-3 mt-2 d-flex justify-content-between align-items-center">
                                        <p className="title">{course.title}</p>
                                        <div>
                                            <a className="me-2" href={`/course/${index}/edit`} draggable={false}>
                                                <GoPencil color={theme === "dark" ? "#fff" : "#575a5e"} size={18} strokeWidth={0.5} />
                                            </a>
                                            <a href={`/course/${index}/delete`} draggable={false}>
                                                <GoTrash color={theme === "dark" ? "#fff" : "#575a5e"} size={18} strokeWidth={0.5} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Courses;
