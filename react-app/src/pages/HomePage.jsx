import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import "./Homepage.css";

function Homepage({ onNameSubmit }) {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("teacherName", name); // Save teacher's name
        navigate("/upload");
    };

    return (
        <div className="homepage">
            <div className="hero">
                <h1>Welcome to Teacher's Dashboard</h1>
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
                    <button type="submit" className="submit-button">
                        Get Started
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Homepage;
