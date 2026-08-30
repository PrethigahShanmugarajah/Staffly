// Client / src / context / AppContext.jsx
import { useNavigate } from "react-router-dom";
import { AppContext } from "./appContext";
import { useEffect, useState } from "react";
import { fetchSessionService } from "../services/fetch";
import { loginUser } from "../services/mutations";

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const CURRENCY = import.meta.env.VITE_CURRENCY;

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  const refreshSession = async () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setUser(null);
      setToken(null);
      setLoading(false);
      return;
    }

    try {
      const data = await fetchSessionService(storedToken);
      setUser(data.user);
    } catch {
      /* -------- Token is invalid, clear it -------- */
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshSession();
  }, []);

  const login = async (email, password, role_type) => {
    const data = await loginUser({
      email,
      password,
      role_type,
    });

    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const value = {
    navigate,
    CURRENCY,
    user,
    setUser,
    token,
    setToken,
    loading,
    setLoading,
    refreshSession,
    login,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
