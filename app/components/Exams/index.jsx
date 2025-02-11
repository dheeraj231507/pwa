import { useRef } from "react";
import Wrapper from "./style";
import { GoPencil } from "react-icons/go";
import { GoTrash } from "react-icons/go";
import Image from "next/image";
import examIcon from "../../../public/images/exam-icon.png";
import examIcon2 from "../../../public/images/exam-icon2.png";

const Exams = ({ theme = "light", user = "user" }) => {
    const exams = [
        { title: "Exam 1", description: "This is exam 1", creator: "Himanshu", availableTime: "3 hours", time: "Created one day ago", endDate: "2-02-2025", link: "/exam", color: "#118AB2" },
        { title: "Exam 2", description: "This is exam 2", creator: "Kushal", availableTime: "2 hours", time: "Created one day ago", endDate: "2-02-2025", link: "/exam", color: "#06D6A0" },
        { title: "Exam 3", description: "This is exam 3", creator: "Priyanka", availableTime: "1.5 hours", time: "Created two days ago", endDate: "3-02-2025", link: "/exam", color: "#FFD166" },
        { title: "Exam 4", description: "This is exam 4", creator: "Shubham", availableTime: "3 hours", time: "Created two days ago", endDate: "5-02-2025", link: "/exam", color: "#F07167" },
        { title: "Exam 5", description: "This is exam 5", creator: "Chirag", availableTime: "2 hours", time: "Created three days ago", endDate: "8-02-2025", link: "/exam", color: "#E9D8A6" },
    ];

    return (
        <Wrapper theme={theme}>
            <div className="container py-3">
                <div className="title mb-3">
                    <h2>Exams</h2>
                    <a href="/allexams">All exams</a>
                </div>
                <div className="card-container">
                    <div className="card-holder row">
                        {user === "creator" &&
                            exams.map((exam, index) => (
                                <div className="col-lg-4 col-md-6 px-1" key={index}>
                                    <div className="exam-card" style={{ backgroundColor: exam.color }}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Image src={examIcon} width={50} height={"auto"} alt="exam-icon" />
                                            <div className="ms-2">
                                                <p className="mt-2 title">{exam.title}</p>
                                                <p className="time">{exam.time}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <a className="me-2" href={`/exam/${index}/edit`}>
                                                <GoPencil color={theme === "dark" ? "#fff" : "#575a5e"} size={18} strokeWidth={0.5} />
                                            </a>
                                            <a href={`/exam/${index}/delete`}>
                                                <GoTrash color={theme === "dark" ? "#fff" : "#575a5e"} size={18} strokeWidth={0.5} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        {user === "user" &&
                            exams.map((exam, index) => (
                                <div className="col-lg-4 col-md-6 px-1" key={index}>
                                    <a href={exam.link} className="exam-card" style={{ backgroundColor: exam.color }}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Image src={examIcon2} width={50} height={"auto"} alt="exam-icon" />
                                            <div className="ms-2">
                                                <p className="mt-2 title">{exam.title}</p>
                                                <p className="creator">Created by {exam.creator}</p>
                                                <p className="time">{exam.availableTime}</p>
                                            </div>
                                        </div>
                                        <div className="last-date">Last date : {exam.endDate}</div>
                                    </a>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Exams;
