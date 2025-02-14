import React, { useState } from "react";
import { updateUserSettings } from "../services/userService";

const UserCardSettings = ({ user }) => {
    const [apiToken, setApiToken] = useState(user.apitoken || "");

    const handleSave = async () => {
        try {
            await updateUserSettings(user.id, { apitoken: apiToken });  // Ensure `id` is correctly sent
            alert("Settings updated");
        } catch (error) {
            alert("Error updating settings");
            console.error(error);
        }
    };

    return (
        <div className="bg-white p-6 shadow-md rounded">
            <h2 className="text-xl font-semibold mb-4">User Settings</h2>
            <div className="mb-4">
                <label className="block text-gray-700">API Token</label>
                <input
                    type="text"
                    value={apiToken}
                    onChange={(e) => setApiToken(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>
            <button
                onClick={handleSave}
                className="bg-blue-500 text-white p-2 rounded"
            >
                Save Settings
            </button>
        </div>
    );
};

export default UserCardSettings;
