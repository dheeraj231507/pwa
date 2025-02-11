"use client";

import React, { useState } from "react";

const CreateTopic = () => {
    const [topic, setTopic] = useState({
        name: "",
        videoUrl: "",
        description: "",
    });

    const handleTopicChange = (e) => {
        const { name, value } = e.target;
        setTopic({
            ...topic,
            [name]: value,
        });
    };

    const submitTopic = () => {
        console.log(topic);
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center">Create Topic</h1>
            <div className="mb-3">
                <label htmlFor="topicName">Topic Name</label>
                <input type="text" id="topicName" name="name" className="form-control" placeholder="Topic Name" value={topic.name} onChange={handleTopicChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="videoUrl">Video URL</label>
                <input type="text" id="videoUrl" name="videoUrl" className="form-control" placeholder="Video URL" value={topic.videoUrl} onChange={handleTopicChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" className="form-control" placeholder="Description" value={topic.description} onChange={handleTopicChange} />
            </div>
            <button className="btn btn-success d-block mt-3" onClick={submitTopic}>
                Submit Topic
            </button>
        </div>
    );
};

export default CreateTopic;
