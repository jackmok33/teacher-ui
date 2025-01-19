import { useState } from "react";
import "../styles/TeamsPage.css";

function TeamsPage() {
    const [viewMode, setViewMode] = useState("team"); // 'team' or 'individual'

    const teams = [
        {
            teamName: "Team 1",
            teamSize: 5,
            students: [
                { name: "Alice", isRemote: false },
                { name: "Bob", isRemote: true },
                { name: "Charlie", isRemote: false },
                { name: "Diana", isRemote: true },
                { name: "Ethan", isRemote: false },
            ],
        },
        {
            teamName: "Team 2",
            teamSize: 5,
            students: [
                { name: "Fiona", isRemote: false },
                { name: "George", isRemote: false },
                { name: "Hannah", isRemote: true },
                { name: "Ian", isRemote: false },
                { name: "Jane", isRemote: true },
            ],
        },
    ];

    const individualStudents = [
        { name: "Alice", isRemote: false },
        { name: "Bob", isRemote: true },
        { name: "Charlie", isRemote: false },
        { name: "Diana", isRemote: true },
        { name: "Ethan", isRemote: false },
        { name: "Fiona", isRemote: false },
        { name: "George", isRemote: false },
        { name: "Hannah", isRemote: true },
        { name: "Ian", isRemote: false },
        { name: "Jane", isRemote: true },
    ];

    return (
        <div className="teams-page">
            <h1>Game Mode</h1>
            <div className="toggle-bar">
                <button
                    className={`toggle-button ${viewMode === "team" ? "active" : ""}`}
                    onClick={() => setViewMode("team")}
                >
                    Team Mode
                </button>
                <button
                    className={`toggle-button ${viewMode === "individual" ? "active" : ""}`}
                    onClick={() => setViewMode("individual")}
                >
                    Individual Mode
                </button>
            </div>

            {viewMode === "team" ? (
                <div className="teams-container">
                    {teams.map((team, index) => (
                        <div key={index} className="team-card">
                            <h2>{team.teamName}</h2>
                            <p className="team-size">Team Size: {team.teamSize}</p>
                            <ul className="students-list">
                                {team.students.map((student, idx) => (
                                    <li key={idx} className="student-item">
                                        <span>{student.name}</span>
                                        {student.isRemote && <span className="remote-tag">Remote</span>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="individual-container">
                    <ul className="individual-list">
                        {individualStudents.map((student, index) => (
                            <li key={index} className="student-item">
                                <span>{student.name}</span>
                                {student.isRemote && <span className="remote-tag">Remote</span>}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default TeamsPage;
