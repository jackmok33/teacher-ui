import React, { useEffect, useState } from "react";

function RoomCodePage() {
    const [roomCode, setRoomCode] = useState("");

    useEffect(() => {
        const generateRoomCode = () => {
            return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit code
        };
        setRoomCode(generateRoomCode());
    }, []);

    return (
        <div>
            <h1>Room Code</h1>
            <p>Share this code with your students: <strong>{roomCode}</strong></p>
        </div>
    );
}

export default RoomCodePage;
