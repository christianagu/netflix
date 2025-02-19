import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"; // already fixed above
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import UserCardSettings from "./components/UserCardSettings";
import Layout from "./components/Layout";
import React, { useState } from 'react';
import { UserProvider } from './context/UserContext';
import './assets/css/global.css';

// Set up Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Your GraphQL API URL
  cache: new InMemoryCache(),
});

const PrivateRoute = ({ element }) => {
  return localStorage.getItem("token") ? element : <Navigate to="/login" replace />;
};

function App() {
  const [user, setUser] = useState({
    username: 'john_doe',
    email: 'john.doe@example.com',
    imageUrl: 'https://example.com/path/to/avatar.jpg',
  });

  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <Router>
          <Routes>
            {/* Layout wraps all main pages */}
            <Route path="/" element={<Layout user={user} />}>
              <Route index element={<Home />} />
              <Route path="movies" element={<Movies />} />
              <Route path="settings" element={<PrivateRoute element={<Settings />} />} />
          </Route>

            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;
