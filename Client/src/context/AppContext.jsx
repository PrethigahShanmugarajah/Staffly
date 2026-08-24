// Client / src / context / AppContext.jsx
import { useNavigate } from "react-router-dom";
import { AppContext } from "./appContext";

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const CURRENCY = import.meta.env.VITE_CURRENCY;

  const value = { navigate, CURRENCY };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
