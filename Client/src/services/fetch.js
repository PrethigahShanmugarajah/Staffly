// Client / src / services / fetch.js
import toast from "react-hot-toast";
import API_ROUTES from "../api/api_route";
import api from "../api/axios";

/* -------- Fetch Session  -------- */
export const fetchSession = async () => {
  try {
    const { data } = await api.get(API_ROUTES.AUTH.SESSION);

    console.log("Fetch Session API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Fetch Session Success:", data?.message);
    } else {
      toast(data?.message || "Fetch session with warning");
      console.warn(
        "Fetch Session Warning:",
        data?.message || "Fetch Session Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Fetch Session Error:", error);

    throw error;
  }
};

/* -------- Fetch Profile  -------- */
export const fetchProfile = async () => {
  try {
    const { data } = await api.get(API_ROUTES.PROFILE.SESSION);

    console.log("Fetch Profile API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Fetch Profile Success:", data?.message);
    } else {
      toast(data?.message || "Fetch profile with warning");
      console.warn(
        "Fetch Profile Warning:",
        data?.message || "Fetch Profile Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Fetch Profile Error:", error);

    throw error;
  }
};
