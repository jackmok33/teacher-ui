import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GenerateQuestionPage.css";
import { apiFetch } from "../api.js";

function GenerateQuestionPage() {
    const [age, setAge] = useState("7-9");
    const [questionCount, setQuestionCount] = useState(5);
    const [subject, setSubject] = useState("History");
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Generate quiz questions sequentially for each recognized item
    const handleGenerate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setQuizQuestions([]);

        // Retrieve recognizedItems from localStorage and parse it as an array
        const recognizedItems = JSON.parse(localStorage.getItem("recognizedItems") || "[]");
        let allQuestions = [];
        if(recognizedItems.length * questionCount < 30) {
            alert("Please select more items or increase the number of questions.");
            setIsLoading(false);
            return;
        }

        // Loop through each recognized item one by one
        for (const item of recognizedItems) {
            // Prepare URL parameters for the current recognized item using its label
            const params = new URLSearchParams({
                ageGroup: age,
                number: questionCount,
                subject: subject,
                item: item.label,
            });

            try {
                // Await the API request for the current recognized item
                const response = await apiFetch(`/ai/generate/?${params.toString()}`, {
                    method: "GET",
                });

                if (response.ok) {
                    const data = await response.json();
                    // If the API returns questions, append them to the allQuestions array
                    if (data.data.questions && Array.isArray(data.data.questions)) {
                        allQuestions = allQuestions.concat(data.data.questions);
                    }
                } else {
                    console.error(`Failed to generate quiz questions for item ${item.label}:`, response);
                    alert(`Failed to generate quiz questions for item ${item.label}. Please try again.`);
                }
            } catch (error) {
                console.error(`Error generating quiz questions for item ${item.label}:`, error);
                alert(`An error occurred while generating quiz questions for item ${item.label}.`);
            }
        }

        // Update state with the accumulated questions
        setQuizQuestions(allQuestions);
        setIsLoading(false);
    };

    // Confirm the generated questions and navigate to the background image setting page
    const handleGoToSetBackgroundImage = async () => {
        try {
            const response = await apiFetch("/config/confirm-questions/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    questions: quizQuestions,
                }),
            });

            if (response.ok) {
                // Release the question generator model
                const response = await apiFetch("/ai/release-question-generator/",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                if (!response.ok) {
                    console.error("Failed to release question generator model:", response);
                }
                navigate("/background-image?ageGroup=" + age + "&subject=" + subject);
            } else {
                console.error(response);
                alert("Failed to confirm quiz questions. Please try again.");
            }
        } catch (error) {
            console.error("Error confirming quiz questions:", error);
            alert("An error occurred while confirming quiz questions.");
        }
    };

    return (
        <div className="game-settings-page">
            <h1>Step 1 - Question Preparation</h1>
            <h2>Quiz Question Generator</h2>
            <p>Customize the settings for your game and create a unique experience for your students.</p>

            <form onSubmit={handleGenerate} className="settings-form">
                {/* Age Group Selection */}
                <div className="settings-items">
                    `<div className="setting-item">
                        <label htmlFor="age">Age Group</label>
                        <select
                            id="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="setting-dropdown"
                        >
                            <option value="7-9">7-9 years</option>
                            <option value="10-12">10-12 years</option>
                            <option value="13-15">13-15 years</option>
                            <option value="16-18">16-18 years</option>
                        </select>
                    </div>

                    {/* Number of Questions */}
                    <div className="setting-item">
                        <label htmlFor="questionCount">Number of Questions</label>
                        <input
                            type="number"
                            id="questionCount"
                            value={questionCount}
                            onChange={(e) => setQuestionCount(Number(e.target.value))}
                            min="1"
                            max="5"
                            className="setting-input"
                        />
                    </div>

                    {/* Subject Selection */}
                    <div className="setting-item">
                        <label htmlFor="subject">Subject</label>
                        <select
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="setting-dropdown"
                        >
                            <option value="History">History</option>
                            <option value="English">English</option>
                            <option value="French">French</option>
                            <option value="Spanish">Spanish</option>
                            <option value="Business">Business</option>
                            <option value="Economics">Economics</option>
                        </select>
                    </div>
                </div>

                {/* Generate Button */}
                <button type="submit" className="apply-button">
                    {isLoading ? "Generating..." : "Generate Quiz Questions"}
                </button>
            </form>

            {/* Display Quiz Questions */}
            {quizQuestions.length > 0 && (
                <>
                    <div className="quiz-questions">
                        <h2>Generated Quiz Questions</h2>
                        <ul>
                            {quizQuestions.map((question, index) => (
                                <li key={index} className="quiz-question-item">
                                    <p><strong>Question: {question.question}</strong></p>
                                    <ul className="quiz-options">
                                        <li>Choice A: {question.choiceA}</li>
                                        <li>Choice B: {question.choiceB}</li>
                                        <li>Choice C: {question.choiceC}</li>
                                        <li>Choice D: {question.choiceD}</li>
                                    </ul>
                                    <p>Answer: {question.answer}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Start Game Button */}
                    <div className="start-game-container">
                        <button onClick={handleGoToSetBackgroundImage} className="start-game-button">
                            Set Background Image
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default GenerateQuestionPage;