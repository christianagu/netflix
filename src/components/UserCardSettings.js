import React, { useState } from "react";
import { updateUserSettings } from "../services/userService";

const UserCardSettings = ({ user }) => {
    const [apiToken, setApiToken] = useState(user.apiToken);

    const handleSave = () => {
        updateUserSettings(user.id, { apiToken })
            .then(() => alert("Settings updated"))
            .catch(() => alert("Error updating settings"));
    };

    return (
        <div>
            <h2>User Settings</h2>
            <div>
                <label>API Token</label>
                <input
                    type="text"
                    value={apiToken}
                    onChange={(e) => setApiToken(e.target.value)}
                />
            </div>
            <button onClick={handleSave}>Save Settings</button>
        </div>
    );
};

export default UserCardSettings;
