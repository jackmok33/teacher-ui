import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/UploadImagePage.css";
import {apiFetch} from "../api.js";

function UploadImagePage() {
    const [recognizedItem, setRecognizedItem] = useState("");
    const [isCapturing, setIsCapturing] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate(); // Initialize useNavigate

    const startCamera = async () => {
        try {
            setIsCapturing(true);
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        } catch (error) {
            alert("Error accessing the camera: " + error.message);
        }
    };

    const captureImage = async () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext("2d");
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
            canvasRef.current.toBlob(async (blob) => {
                if (!blob) return;

                const formData = new FormData();
                formData.append("file", blob, `image-${Date.now()}.png`);

                try {
                    const response = await apiFetch("/ai/recognize/", {
                        method: "POST",
                        body: formData,
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setRecognizedItem(data.data.item);
                        alert("Item Recognized successfully!");
                    } else {
                        alert("Failed to upload image");
                    }
                } catch (error) {
                    console.error("Error uploading image:", error);
                    alert("An error occurred while uploading the image");
                }
            }, "image/png");
        }
    };

    const stopCamera = () => {
        setIsCapturing(false);
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
        }
    };

    const goToQuestionsSettings = () => {
        if(recognizedItem) {
            localStorage.setItem("recognizedItem", recognizedItem);
            navigate("/settings");
        } else {
            alert("No recognized item found.");
        }
    };

    return (
        <div className="upload-page">
            <div className="camera-section">
                <h1>Capture Images For Recognition</h1>
                {!isCapturing && (
                    <button onClick={startCamera} className="camera-button">
                        Start Camera
                    </button>
                )}
                {isCapturing && (
                    <div className="camera-capture-container">
                        <video ref={videoRef} className="camera-preview"></video>
                        <canvas ref={canvasRef} className="hidden-canvas" width={640} height={480}></canvas>
                        <div className="camera-controls">
                            <button onClick={captureImage} className="camera-button">
                                Capture Image
                            </button>
                            <button onClick={stopCamera} className="camera-button">
                                Stop Camera
                            </button>
                        </div>
                    </div>
                )}
                <div className="captured-images">
                    <h3>Recognized Object</h3>
                    {recognizedItem !== "" ? (
                        <div className="captured-images-grid">
                            <div className="captured-text">{recognizedItem}</div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                {recognizedItem && (
                    <button onClick={goToQuestionsSettings} className="camera-button">
                        Go to Generate Quiz Questions
                    </button>
                )}
            </div>
        </div>
    );
}

export default UploadImagePage;
