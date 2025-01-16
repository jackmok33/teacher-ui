import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SettingsPage.css";

function SettingsPage() {
    const [age, setAge] = useState("7-9");
    const [questionCount, setQuestionCount] = useState(10);
    const [topic, setTopic] = useState("History");
    const [timeLimit, setTimeLimit] = useState("30");
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleGenerate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setQuizQuestions([]);

        const params = new URLSearchParams({
            ageGroup: age,
            number: questionCount,
            topic: topic,
            item: localStorage.getItem("recognizedItem"),
        });

        try {
            const response = await fetch(`http://127.0.0.1:9000/generate/?${params.toString()}`, {
                method: "GET",
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("questions", JSON.stringify(data.data));
                setQuizQuestions(data.data || []);
            } else {
                console.error(response);
                alert("Failed to generate quiz questions. Please try again.");
            }
        } catch (error) {
            console.error("Error generating quiz questions:", error);
            alert("An error occurred while generating quiz questions.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleStartGame = () => {
        navigate("/room-code");
    };

    return (
        <div className="game-settings-page">
            <h1>Game Settings</h1>
            <p>Customize the settings for your game and create a unique experience for your students.</p>

            <form onSubmit={handleGenerate} className="settings-form">
                {/* Age Group Selection */}
                <div className="setting-item">
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
                        max="10"
                        className="setting-input"
                    />
                </div>

                {/* Topic Selection */}
                <div className="setting-item">
                    <label htmlFor="topic">Topic</label>
                    <select
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
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

                {/* Time Limit Selection */}
                <div className="setting-item">
                    <label htmlFor="timeLimit">Time Limit (seconds)</label>
                    <select
                        id="timeLimit"
                        value={timeLimit}
                        onChange={(e) => setTimeLimit(e.target.value)}
                        className="setting-dropdown"
                    >
                        <option value="30">30 seconds</option>
                        <option value="60">60 seconds</option>
                        <option value="90">90 seconds</option>
                        <option value="120">120 seconds</option>
                    </select>
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
                                    <p><strong>{question.question_text}</strong></p>
                                    <ul className="quiz-options">
                                        <li>{question.choiceA}</li>
                                        <li>{question.choiceB}</li>
                                        <li>{question.choiceC}</li>
                                        <li>{question.choiceD}</li>
                                    </ul>
                                    <p>{question.answer}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Start Game Button */}
                    <div className="start-game-container">
                        <button onClick={handleStartGame} className="start-game-button">
                            Start Game
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default SettingsPage;
