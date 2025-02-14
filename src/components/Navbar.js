import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token on logout
        navigate("/login"); // Redirect to login
    };

    return (
        <nav className="p-4 bg-black text-white flex gap-4">
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>

            {!isAuthenticated ? (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            ) : (
                <>
                    <Link to="/settings">Settings</Link>
                    <button onClick={handleLogout} className="text-red-500">Logout</button>
                </>
            )}
        </nav>
    );
};

export default Navbar;
