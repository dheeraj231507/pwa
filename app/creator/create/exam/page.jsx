"use client";

import React, { useState } from "react";
import { Accordion } from "react-bootstrap";

const CreateExam = () => {
    const [tests, setTests] = useState([]); // Placeholder for API data
    const [selectedTests, setSelectedTests] = useState([]);
    const [formData, setFormData] = useState({
        questionCount: "",
        complexityDistribution: { 1: 0, 2: 0, 3: 0, 4: 0 },
        availabilityTime: "",
        startTime: "",
        endTime: "",
        whoCanTakeTest: "anyone",
        manualIds: "",
        otps: "",
    });

    // Mock data fetch function
    const fetchTests = () => {
        // Replace with an API call in real implementation
        const mockTests = [
            {
                name: "Python",
                description: "A simple python test 1",
                genre: "Objective",
                questions: [
                    {
                        question: "Question 1",
                        options: ["1", "2", "3", "4"],
                        correctAnswer: "3",
                        testCases: [],
                        category: "simple",
                        complexity: "2",
                    },
                    {
                        question: "Question 2",
                        options: ["1", "2", "3"],
                        correctAnswer: "3",
                        testCases: [],
                        category: "simple",
                        complexity: "2",
                    },
                    {
                        question: "Question 3",
                        options: ["1", "2", "3"],
                        correctAnswer: "3",
                        testCases: [],
                        category: "simple",
                        complexity: "2",
                    },
                ],
                availabilityTime: "20",
                startTime: "2025-01-20T15:30",
                endTime: "2025-01-20T16:30",
                whoCanTakeTest: "anyone",
                manualIds: "",
                otps: "",
            },
            {
                name: "Js",
                description: "A simple python test 2",
                genre: "Objective",
                questions: [
                    {
                        question: "Question 1",
                        options: ["1", "2", "3"],
                        correctAnswer: "3",
                        testCases: [],
                        category: "simple",
                        complexity: "2",
                    },
                ],
                availabilityTime: "20",
                startTime: "2025-01-20T15:30",
                endTime: "2025-01-20T16:30",
                whoCanTakeTest: "anyone",
                manualIds: "",
                otps: "",
            },
            {
                name: "Web dev",
                description: "A simple python test 3",
                genre: "Subjective",
                questions: [
                    {
                        question: "question 100",
                        options: [],
                        correctAnswer: "",
                        testCases: ["this and that", "that and this"],
                        category: "yes",
                        complexity: "1",
                    },
                    {
                        question: "question 100",
                        options: [],
                        correctAnswer: "",
                        testCases: ["this and that", "that and this"],
                        category: "yes",
                        complexity: "1",
                    },
                ],
                availabilityTime: "20",
                startTime: "2025-01-20T15:30",
                endTime: "2025-01-20T16:30",
                whoCanTakeTest: "anyone",
                manualIds: "",
                otps: "",
            },
        ];
        setTests(mockTests);
    };

    const handleTestSelection = (index) => {
        setSelectedTests((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleComplexityChange = (level, value) => {
        setFormData((prev) => ({
            ...prev,
            complexityDistribution: {
                ...prev.complexityDistribution,
                [level]: value,
            },
        }));
    };

    const handleSubmit = () => {
        const selectedTestDetails = selectedTests.map((index) => tests[index]);
        const finalData = {
            selectedTests: selectedTestDetails,
            questionCount: formData.questionCount,
            complexityDistribution: formData.complexityDistribution,
            availabilityTime: formData.availabilityTime,
            startTime: formData.startTime,
            endTime: formData.endTime,
            whoCanTakeTest: formData.whoCanTakeTest,
            manualIds: formData.manualIds,
            otps: formData.otps,
        };
        console.log(finalData);
    };

    React.useEffect(() => {
        fetchTests();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Create Exam</h1>

            <h2>Available Tests</h2>
            <Accordion className="mb-4">
                {tests.map((test, index) => (
                    <Accordion.Item key={index} eventKey={index.toString()}>
                        <Accordion.Header>
                            <label className="form-check-label d-flex align-items-center">
                                <input type="checkbox" className="form-check-input me-2" checked={selectedTests.includes(index)} onChange={() => handleTestSelection(index)} />
                                <strong>{test.name}</strong>
                            </label>
                        </Accordion.Header>
                        <Accordion.Body>
                            <p>
                                <strong>Genre:</strong> {test.genre}
                            </p>
                            <p>
                                <strong>Description:</strong> {test.description}
                            </p>
                            <h5>Questions:</h5>
                            <ul className="list-group">
                                {test.questions.map((question, qIndex) => (
                                    <li key={qIndex} className="list-group-item">
                                        <p>
                                            <strong>Q{qIndex + 1}:</strong> {question.question}
                                        </p>
                                        <p>
                                            <strong>Options:</strong> {question.options.join(", ")}
                                        </p>
                                        <p>
                                            <strong>Correct Answer:</strong> {question.correctAnswer}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>

            <div className="card p-4">
                <h2 className="mb-4">Exam Details</h2>
                <div className="mb-3">
                    <label className="form-label">Question Count:</label>
                    <input type="number" name="questionCount" className="form-control" value={formData.questionCount} onChange={handleInputChange} />
                </div>
                <h3 className="mb-3">Complexity Distribution</h3>
                {[1, 2, 3, 4].map((level) => (
                    <div key={level} className="mb-3">
                        <label className="form-label">Level {level}:</label>
                        <input type="number" className="form-control" value={formData.complexityDistribution[level]} onChange={(e) => handleComplexityChange(level, e.target.value)} />
                    </div>
                ))}
                <div className="mb-3">
                    <label className="form-label">Availability Time:</label>
                    <input type="number" name="availabilityTime" className="form-control" value={formData.availabilityTime} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Start Time:</label>
                    <input type="datetime-local" name="startTime" className="form-control" value={formData.startTime} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">End Time:</label>
                    <input type="datetime-local" name="endTime" className="form-control" value={formData.endTime} onChange={handleInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Who Can Take Test:</label>
                    <select name="whoCanTakeTest" className="form-select" value={formData.whoCanTakeTest} onChange={handleInputChange}>
                        <option value="anyone">Anyone</option>
                        <option value="otp">OTP</option>
                        <option value="manualId">Manual ID</option>
                    </select>
                </div>
                {formData.whoCanTakeTest === "manualId" && (
                    <div className="mb-3">
                        <textarea name="manualIds" className="form-control" placeholder="Enter manual IDs" value={formData.manualIds} onChange={handleInputChange}></textarea>
                    </div>
                )}
                {formData.whoCanTakeTest === "otp" && (
                    <div className="mb-3">
                        <textarea name="otps" className="form-control" placeholder="Enter OTPs" value={formData.otps} onChange={handleInputChange}></textarea>
                    </div>
                )}

                <button className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default CreateExam;
