"use client";

import React, { useState } from "react";
import CodeupModal from "../../../components/CodeupModal";
import CourseInfo from "../../../components/CourseInfo";
import dynamic from "next/dynamic";
import Wrapper from "./style";
import Header from "../../../components/Header";
import { CodeupButton } from "../../../components/utils";

const Select = dynamic(() => import("react-select"), { ssr: false });

const programmingTags = [
    { value: "javascript", label: "JavaScript" },
    { value: "react", label: "React" },
    { value: "nodejs", label: "Node.js" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
];

const CreateCourse = () => {
    const [course, setCourse] = useState({
        title: "",
        objectives: [""],
        category: [],
        level: "",
        prerequisites: "",
        shortDescription: "",
        longDescription: "",
        thumbnail: "",
    });
    const [thumbnail, setThumbnail] = useState(null);

    const handleCourseChange = (e) => {
        const { name, value } = e.target;
        setCourse({ ...course, [name]: value });
    };

    const handleObjectiveChange = (index, value) => {
        const updatedObjectives = [...course.objectives];
        updatedObjectives[index] = value;
        setCourse({ ...course, objectives: updatedObjectives });
    };

    const addObjective = () => {
        setCourse({ ...course, objectives: [...course.objectives, ""] });
    };

    const removeObjective = (index) => {
        const updatedObjectives = course.objectives.filter((_, i) => i !== index);
        setCourse({ ...course, objectives: updatedObjectives });
    };

    const handleCategoryChange = (selectedOptions) => {
        setCourse({ ...course, category: selectedOptions });
    };

    const handleThumbnailChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnail(reader.result);
                setCourse((prev) => ({ ...prev, thumbnail: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const publishCourse = () => {
        console.log(course);
        window.location.href = "/creator/create/curriculum";
    };

    const [theme, setTheme] = useState("light");

    return (
        <Wrapper theme={theme}>
            <Header showLogo={true} showSearch={false} showProfile={true} showNotification={true} theme={theme} setTheme={setTheme} />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h1 className="m-0">Course Landing Page</h1>
                    <CodeupModal theme={theme} button={<button className="btn btn-secondary py-0 px-2">?</button>} head="Course" body={<CourseInfo theme={theme} />} />
                </div>

                <div className="shadow">
                    <div className="mb-3 mt-3">
                        <label>Course Title</label>
                        <input type="text" name="title" className="form-control" placeholder="Course Title" value={course.title} onChange={handleCourseChange} />
                    </div>

                    <div className="mb-3">
                        <label>Course Objectives</label>
                        <p className="info">You need to provide at least three objectives that learners will achieve upon completing your course.</p>
                        {course.objectives.map((objective, index) => (
                            <div key={index} className="objective-input mb-2">
                                <input type="text" className="form-control" placeholder="Objective" value={objective} onChange={(e) => handleObjectiveChange(index, e.target.value)} />
                                <button className="btn btn-close" onClick={() => removeObjective(index)}></button>
                            </div>
                        ))}
                        <button className="btn btn-secondary" onClick={addObjective}>
                            Add More
                        </button>
                    </div>

                    <div className="mb-3">
                        <label>Course Category</label>
                        <Select isMulti options={programmingTags} className="basic-multi-select" classNamePrefix="select" placeholder="Select or type to add" value={course.category} onChange={handleCategoryChange} isCreatable />
                    </div>

                    <div className="mb-3">
                        <label>Course Level</label>
                        <select name="level" className="form-control" value={course.level} onChange={handleCourseChange}>
                            <option value="">Select Level</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label>Course Prerequisites</label>
                        <p className="info">Any requirements for students need to know before taking your course.</p>
                        <textarea name="prerequisites" className="form-control" placeholder="Course Prerequisites" value={course.prerequisites} onChange={handleCourseChange} />
                    </div>

                    <div className="mb-3">
                        <label>Short Description</label>
                        <textarea name="shortDescription" className="form-control" placeholder="Short Description" value={course.shortDescription} onChange={handleCourseChange} />
                    </div>

                    <div className="mb-3">
                        <label>Long Description</label>
                        <textarea name="longDescription" className="form-control" placeholder="Long Description" value={course.longDescription} onChange={handleCourseChange} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="thumbnail" className="form-label">
                            Thumbnail
                        </label>
                        <input type="file" className="form-control" accept="image/*" onChange={handleThumbnailChange} />
                    </div>
                    {thumbnail && (
                        <div className="my-3">
                            <img src={thumbnail} alt="Thumbnail Preview" className="img-thumbnail" style={{ maxWidth: "200px" }} />
                        </div>
                    )}

                    <CodeupButton className="mb-3 ms-auto d-block" onClick={publishCourse}>
                        Next
                    </CodeupButton>
                </div>
            </div>
        </Wrapper>
    );
};

export default CreateCourse;
