"use client";
import Wrapper from "./style";

const CourseInfo = ({ theme }) => {
    return (
        <Wrapper theme={theme}>
            <div className="container">
                <h1>Start creating your course</h1>
                <div className="mb-4">
                    <h2>Welcome and overview:</h2>
                    <p>Begin with a friendly introduction. Share your name, background, and relevant expertise to establish credibility.</p>
                    <p>Clearly communicate what students can expect to learn and achieve by the end of the course or session.</p>
                    <h2>Clear Goals for Each Section:</h2>
                    <p>Divide the content into well-defined sections or modules. Each section should focus on achieving one specific learning goal.</p>
                    <p>Keep lectures concise, with a maximum length of 30 minutes to maintain student interest and support focused, short-burst learning. Focus on one topic per lecture, making it easier for learners to revisit and review specific concepts when needed.</p>
                    <h2>Practice Activities Create Hands-On Learning:</h2>
                    <p>Encourage students to apply their learning immediately by integrating practice opportunities throughout the course.</p>
                    <h2>Film and Export in HD:</h2>
                    <p>Encourage students to apply their learning immediately by integrating practice opportunities throughout the course.</p>
                    <p>Use a stable camera setup, and ensure good lighting to maintain high visual quality.</p>
                </div>
            </div>
        </Wrapper>
    );
};

export default CourseInfo;
