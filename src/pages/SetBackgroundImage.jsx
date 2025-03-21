import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiFetch } from "../api.js";
import "../styles/SetBackgroundImage.css";

function SetBackgroundImage() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);

    const [imageUrl1, setImageUrl1] = useState("");
    const [imageUrl2, setImageUrl2] = useState("");
    const [isLoading1, setIsLoading1] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [isConfirmed1, setIsConfirmed1] = useState(false);
    const [isConfirmed2, setIsConfirmed2] = useState(false);
    const [ageGroup, setAgeGroup] = useState(params.get("ageGroup") || "");
    const [subject, setSubject] = useState(params.get("subject") || "");

    useEffect(() => {
        setIsConfirmed1(false);
        setIsConfirmed2(false);
        setImageUrl1("");
        setImageUrl2("");
    }, [ageGroup, subject]);

    const handleGenerateImage = async (endpoint, setImageUrl, setLoading) => {
        if (!ageGroup || !subject) {
            alert("Please select age group and subject first.");
            return;
        }

        setLoading(true);

        try {
            const response = await apiFetch(`${endpoint}?ageGroup=${ageGroup}&subject=${subject}`);

            if (response.ok) {
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                setImageUrl(imageUrl);
            } else {
                alert("Failed to generate image.");
            }
        } catch (error) {
            console.error("Generation error:", error);
            alert("Error occurred during image generation.");
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmImage = async (imageUrl, apiEndpoint, setIsConfirmed) => {
        try {
            const blob = await (await fetch(imageUrl)).blob();
            const formData = new FormData();
            formData.append("file", blob, "background-image.png");

            const confirmResponse = await apiFetch(apiEndpoint, {
                method: "POST",
                body: formData,
            });

            if (confirmResponse.ok) {
                setIsConfirmed(true);
            } else {
                alert("Failed to confirm image.");
            }
        } catch (error) {
            console.error("Confirmation error:", error);
            alert("Error occurred during image confirmation.");
        }
    };

    const handleNavigate = () => {
        if (isConfirmed1 && isConfirmed2) {
            navigate("/settings");
        } else {
            alert("Please confirm both images before proceeding.");
        }
    };

    return (
        <div className="image-page">
            <h1 className="heading">Step 2 - Generate Background Image</h1>
            <h2>Background Image Generator</h2>

            <div className="selectors">
                <label className="container">
                    Age Group:
                    <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}>
                        <option value="">Select Age Group</option>
                        <option value="7-9">7-9 years</option>
                        <option value="10-12">10-12 years</option>
                        <option value="13-15">13-15 years</option>
                        <option value="16-18">16-18 years</option>
                    </select>
                </label>

                <label className="container">
                    Subject:
                    <select value={subject} onChange={(e) => setSubject(e.target.value)}>
                        <option value="">Select Subject</option>
                        <option value="History">History</option>
                        <option value="English">English</option>
                        <option value="French">French</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Business">Business</option>
                        <option value="Economics">Economics</option>
                    </select>
                </label>
            </div>

            <button
                onClick={() => handleGenerateImage("/ai/generate-background-image/", setImageUrl1, setIsLoading1)}
                disabled={isLoading1 || imageUrl1}
                className="generate-button"
            >
                {isLoading1 ? "Generating..." : "Generate board background image image"}
            </button>

            <button
                onClick={() => handleGenerateImage("/ai/generate-quiz-background-image/", setImageUrl2, setIsLoading2)}
                disabled={isLoading2 || !imageUrl1}
                className="generate-button"
            >
                {isLoading2 ? "Generating..." : "Generate quiz panel background image"}
            </button>

            <div className="image-container">
                {imageUrl1 && (
                    <div className="image-wrapper">
                        <img src={imageUrl1} alt="Generated 1" className="generated-image" />
                        <button
                            onClick={() => handleConfirmImage(imageUrl1, "/config/confirm-background/", setIsConfirmed1)}
                            className="confirm-button"
                            disabled={isConfirmed1}
                        >
                            {isConfirmed1 ? "Confirmed" : "Confirm board background image"}
                        </button>
                    </div>
                )}

                {imageUrl2 && (
                    <div className="image-wrapper">
                        <img src={imageUrl2} alt="Generated 2" className="generated-image" />
                        <button
                            onClick={() => handleConfirmImage(imageUrl2, "/config/confirm-quiz-background/", setIsConfirmed2)}
                            className="confirm-button"
                            disabled={isConfirmed2}
                        >
                            {isConfirmed2 ? "Confirmed" : "Confirm quiz panel background image"}
                        </button>
                    </div>
                )}
            </div>

            <button
                onClick={handleNavigate}
                className="navigate-button"
                disabled={!(isConfirmed1 && isConfirmed2)}
            >
                Go to Next Page
            </button>
        </div>
    );
}

export default SetBackgroundImage;