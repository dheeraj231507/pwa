"use client";

import React, { useState } from "react";
import Wrapper from "./style";
import Header from "../../../components/Header";
import { CodeupButton } from "../../../components/utils";
import { GoPencil, GoTrash } from "react-icons/go";

const defaultCurriculum = [
    {
        id: "1",
        name: "Sample Chapter",
        description: "These will be received from api later on to edit the curriculum as well",
        topics: [
            { id: "1-1", name: "What is Programming?", videoUrl: "", description: "Introduction to programming concepts.", isEditing: false },
            { id: "1-2", name: "Programming Languages", videoUrl: "", description: "Overview of different programming languages.", isEditing: false },
        ],
        isEditing: false,
    },
];

const CreateCurriculum = () => {
    const [curriculum, setCurriculum] = useState(defaultCurriculum);
    const [theme, setTheme] = useState("light");
    const [editingChapterIndex, setEditingChapterIndex] = useState(null);
    const [tempChapter, setTempChapter] = useState(null);
    const [tempTopic, setTempTopic] = useState(null);

    const addChapter = () => {
        setCurriculum([...curriculum, { id: Date.now().toString(), name: "", description: "", topics: [], isEditing: true }]);
    };

    const removeChapter = (chapterIndex) => {
        setCurriculum(curriculum.filter((_, index) => index !== chapterIndex));
    };

    const handleChapterChange = (chapterIndex, e) => {
        const { name, value } = e.target;
        const updatedCurriculum = [...curriculum];
        updatedCurriculum[chapterIndex][name] = value;
        setCurriculum(updatedCurriculum);
    };

    const saveChapter = (chapterIndex) => {
        const updatedCurriculum = [...curriculum];
        updatedCurriculum[chapterIndex].isEditing = false;
        setCurriculum(updatedCurriculum);
        setEditingChapterIndex(null);
    };

    const editChapter = (chapterIndex) => {
        setTempChapter({ ...curriculum[chapterIndex] });
        setEditingChapterIndex(chapterIndex);
        const updatedCurriculum = [...curriculum];
        updatedCurriculum[chapterIndex].isEditing = true;
        setCurriculum(updatedCurriculum);
    };

    const cancelEditChapter = (chapterIndex) => {
        if (curriculum[chapterIndex].name === "" && curriculum[chapterIndex].description === "") {
            removeChapter(chapterIndex);
        } else if (tempChapter) {
            const updatedCurriculum = [...curriculum];
            updatedCurriculum[chapterIndex] = tempChapter;
            setCurriculum(updatedCurriculum);
        }
        setEditingChapterIndex(null);
    };

    const addTopic = (chapterIndex) => {
        const updatedCurriculum = [...curriculum];
        updatedCurriculum[chapterIndex].topics.push({
            id: Date.now().toString(),
            name: "",
            videoUrl: "",
            description: "",
            isEditing: true,
        });
        setCurriculum(updatedCurriculum);
    };

    const removeTopic = (chapterIndex, topicIndex) => {
        const updatedCurriculum = [...curriculum];
        updatedCurriculum[chapterIndex].topics.splice(topicIndex, 1);
        setCurriculum(updatedCurriculum);
    };

    const saveTopic = (chapterIndex, topicIndex) => {
        const updatedCurriculum = [...curriculum];
        updatedCurriculum[chapterIndex].topics[topicIndex].isEditing = false;
        setCurriculum(updatedCurriculum);
    };

    const editTopic = (chapterIndex, topicIndex) => {
        setTempTopic({ ...curriculum[chapterIndex].topics[topicIndex] });
        const updatedCurriculum = [...curriculum];
        updatedCurriculum[chapterIndex].topics[topicIndex].isEditing = true;
        setCurriculum(updatedCurriculum);
    };

    const cancelEditTopic = (chapterIndex, topicIndex) => {
        if (curriculum[chapterIndex].topics[topicIndex].name === "" && curriculum[chapterIndex].topics[topicIndex].videoUrl === "" && curriculum[chapterIndex].topics[topicIndex].description === "") {
            removeTopic(chapterIndex, topicIndex);
        } else if (tempTopic) {
            const updatedCurriculum = [...curriculum];
            updatedCurriculum[chapterIndex].topics[topicIndex] = tempTopic;
            updatedCurriculum[chapterIndex].topics[topicIndex].isEditing = false;
            setCurriculum(updatedCurriculum);
        } else {
            const updatedCurriculum = [...curriculum];
            updatedCurriculum[chapterIndex].topics[topicIndex].isEditing = false;
            setCurriculum(updatedCurriculum);
        }
    };

    const handleTopicChange = (chapterIndex, topicIndex, e) => {
        const { name, value } = e.target;
        const updatedCurriculum = [...curriculum];
        updatedCurriculum[chapterIndex].topics[topicIndex][name] = value;
        setCurriculum(updatedCurriculum);
    };

    const submitCurriculum = () => {
        console.log(curriculum);
    };

    return (
        <Wrapper theme={theme}>
            <Header showLogo={true} showSearch={false} showProfile={true} showNotification={true} theme={theme} setTheme={setTheme} />
            <div className="container mt-4">
                <h1 className="mb-3">Course Curriculum</h1>
                <p>Organize your course by adding chapters and topics for structured learning.</p>
                <div className="shadow">
                    {curriculum.map((chapter, chapterIndex) => (
                        <div key={chapter.id} className="card mb-4">
                            <div className="card-body">
                                {chapter.isEditing ? (
                                    <>
                                        <label>Chapter Name</label>
                                        <input type="text" name="name" className="form-control mb-2" placeholder="Chapter Name" value={chapter.name} onChange={(e) => handleChapterChange(chapterIndex, e)} />
                                        <label>Chapter Description</label>
                                        <textarea name="description" className="form-control mb-2" placeholder="Chapter Description" value={chapter.description} onChange={(e) => handleChapterChange(chapterIndex, e)} />
                                        <div className="d-flex gap-2">
                                            <CodeupButton onClick={() => saveChapter(chapterIndex)}>Save</CodeupButton>
                                            <button className="btn btn-secondary" onClick={() => cancelEditChapter(chapterIndex)}>
                                                Cancel
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <p className="mb-0">{chapter.name}</p>
                                            <div>
                                                <GoPencil className="me-2" style={{ cursor: "pointer" }} onClick={() => editChapter(chapterIndex)} />
                                                <GoTrash style={{ cursor: "pointer" }} onClick={() => removeChapter(chapterIndex)} />
                                            </div>
                                        </div>
                                        <h5 className="mt-3">Topics</h5>
                                        {chapter.topics.map((topic, topicIndex) => (
                                            <div key={topic.id} className="card mb-2">
                                                <div className="card-body">
                                                    {topic.isEditing ? (
                                                        <>
                                                            <label>Topic Name</label>
                                                            <input type="text" name="name" className="form-control mb-2" placeholder="Topic Name" value={topic.name} onChange={(e) => handleTopicChange(chapterIndex, topicIndex, e)} />
                                                            <label>Video URL</label>
                                                            <input type="text" name="videoUrl" className="form-control mb-2" placeholder="Video URL" value={topic.videoUrl} onChange={(e) => handleTopicChange(chapterIndex, topicIndex, e)} />
                                                            <label>Description</label>
                                                            <textarea name="description" className="form-control mb-2" placeholder="Description" value={topic.description} onChange={(e) => handleTopicChange(chapterIndex, topicIndex, e)} />
                                                            <div className="d-flex gap-2">
                                                                <CodeupButton onClick={() => saveTopic(chapterIndex, topicIndex)}>Save</CodeupButton>
                                                                <button className="btn btn-secondary" onClick={() => cancelEditTopic(chapterIndex, topicIndex)}>
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <p className="mb-0">{topic.name}</p>
                                                            <div>
                                                                <GoPencil className="me-2" style={{ cursor: "pointer" }} onClick={() => editTopic(chapterIndex, topicIndex)} />
                                                                <GoTrash style={{ cursor: "pointer" }} onClick={() => removeTopic(chapterIndex, topicIndex)} />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}

                                        <CodeupButton onClick={() => addTopic(chapterIndex)}>Add Topic</CodeupButton>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}

                    <div className="d-flex justify-content-between">
                        <CodeupButton className="mb-3" onClick={addChapter}>
                            Add Chapter
                        </CodeupButton>
                        <CodeupButton className="mb-3" onClick={submitCurriculum}>
                            Submit
                        </CodeupButton>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default CreateCurriculum;
