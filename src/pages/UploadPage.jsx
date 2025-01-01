import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadPage() {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = () => {
        if (file) {
            console.log("Spreadsheet uploaded:", file.name); // Process file
            navigate("/settings");
        } else {
            alert("Please upload a spreadsheet file.");
        }
    };

    return (
        <div>
            <h1>Upload Your Question Spreadsheet</h1>
            <input type="file" onChange={handleFileUpload} />
            <button onClick={handleSubmit}>Next</button>
        </div>
    );
}

export default UploadPage;
