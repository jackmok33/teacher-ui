import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiFetch } from "../api.js";
import "../styles/SetBackgroundImage.css";

function SetBackgroundImage() {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const [imageUrl, setImageUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [ageGroup, setAgeGroup] = useState(params.get("ageGroup") || "");
    const [topic, setTopic] = useState(params.get("topic") || "");

    const handleGenerateImage = async () => {
        setIsLoading(true);

        try {
            const response = await apiFetch(`/ai/generate-image/?ageGroup=${ageGroup}&topic=${topic}`, {
                method: "GET",
            });

            if (response.ok) {
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                setImageUrl(imageUrl);
            } else {
                console.error(response);
                alert("Failed to generate image. Please try again.");
            }
        } catch (error) {
            console.error("Error generating image:", error);
            alert("An error occurred while generating image.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmImage = async () => {
        if (!imageUrl) {
            alert("No image to confirm.");
            return;
        }

        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const formData = new FormData();
            formData.append("file", blob, "background-image.png");

            const confirmResponse = await apiFetch("/config/confirm-background/", {
                method: "POST",
                body: formData,
            });

            if (confirmResponse.ok) {
                navigate("/room-code");
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
            <h1 className="title">Generated Image</h1>
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
                    Topic:
                    <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                        <option value="">Select Topic</option>
                        <option value="History">History</option>
                        <option value="English">English</option>
                        <option value="French">French</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Business">Business</option>
                        <option value="Economics">Economics</option>
                    </select>
                </label>
            </div>
            <button onClick={handleGenerateImage} disabled={isLoading} className="generate-button">
                {isLoading ? "Generating..." : "Generate Image"}
            </button>
            {imageUrl && (
                <>
                    <img src={imageUrl} alt="Generated" className="generated-image" />
                    <button onClick={handleConfirmImage} className="confirm-button">
                        Confirm Image
                    </button>
                </>
            )}
        </div>
    );
}

export default SetBackgroundImage;