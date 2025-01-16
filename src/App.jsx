import "react";
import Header from "./components/Header"; // Adjust the path as necessary
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadCsvPage from "./pages/UploadCsvPage.jsx"
import UploadImagePage from "./pages/UploadImagePage.jsx"
import SettingsPage from "./pages/SettingsPage";
import RoomCodePage from "./pages/RoomCodePage";

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
            </Routes>
        </Router>
    );
}

export default App;
