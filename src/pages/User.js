// src/pages/User.js
import React, { useEffect, useState } from "react";
import { getUserData } from "../services/userService";
import UserCardSettings from "../components/UserCardSettings";

const User = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserData()
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user data", error));
  }, []);

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div>
      <h1>User Dashboard</h1>
      <UserCardSettings user={user} />
    </div>
  );
};

export default User;
