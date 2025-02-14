import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white text-center p-4 mt-4">
            <p>&copy; {new Date().getFullYear()} Netflix Clone. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
