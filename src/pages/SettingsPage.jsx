import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SettingsPage() {
    const [age, setAge] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [time, setTime] = useState("");
    const navigate = useNavigate();

    const handleSubmit = () => {
        const settings = { age, difficulty, time };
        console.log("Game settings:", settings); // Save settings
        navigate("/room-code");
    };

    return (
        <div>
            <h1>Adjust Game Settings</h1>
            <label>
                Age Group:
                <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
            </label>
            <label>
                Difficulty:
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="">Select</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </label>
            <label>
                Time Limit (minutes):
                <input
                    type="number"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
            </label>
            <button onClick={handleSubmit}>Generate Room Code</button>
        </div>
    );
}

export default SettingsPage;
