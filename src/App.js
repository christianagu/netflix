import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"; // already fixed above
import './App.css'; // Keep this, as it's used for styling
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import UserCardSettings from "./components/UserCardSettings";
import Navbar from "./components/Navbar";
import './assets/css/global.css';

// Set up Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Your GraphQL API URL
  cache: new InMemoryCache(),
});


const PrivateRoute = ({ element }) => {
  return localStorage.getItem("token") ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<Settings />} />
      </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
