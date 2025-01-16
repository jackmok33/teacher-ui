import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UploadCsvPage.css";

function UploadCsvPage() {
    const [file, setFile] = useState(null);
    const [timeLimit, setTimeLimit] = useState("30"); // State for time limit selection
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

        // Simulate file upload progress
        let interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsUploading(false);

                    // Save time limit to localStorage
                    localStorage.setItem("timeLimit", timeLimit);

                    navigate("/room-code");
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
                {/* File Upload Section */}
                <div className="file-upload-box">
                    <label className="file-upload-label">
                        {file ? file.name : "Drag or Browse to select a file"}
                        <input
                            type="file"
                            className="file-input"
                            onChange={handleFileChange}
                            accept=".csv"
                            required
                        />
                    </label>
                </div>

                {/* Time Limit Selection */}
                <div className="setting-item">
                    <label htmlFor="timeLimit">Time Limit (seconds)</label>
                    <select
                        id="timeLimit"
                        value={timeLimit}
                        onChange={(e) => setTimeLimit(e.target.value)}
                        className="time-limit-dropdown"
                    >
                        <option value="30">30 seconds</option>
                        <option value="60">60 seconds</option>
                        <option value="90">90 seconds</option>
                        <option value="120">120 seconds</option>
                    </select>
                </div>

                <button type="submit" className="upload-button" disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Upload File"}
                </button>
            </form>

            {/* Upload Progress */}
            {isUploading && (
                <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                    <span>{progress}%</span>
                </div>
            )}
        </div>
    );
}

export default UploadCsvPage;
