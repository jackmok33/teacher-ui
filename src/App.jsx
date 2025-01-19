import "react";
import Header from "./components/Header"; // Adjust the path as necessary
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadCsvPage from "./pages/UploadCsvPage"
import UploadImagePage from "./pages/UploadImagePage"
import SettingsPage from "./pages/SettingsPage";
import RoomCodePage from "./pages/RoomCodePage";
import TeamsPage from "./pages/TeamsPage.jsx";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/upload-csv" element={<UploadCsvPage />} />
                <Route path="/upload-image" element={<UploadImagePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/room-code" element={<RoomCodePage />} />
                <Route path="/teams" element={<TeamsPage />} />
            </Routes>
        </Router>
    );
}

export default App;
