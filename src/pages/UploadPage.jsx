import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./UploadPage.css";

function UploadPage() {
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
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
        // Simulate a file upload process (replace with actual file upload logic)
        let interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);
                    navigate("/settings")
                    return 100;
                }
                return prev + 10;
            });
        }, 500);
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
        </div>
    );
}

export default UploadPage;
