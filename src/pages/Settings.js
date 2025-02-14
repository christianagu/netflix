import React, { useEffect, useState } from "react";
import UserCardSettings from "../components/UserCardSettings";
import { fetchCurrentUser } from "../services/userService";

const Settings = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await fetchCurrentUser();
                setUser(response.data);
            } catch (err) {
                setError("Error fetching user data");
            }
        };

        loadUser();
    }, []);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!user) {
        return <p className="text-gray-500">Loading user data...</p>;
    }

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-semibold">Settings</h1>
            <UserCardSettings user={user} />
        </div>
    );
};

export default Settings;
