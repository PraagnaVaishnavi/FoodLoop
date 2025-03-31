import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, signupUser, logoutUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const signup = async (name, email, password, role, navigate) => {
    const response = await signupUser(name, email, password, role);
    console.log(response);
    if (response.success) {
      navigate("/login"); // Redirect to login page after signup
      return true;
    }
    return false;
  };

  const login = async (email, password) => {
    const response = await loginUser(email, password);
    if (response.token) {
      setToken(response.token);
      localStorage.setItem("token", response.token);
      setUser(response.user);
      return true;
    }
    return false;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
