// Client / src / services / mutations.js
import toast from "react-hot-toast";
import API_ROUTES from "../api/api_route";
import api from "../api/axios";

/* -------- Login User -------- */
export const loginUser = async (payload) => {
  try {
    const { data } = await api.post(API_ROUTES.AUTH.LOGIN, payload);

    console.log("Login User API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Login User Success:", data?.message);
    } else {
      toast(data?.message || "Login user with warning");
      console.warn(
        "Login User Warning:",
        data?.message || "Login User Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Login Error:", error);

    throw error;
  }
};
