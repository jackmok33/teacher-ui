import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UploadCsvPage.css";
import {apiFetch} from "../api.js";

function UploadCsvPage() {
    const [file, setFile] = useState(null);
    const [timeLimit, setTimeLimit] = useState("30"); // State for time limit selection
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return alert("Please select a file!");

        setIsUploading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("timeLimit", timeLimit);

        try {
            const response = await apiFetch("/config/confirm-by-csv/", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setIsUploading(false);
                navigate("/room-code");
            } else {
                console.error(response);
                alert("Failed to upload file. Please try again.");
                setIsUploading(false);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("An error occurred while uploading the file.");
            setIsUploading(false);
        }
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
        </div>
    );
}

export default UploadCsvPage;
