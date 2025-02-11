"use client";

import React, { useState } from "react";

const CreateQuestion = () => {
    const [questionData, setQuestionData] = useState({
        question: "",
        options: [],
        correctAnswer: "",
        testCases: [],
        category: "",
        complexity: "1",
        genre: "Objective",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuestionData({ ...questionData, [name]: value });
    };

    const addOption = () => {
        setQuestionData({
            ...questionData,
            options: [...questionData.options, ""],
        });
    };

    const removeOption = (index) => {
        const updatedOptions = questionData.options.filter((_, i) => i !== index);
        setQuestionData({ ...questionData, options: updatedOptions });
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...questionData.options];
        updatedOptions[index] = value;
        setQuestionData({ ...questionData, options: updatedOptions });
    };

    const addTestCase = () => {
        setQuestionData({
            ...questionData,
            testCases: [...questionData.testCases, ""],
        });
    };

    const removeTestCase = (index) => {
        const updatedTestCases = questionData.testCases.filter((_, i) => i !== index);
        setQuestionData({ ...questionData, testCases: updatedTestCases });
    };

    const handleTestCaseChange = (index, value) => {
        const updatedTestCases = [...questionData.testCases];
        updatedTestCases[index] = value;
        setQuestionData({ ...questionData, testCases: updatedTestCases });
    };

    const handleSubmit = () => {
        console.log(questionData);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Create Question</h1>

            <div className="mb-3">
                <label className="form-label">Question:</label>
                <input type="text" name="question" className="form-control" value={questionData.question} onChange={handleInputChange} />
            </div>

            <div className="mb-3">
                <label className="form-label">Genre:</label>
                <select name="genre" className="form-select" value={questionData.genre} onChange={handleInputChange}>
                    <option value="Objective">Objective</option>
                    <option value="Subjective">Subjective</option>
                </select>
            </div>

            {questionData.genre === "Objective" && (
                <>
                    <div className="mb-3">
                        <button className="btn btn-secondary mb-2" onClick={addOption}>
                            Add Option
                        </button>
                        {questionData.options.map((option, index) => (
                            <div className="input-group mb-2" key={index}>
                                <textarea className="form-control" value={option} placeholder={`Option ${index + 1}`} onChange={(e) => handleOptionChange(index, e.target.value)}></textarea>
                                <button className="btn btn-danger" onClick={() => removeOption(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Correct Answer:</label>
                        <select className="form-select" name="correctAnswer" value={questionData.correctAnswer} onChange={handleInputChange}>
                            <option value="">Select Correct Answer</option>
                            {questionData.options.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                </>
            )}

            {questionData.genre === "Subjective" && (
                <>
                    <div className="mb-3">
                        <button className="btn btn-secondary mb-2" onClick={addTestCase}>
                            Add Test Case
                        </button>
                        {questionData.testCases.map((testCase, index) => (
                            <div className="input-group mb-2" key={index}>
                                <textarea className="form-control" value={testCase} placeholder={`Test Case ${index + 1}`} onChange={(e) => handleTestCaseChange(index, e.target.value)}></textarea>
                                <button className="btn btn-danger" onClick={() => removeTestCase(index)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <div className="mb-3">
                <label className="form-label">Category:</label>
                <input type="text" name="category" className="form-control" value={questionData.category} onChange={handleInputChange} />
            </div>

            <div className="mb-3">
                <label className="form-label">Complexity:</label>
                <select name="complexity" className="form-select" value={questionData.complexity} onChange={handleInputChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>

            <button className="btn btn-success" onClick={handleSubmit}>
                Submit Question
            </button>
        </div>
    );
};

export default CreateQuestion;
