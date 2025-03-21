import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Header.css"; // For styling

function Header() {
    return (
        <header className="header">
            <Link to="/" className="logo-container"> {/* Wrap the content in a Link */}
                <img src="/logo.png" className="logo" alt="Logo" />
                <h1 className="title">Classroom Explorer - Teacher Dashboard</h1>
            </Link>
        </header>
    );
}

export default Header;