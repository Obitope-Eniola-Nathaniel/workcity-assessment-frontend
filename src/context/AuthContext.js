import { createContext, useState, useEffect } from "react";

// Create context
export const AuthContext = createContext();

// Provider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // you can store role/email here
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // If token exists in localStorage, pretend user is logged in
  useEffect(() => {
    if (token) {
      const payload = parseJwt(token);
      setUser({
        email: payload.email,
        role: payload.role,
      });
    }
  }, [token]);

  // Decode JWT to extract user info
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (err) {
      return {};
    }
  };

  // Login handler
  const login = (jwt) => {
    localStorage.setItem("token", jwt);
    const payload = parseJwt(jwt);
    setToken(jwt);
    setUser({
      email: payload.email,
      role: payload.role,
    });
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
