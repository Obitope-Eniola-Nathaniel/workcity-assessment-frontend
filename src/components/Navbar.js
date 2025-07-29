import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center container mx-auto">
        <Link to="/" className="text-xl font-bold">
          Workcity App
        </Link>

        <div className="flex gap-4">
          {user ? (
            <>
              <Link to="/clients" className="hover:underline">
                Clients
              </Link>
              <Link to="/projects" className="hover:underline">
                Projects
              </Link>
              <button onClick={logout} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/signup" className="hover:underline">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
