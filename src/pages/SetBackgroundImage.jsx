import { useState } from "react";
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

    const handleGenerateImage1 = async () => {
        setIsLoading1(true);

        try {
            const response = await apiFetch(`/ai/generate-background-image/?ageGroup=${ageGroup}&subject=${subject}`, {
                method: "GET",
            });

            if (response.ok) {
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                setImageUrl1(imageUrl);
            } else {
                console.error(response);
                alert("Failed to generate image. Please try again.");
            }
        } catch (error) {
            console.error("Error generating image:", error);
            alert("An error occurred while generating image.");
        } finally {
            setIsLoading1(false);
        }
    };

    const handleGenerateImage2 = async () => {
        setIsLoading2(true);

        try {
            const response = await apiFetch(`/ai/generate-quiz-background-image/?ageGroup=${ageGroup}&subject=${subject}`, {
                method: "GET",
            });

            if (response.ok) {
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                setImageUrl2(imageUrl);
            } else {
                console.error(response);
                alert("Failed to generate image. Please try again.");
            }
        } catch (error) {
            console.error("Error generating image:", error);
            alert("An error occurred while generating image.");
        } finally {
            setIsLoading2(false);
        }
    };

    const handleConfirmImage = async (imageUrl, apiEndpoint, setIsConfirmed) => {
        if (!imageUrl) {
            alert("No image to confirm.");
            return;
        }

        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const formData = new FormData();
            formData.append("file", blob, "background-image.png");

            const confirmResponse = await apiFetch(apiEndpoint, {
                method: "POST",
                body: formData,
            });

            if (confirmResponse.ok) {
                setIsConfirmed(true);
                if (isConfirmed1 && isConfirmed2) {
                    navigate("/settings");
                }
            } else {
                console.error(confirmResponse);
                alert("Failed to confirm image. Please try again.");
            }
        } catch (error) {
            console.error("Error confirming image:", error);
            alert("An error occurred while confirming image.");
        }
    };

    return (
        <div className="image-page">
            <h1 className="title">Generated Images</h1>
            <div className="selectors">
                <label>
                    Age Group:
                    <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}>
                        <option value="">Select Age Group</option>
                        <option value="7-9">7-9 years</option>
                        <option value="10-12">10-12 years</option>
                        <option value="13-15">13-15 years</option>
                        <option value="16-18">16-18 years</option>
                    </select>
                </label>
                <label>
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
            <button onClick={handleGenerateImage1} disabled={isLoading1} className="generate-button">
                {isLoading1 ? "Generating..." : "Generate Image 1"}
            </button>
            <button onClick={handleGenerateImage2} disabled={isLoading2} className="generate-button">
                {isLoading2 ? "Generating..." : "Generate Image 2"}
            </button>
            <div className="image-container">
                {imageUrl1 && (
                    <div className="image-wrapper">
                        <img src={imageUrl1} alt="Generated 1" className="generated-image" />
                        <button onClick={() => handleConfirmImage(imageUrl1, "/config/confirm-background/", setIsConfirmed1)} className="confirm-button">
                            Confirm Image 1
                        </button>
                    </div>
                )}
                {imageUrl2 && (
                    <div className="image-wrapper">
                        <img src={imageUrl2} alt="Generated 2" className="generated-image" />
                        <button onClick={() => handleConfirmImage(imageUrl2, "/config/confirm-quiz-background/", setIsConfirmed2)} className="confirm-button">
                            Confirm Image 2
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SetBackgroundImage;