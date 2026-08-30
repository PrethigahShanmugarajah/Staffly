// Client / src / context / AuthContext.jsx
import { createContext, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) throw Error("useAuth must be used within AuthProvider");

  return ctx;
};
