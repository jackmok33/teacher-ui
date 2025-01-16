import  { useState } from "react";
import "../styles/RoomCodePage.css";

function RoomCodePage() {
    const [roomCode] = useState(generateRoomCode());

// Function to generate a random 4-digit room code
    function generateRoomCode() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(roomCode).then(() => alert("Room code copied to clipboard!"));
    };

    return (
        <div className="room-code-page">
            <div className="room-code-box">
                <div className="room-code">
                    {roomCode.split("").map((digit, index) => (
                        <div key={index} className="digit-box">
                            {digit}
                        </div>
                    ))}
                </div>
                <div className="instructions">
                    <p>Share this code with your students to join the game!</p>
                    <button className="copy-button" onClick={handleCopy}>
                        Copy Code
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RoomCodePage;
