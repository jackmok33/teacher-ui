import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SettingsPage.css";

function SettingsPage() {
    const [age, setAge] = useState("10-12");
    const [difficulty, setDifficulty] = useState("Easy");
    const [time, setTime] = useState("30");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Settings Submitted:", { age, difficulty, time });
        navigate("/room-code");
    };

    return (
        <div className="game-settings-page">
            <h1>Game Settings</h1>
            <p>Customize the settings for your game and create a unique experience for your students.</p>

            <form onSubmit={handleSubmit} className="settings-form">
                {/* Age Group Selection */}
                <div className="setting-item">
                    <label htmlFor="age">Age Group</label>
                    <select id="age" value={age} onChange={(e) => setAge(e.target.value)} className="setting-dropdown">
                        <option value="7-9">7-9 years</option>
                        <option value="10-12">10-12 years</option>
                        <option value="13-15">13-15 years</option>
                        <option value="16-18">16-18 years</option>
                    </select>
                </div>

                {/* Difficulty Level Selection */}
                <div className="setting-item">
                    <label htmlFor="difficulty">Difficulty Level</label>
                    <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="setting-dropdown">
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>

                {/* Time Limit Selection */}
                <div className="setting-item">
                    <label htmlFor="time">Time Limit (seconds)</label>
                    <select id="time" value={time} onChange={(e) => setTime(e.target.value)} className="setting-dropdown">
                        <option value="10">10 seconds</option>
                        <option value="20">20 seconds</option>
                        <option value="30">30 seconds</option>
                        <option value="40">40 seconds</option>
                        <option value="50">50 seconds</option>
                        <option value="60">60 seconds</option>
                    </select>
                </div>

                {/* Apply Button */}
                <button type="submit" className="apply-button">Apply Settings</button>
            </form>
        </div>
    );
}

export default SettingsPage;
