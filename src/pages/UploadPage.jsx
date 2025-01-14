import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadPage.css";

function UploadPage() {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [capturedImages, setCapturedImages] = useState([]);
    const [isCapturing, setIsCapturing] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleUpload = (e) => {
        e.preventDefault();
        if (!file) return alert("Please select a file!");

        setIsUploading(true);
        let interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    navigate("/settings");
                    return 100;
                }
                return prev + 10;
            });
        }, 500);
    };

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

    const captureImage = () => {
        if (capturedImages.length >= 10) {
            alert("You have already captured 10 images!");
            return;
        }
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext("2d");
            context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
            const imageData = canvasRef.current.toDataURL("image/png");
            setCapturedImages([...capturedImages, imageData]);
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

    return (
        <div className="upload-page">
            <h1>Upload Your Spreadsheet</h1>
            <p>Upload a spreadsheet to start the game setup</p>

            <form onSubmit={handleUpload} className="upload-form">
                <div className="file-upload-box">
                    <label className="file-upload-label">
                        {file ? file.name : "Drag or Browse to select a file"}
                        <input
                            type="file"
                            className="file-input"
                            onChange={handleFileChange}
                            accept=".xlsx,.xls,.csv"
                            required
                        />
                    </label>
                </div>

                <button type="submit" className="upload-button" disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Upload File"}
                </button>
            </form>

            {isUploading && (
                <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                    <span>{progress}%</span>
                </div>
            )}

            <div className="camera-section">
                <h2>Capture Images</h2>
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
                    <h3>Captured Images ({capturedImages.length}/10)</h3>
                    <div className="captured-images-grid">
                        {capturedImages.map((image, index) => (
                            <img key={index} src={image} alt={`Captured ${index + 1}`} className="captured-thumbnail" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadPage;
