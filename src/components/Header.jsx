import React from "react";
import "./Header.css"; // For styling

function Header() {
    return (
        <header className="header">
            <div className="logo-container">
                <img src="/logo.png"  className="logo" />
                <h1 className="title">Mixed Reality Board Game -Teacher</h1>
            </div>
        </header>
    );
}

export default Header;