import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SettingsPage.css";
import { apiFetch } from "../api.js"; // Make sure to import your apiFetch function

function SettingsPage() {
    const [timeLimit, setTimeLimit] = useState(30);
    const [teamMode, setTeamMode] = useState("FFA");
    const [numberOfPlayers, setNumberOfPlayers] = useState(2);
    const [quizMode, setQuizMode] = useState("NORMAL");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiFetch("/config/set-config/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    timeLimit,
                    teamMode,
                    numberOfPlayers,
                    quizMode
                })
            });

            if (response.ok) {
                navigate("/room-code");
            } else {
                console.error("Failed to set settings");
                alert("Failed to set settings. Please try again.");
            }
        } catch (error) {
            console.error("Error setting settings:", error);
            alert("An error occurred while setting settings.");
        }
    };

    return (
        <div className="settings-page">
            <h1>Step 3 - Game Configuration</h1>
            <img src="https://static-00.iconduck.com/assets.00/settings-icon-245x256-yljp2dn9.png" style={{width:"150px"}}></img>
            <form onSubmit={handleSubmit} className="settings-form">
                {/* Time Limit */}
                <div className="setting-item">
                    <label htmlFor="timeLimit">Time Limit (seconds)</label>
                    <input
                        type="number"
                        id="timeLimit"
                        value={timeLimit}
                        onChange={(e) => setTimeLimit(Number(e.target.value))}
                        min="1"
                        max="60"
                        className="setting-input"
                    />
                </div>

                {/* Team Mode */}
                <div className="setting-item">
                    <label htmlFor="teamMode">Team Mode</label>
                    <select
                        id="teamMode"
                        value={teamMode}
                        onChange={(e) => setTeamMode(e.target.value)}
                        className="setting-dropdown"
                    >
                        <option value="FFA">FFA</option>
                        <option value="TEAM">TEAM</option>
                        <option value="COOP">COOP</option>
                    </select>
                </div>

                {/* Number of Players */}
                <div className="setting-item">
                    <label htmlFor="numberOfPlayers">Number of Players</label>
                    <input
                        type="number"
                        id="numberOfPlayers"
                        value={numberOfPlayers}
                        onChange={(e) => setNumberOfPlayers(Number(e.target.value))}
                        min="2"
                        max="6"
                        className="setting-input"
                    />
                </div>

                {/* Quiz Mode */}
                <div className="setting-item">
                    <label htmlFor="quizMode">Quiz Mode</label>
                    <select
                        id="quizMode"
                        value={quizMode}
                        onChange={(e) => setQuizMode(e.target.value)}
                        className="setting-dropdown"
                    >
                        <option value="NORMAL">NORMAL</option>
                        <option value="BUZZ">BUZZ</option>
                        <option value="TIME_RUSH">TIME RUSH</option>
                    </select>
                </div>

                <button type="submit" className="apply-button">Apply Settings</button>
            </form>
        </div>
    );
}

export default SettingsPage;