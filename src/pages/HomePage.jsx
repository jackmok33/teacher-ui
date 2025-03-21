import  { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import "../styles/Homepage.css";
import teacherFlow from "../assets/teacherFlow.png"; // Import the image

function Homepage() {
    const [gameMode, setGameMode] = useState("json"); // State for selecting the game mode
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(gameMode === "json") {
            navigate("/upload-json");
        }else{
            navigate("/upload-image");
        }
    };

    return (
        <div className="homepage">
            <div className="hero">
                <img src="logo.png" style={{width:"200px"}}></img>
                <h1>Classroom Explorer Teacher&#39;s Dashboard</h1>
                <p>Dashboard to setup the game environment for students. Please read below for the step guide.</p>
                <form className="name-form" onSubmit={handleSubmit}>
                    <select
                        value={gameMode}
                        onChange={(e) => setGameMode(e.target.value)}
                        className="game-mode-select"
                    >
                        <option value="json">Upload JSON File</option>
                        <option value="object-recognition">Object Recognition</option>
                    </select>
                    <button type="submit" className="submit-button">
                        Get Started
                    </button>
                </form>
                <br/>
                <br/>
                <h1>Step Guide</h1>
                <img src={teacherFlow} alt="Teacher UI Flow" style={{width:"700px"}}></img>
                <div className="textbody">
                    <h3>Step 1 - Generate Questions</h3>
                    <p>User can decide generating questions by i) uploading JSON file or ii) Using Object Recognition to recognise object as prompts for AI generated Questions</p>
                </div>
                <div className="textbody">
                    <h3>Step 2 - Generate Background Image</h3>
                    <p>User then can customise the prompts for generating the background image for the game board and the quiz background</p>
                </div>
                <div className="textbody">
                    <h3>Step 3 - Game Config</h3>
                    <p>User then can finalise the game configuration and generate room code for student to join</p>
                </div>
                
            </div>
        </div>
    );
}

export default Homepage;
