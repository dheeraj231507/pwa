"use client";

import React, { useState } from "react";
import Wrapper from "./style";
import Header from "../../../components/Header";

const CreateChapter = () => {
    const [chapter, setChapter] = useState({
        name: "",
        topics: [],
    });

    const existingTopics = [
        { id: "1", name: "Introduction to React", videoUrl: "", description: "Basic concepts of React." },
        { id: "2", name: "JavaScript Fundamentals", videoUrl: "", description: "Core JavaScript principles." },
        { id: "3", name: "State Management", videoUrl: "", description: "Understanding state in React." },
        { id: "4", name: "React Hooks", videoUrl: "", description: "Using hooks effectively." },
        { id: "5", name: "Component Lifecycle", videoUrl: "", description: "React component lifecycle explained." },
    ];

    const handleChapterChange = (e) => {
        const { name, value } = e.target;
        setChapter({
            ...chapter,
            [name]: value,
        });
    };

    const addTopic = () => {
        setChapter({
            ...chapter,
            topics: [
                ...chapter.topics,
                {
                    id: Date.now().toString(),
                    name: "",
                    videoUrl: "",
                    description: "",
                },
            ],
        });
    };

    const removeTopic = (topicIndex) => {
        const updatedTopics = chapter.topics.filter((_, index) => index !== topicIndex);
        setChapter({
            ...chapter,
            topics: updatedTopics,
        });
    };

    const handleTopicChange = (topicIndex, e) => {
        const { name, value } = e.target;
        const updatedTopics = [...chapter.topics];
        updatedTopics[topicIndex][name] = value;
        setChapter({
            ...chapter,
            topics: updatedTopics,
        });
    };

    const toggleExistingTopic = (topic) => {
        const alreadySelected = chapter.topics.find((t) => t.id === topic.id);
        if (alreadySelected) {
            setChapter({
                ...chapter,
                topics: chapter.topics.filter((t) => t.id !== topic.id),
            });
        } else {
            setChapter({
                ...chapter,
                topics: [...chapter.topics, topic],
            });
        }
    };

    const submitChapter = () => {
        console.log(chapter);
    };

    const [theme, setTheme] = useState("light");

    return (
        <Wrapper theme={theme}>
            <Header showLogo={true} showSearch={false} showProfile={true} showNotification={true} theme={theme} setTheme={setTheme} />
            <div className="container mt-4">
                <h1 className="mb-3">Create Chapter</h1>
                <p>Structure your course by organizing it into clear sections, lectures, and hands-on activities such as quizzes, coding exercises, and assignments. Use your course outline as a foundation to ensure a logical flow, and label each section and lecture clearly for easy navigation.</p>
                <div className="mb-3">
                    <label htmlFor="chapterName">Chapter Name</label>
                    <input type="text" id="chapterName" name="name" className="form-control" placeholder="Chapter Name" value={chapter.name} onChange={handleChapterChange} />
                </div>

                <h2>Existing Topics</h2>
                <div className="row mb-3">
                    {existingTopics.map((topic) => (
                        <div key={topic.id} className="col-lg-4 col-md-6 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5>{topic.name}</h5>
                                    <p>{topic.description}</p>
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id={`existingTopic-${topic.id}`} checked={chapter.topics.some((t) => t.id === topic.id)} onChange={() => toggleExistingTopic(topic)} />
                                        <label className="form-check-label" htmlFor={`existingTopic-${topic.id}`}>
                                            Add to Chapter
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <h2>Topics</h2>
                <div className="row">
                    {chapter.topics.map((topic, topicIndex) => (
                        <div key={topic.id} className="col-lg-4 col-md-6 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <label htmlFor={`topicName-${topicIndex}`}>Topic Name</label>
                                    <input type="text" id={`topicName-${topicIndex}`} name="name" className="form-control mb-2" placeholder="Topic Name" value={topic.name} onChange={(e) => handleTopicChange(topicIndex, e)} />
                                    <label htmlFor={`videoUrl-${topicIndex}`}>Video URL</label>
                                    <input type="text" id={`videoUrl-${topicIndex}`} name="videoUrl" className="form-control mb-2" placeholder="Video URL" value={topic.videoUrl} onChange={(e) => handleTopicChange(topicIndex, e)} />
                                    <label htmlFor={`description-${topicIndex}`}>Description</label>
                                    <textarea id={`description-${topicIndex}`} name="description" className="form-control mb-2" placeholder="Description" value={topic.description} onChange={(e) => handleTopicChange(topicIndex, e)} />
                                    <button className="btn btn-danger" onClick={() => removeTopic(topicIndex)}>
                                        Remove Topic
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="btn btn-secondary me-2" onClick={addTopic}>
                    Add Topic
                </button>
                <button className="btn btn-success d-block mt-3" onClick={submitChapter}>
                    Submit Chapter
                </button>
            </div>
        </Wrapper>
    );
};

export default CreateChapter;
