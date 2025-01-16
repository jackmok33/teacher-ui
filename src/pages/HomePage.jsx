import  { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import "./Homepage.css";

function Homepage() {
    const [name, setName] = useState("");
    const [gameMode, setGameMode] = useState("csv"); // State for selecting the game mode
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("teacherName", name); // Save teacher's name
        if(gameMode === "csv") {
            navigate("/upload-csv");
        }else{
            navigate("/upload-image");
        }
    };

    return (
        <div className="homepage">
            <div className="hero">
                <h1>Welcome to Teacher&#39;s Dashboard</h1>
                <p>Manage your board game settings and create a unique, engaging experience for your students!</p>
                <form className="name-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="name-input"
                        required
                    />
                    <select
                        value={gameMode}
                        onChange={(e) => setGameMode(e.target.value)}
                        className="game-mode-select"
                    >
                        <option value="csv">Upload CSV File</option>
                        <option value="object-recognition">Object Recognition</option>
                    </select>
                    <button type="submit" className="submit-button">
                        Get Started
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Homepage;
