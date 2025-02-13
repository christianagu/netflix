import { Link } from "react-router-dom";

const Navbar = () => {
    const isAuthenticated = !!localStorage.getItem("token");
    
    return (
        <nav className="p-4 bg-black text-white flex gap-4">
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/settings">Settings</Link>
        </nav>
    );
};

export default Navbar;
