"use client";

import React, { useState } from "react";

const CreateTestComponent = () => {
    const [testData, setTestData] = useState({
        name: "",
        description: "",
        genre: "Objective",
        questions: [],
        availabilityTime: "",
        startTime: "",
        endTime: "",
        whoCanTakeTest: "anyone",
        manualIds: "",
        otps: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTestData({ ...testData, [name]: value });
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...testData.questions];
        updatedQuestions[index][field] = value;
        setTestData({ ...testData, questions: updatedQuestions });
    };

    const addQuestion = () => {
        setTestData({
            ...testData,
            questions: [
                ...testData.questions,
                {
                    question: "",
                    options: [],
                    correctAnswer: "",
                    testCases: [],
                    category: "",
                    complexity: "1",
                },
            ],
        });
    };

    const removeQuestion = (index) => {
        const updatedQuestions = testData.questions.filter((_, i) => i !== index);
        setTestData({ ...testData, questions: updatedQuestions });
    };

    const addOption = (questionIndex) => {
        const updatedQuestions = [...testData.questions];
        updatedQuestions[questionIndex].options.push("");
        setTestData({ ...testData, questions: updatedQuestions });
    };

    const removeOption = (questionIndex, optionIndex) => {
        const updatedQuestions = [...testData.questions];
        updatedQuestions[questionIndex].options.splice(optionIndex, 1);
        setTestData({ ...testData, questions: updatedQuestions });
    };

    const addTestCase = (questionIndex) => {
        const updatedQuestions = [...testData.questions];
        updatedQuestions[questionIndex].testCases.push("");
        setTestData({ ...testData, questions: updatedQuestions });
    };

    const removeTestCase = (questionIndex, testCaseIndex) => {
        const updatedQuestions = [...testData.questions];
        updatedQuestions[questionIndex].testCases.splice(testCaseIndex, 1);
        setTestData({ ...testData, questions: updatedQuestions });
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...testData.questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setTestData({ ...testData, questions: updatedQuestions });
    };

    const handleTestCaseChange = (questionIndex, testCaseIndex, value) => {
        const updatedQuestions = [...testData.questions];
        updatedQuestions[questionIndex].testCases[testCaseIndex] = value;
        setTestData({ ...testData, questions: updatedQuestions });
    };

    const handleSubmit = () => {
        console.log(testData);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Create Test</h1>

            <div className="mb-3">
                <label className="form-label">Name:</label>
                <input type="text" name="name" className="form-control" value={testData.name} onChange={handleInputChange} />
            </div>

            <div className="mb-3">
                <label className="form-label">Description:</label>
                <textarea name="description" className="form-control" value={testData.description} onChange={handleInputChange}></textarea>
            </div>

            <div className="mb-3">
                <label className="form-label">Genre:</label>
                <select name="genre" className="form-select" value={testData.genre} onChange={handleInputChange}>
                    <option value="Objective">Objective</option>
                    <option value="Subjective">Subjective</option>
                </select>
            </div>

            <h2>Questions</h2>
            <button className="btn btn-primary mb-3" onClick={addQuestion}>
                Add Question
            </button>
            <div className="row">
                {(testData.questions || []).map((q, index) => (
                    <div className="mb-3 col-lg-4 col-md-6" key={index}>
                        <div className="card">
                            <div className="card-body">
                                <div className="mb-3">
                                    <label className="form-label">Question:</label>
                                    <input type="text" className="form-control" value={q.question} onChange={(e) => handleQuestionChange(index, "question", e.target.value)} />
                                </div>

                                {testData.genre === "Objective" && (
                                    <>
                                        <div className="mb-3">
                                            <button className="btn btn-secondary mb-2" onClick={() => addOption(index)}>
                                                Add Option
                                            </button>
                                            {(q.options || []).map((option, optionIndex) => (
                                                <div className="input-group mb-2" key={optionIndex}>
                                                    <textarea className="form-control" value={option} placeholder={`Option ${optionIndex + 1}`} onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}></textarea>
                                                    <button className="btn btn-danger" onClick={() => removeOption(index, optionIndex)}>
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Correct Answer:</label>
                                            <select className="form-select" value={q.correctAnswer} onChange={(e) => handleQuestionChange(index, "correctAnswer", e.target.value)}>
                                                <option value="">Select Correct Answer</option>
                                                {(q.options || []).map((option, optionIndex) => (
                                                    <option key={optionIndex} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </>
                                )}

                                {testData.genre === "Subjective" && (
                                    <>
                                        <div className="mb-3">
                                            <button className="btn btn-secondary mb-2" onClick={() => addTestCase(index)}>
                                                Add Test Case
                                            </button>
                                            {(q.testCases || []).map((testCase, testCaseIndex) => (
                                                <div className="input-group mb-2" key={testCaseIndex}>
                                                    <textarea className="form-control" value={testCase} placeholder={`Test case ${testCaseIndex + 1}`} onChange={(e) => handleTestCaseChange(index, testCaseIndex, e.target.value)}></textarea>
                                                    <button className="btn btn-danger" onClick={() => removeTestCase(index, testCaseIndex)}>
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}

                                <div className="mb-3">
                                    <label className="form-label">Category:</label>
                                    <input type="text" className="form-control" value={q.category} onChange={(e) => handleQuestionChange(index, "category", e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Complexity:</label>
                                    <select className="form-select" value={q.complexity} onChange={(e) => handleQuestionChange(index, "complexity", e.target.value)}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>

                                <button className="btn btn-danger" onClick={() => removeQuestion(index)}>
                                    Remove Question
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mb-3">
                <label className="form-label">Availability Time (in minutes):</label>
                <input type="number" name="availabilityTime" className="form-control" value={testData.availabilityTime} onChange={handleInputChange} />
            </div>

            <div className="mb-3">
                <label className="form-label">Start Time:</label>
                <input type="datetime-local" name="startTime" className="form-control" value={testData.startTime} onChange={handleInputChange} />
            </div>

            <div className="mb-3">
                <label className="form-label">End Time:</label>
                <input type="datetime-local" name="endTime" className="form-control" value={testData.endTime} onChange={handleInputChange} />
            </div>

            <div className="mb-3">
                <label className="form-label">Who can take the test:</label>
                <select name="whoCanTakeTest" className="form-select" value={testData.whoCanTakeTest} onChange={handleInputChange}>
                    <option value="anyone">Anyone</option>
                    <option value="manual">Manual User ID</option>
                    <option value="otp">OTP</option>
                </select>
            </div>

            {testData.whoCanTakeTest === "manual" && (
                <div className="mb-3">
                    <label className="form-label">Manual IDs:</label>
                    <textarea name="manualIds" className="form-control" placeholder="IDs (coma seperated values)" value={testData.manualIds} onChange={handleInputChange}></textarea>
                </div>
            )}

            {testData.whoCanTakeTest === "otp" && (
                <div className="mb-3">
                    <label className="form-label">OTPs:</label>
                    <textarea name="otps" className="form-control" placeholder="OTPs (coma seperated values)" value={testData.otps} onChange={handleInputChange}></textarea>
                </div>
            )}

            <button className="btn btn-success mb-3" onClick={handleSubmit}>
                Submit
            </button>
        </div>
    );
};

export default CreateTestComponent;
