import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.admin; // Returns true or false
  } catch (error) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Check if token is expired
  const isTokenValid = (token) => {
    if (!token) return false;
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded.exp * 1000 > Date.now(); // Check expiration
    } catch (error) {
      return false;
    }
  };

  // Set token and store in localStorage
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // Remove token
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // Auto logout if token expires
  useEffect(() => {
    if (token && !isTokenValid(token)) {
      logout();
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        isAuthenticated: isTokenValid(token),
        isAdmin: getUserRole(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
