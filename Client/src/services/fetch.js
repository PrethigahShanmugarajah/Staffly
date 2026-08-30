// Client / src / services / fetch.js
import toast from "react-hot-toast";
import API_ROUTES from "../api/api_route";
import api from "../api/axios";

/* -------- Fetch Session  -------- */
export const fetchSessionService = async () => {
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
export const fetchProfileService = async () => {
  try {
    const { data } = await api.get(API_ROUTES.PROFILE.BASE);

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

/* -------- Fetch Dashboard -------- */
export const fetchDashboardService = async () => {
  try {
    const { data } = await api.get(API_ROUTES.DASHBOARD.BASE);

    console.log("Fetch Dashboard API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Fetch Dashboard Success:", data?.message);
    } else {
      toast(data?.message || "Fetch dashboard with warning");
      console.warn(
        "Fetch Dashboard Warning:",
        data?.message || "Fetch Dashboard Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Fetch Dashboard Error:", error);

    throw error;
  }
};

/* -------- Fetch Employees -------- */
export const fetchEmployeesService = async (selectedDept = "") => {
  try {
    const url = selectedDept
      ? `${API_ROUTES.EMPLOYEES.BASE}?department=${selectedDept}`
      : API_ROUTES.EMPLOYEES.BASE;

    const { data } = await api.get(url);

    console.log("Fetch Employees API Response:", data);

    if (data?.success) {
      // toast.success(data?.message);
      console.log("Fetch Employees Success:", data?.message);
    } else {
      toast(data?.message || "Fetch employees with warning");
      console.warn(
        "Fetch Employees Warning:",
        data?.message || "Fetch Employees Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Fetch Employees Error:", error);

    throw error;
  }
};
