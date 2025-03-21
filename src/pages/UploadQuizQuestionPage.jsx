import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/UploadQuizQuestionPage.css";
import { apiFetch } from "../api.js";

function UploadQuizQuestionPage() {
    const [file, setFile] = useState(null);
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

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const jsonData = JSON.parse(event.target.result);
                const response = await apiFetch("/config/confirm-questions/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(
                        {
                            questions: jsonData,
                        }
                    ),
                });

                if (response.ok) {
                    setIsUploading(false);
                    navigate("/background-image");
                } else {
                    console.error(response);
                    alert("Failed to upload file. Please try again.");
                    setIsUploading(false);
                }
            } catch (error) {
                console.error("Error reading or uploading file:", error);
                alert("An error occurred while reading or uploading the file.");
                setIsUploading(false);
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="upload-page">
            <div className="upload-container">
                <h1>Upload Your JSON File</h1>
                <p>Upload a JSON file to start the game setup</p>

                <form onSubmit={handleUpload} className="upload-form">
                    {/* File Upload Section */}
                    <div className="file-upload-box">
                        <label className="file-upload-label">
                            {file ? file.name : "Drag or Browse to select a JSON file"}
                            <input
                                type="file"
                                className="file-input"
                                onChange={handleFileChange}
                                accept=".json"
                                required
                            />
                        </label>
                    </div>

                    <button type="submit" className="upload-button" disabled={isUploading}>
                        {isUploading ? "Uploading..." : "Upload File"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UploadQuizQuestionPage;