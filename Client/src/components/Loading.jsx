// Client / src / components / Loading.jsx
import { useEffect } from "react";
import { useAppContext } from "../context/appContext";

const SIZE_CONFIG = {
  xxs: "h-3 w-3 border-t-2",
  xs: "h-4 w-4 border-t-2",
  s: "h-6 w-6 border-t-2",
  m: "h-10 w-10 border-t-3",
  l: "h-14 w-14 border-t-4",
  xl: "h-20 w-20 border-t-4",
  xxl: "h-24 w-24 border-t-4",
};

const Loading = ({ nextUrl, delay = 3000, size = "m", fullScreen = false }) => {
  const { navigate } = useAppContext();

  useEffect(() => {
    if (nextUrl) {
      const timer = setTimeout(() => {
        navigate(nextUrl);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [nextUrl, delay, navigate]);

  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "h-screen" : "h-[80vh]"
      }`}
    >
      <div
        className={`animate-spin rounded-full ${SIZE_CONFIG[size]} border-teal-900 border-solid`}
      ></div>
    </div>
  );
};

export default Loading;
