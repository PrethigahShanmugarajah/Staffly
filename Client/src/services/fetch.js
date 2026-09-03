import toast from "react-hot-toast";
import API_ROUTES from "../api/api_route";
import api from "../api/axios";

/* -------- Fetch Session  -------- */
export const fetchSessionService = async () => {
  try {
    const { data } = await api.get(API_ROUTES.AUTH.SESSION);

    if (!data?.success) {
      toast(data?.message || "Fetch session with warning");
      console.warn(
        "Fetch Session Warning:",
        data?.message || "Fetch Session Warning",
      );
      return null;
    }

    return data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch session",
    );
    console.error("Fetch Session Error:", error);

    throw error;
  }
};

/* -------- Fetch Profile  -------- */
export const fetchProfileService = async () => {
  try {
    const { data } = await api.get(API_ROUTES.PROFILE.BASE);

    if (!data?.success) {
      toast(data?.message || "Fetch profile with warning");
      console.warn(
        "Fetch Profile Warning:",
        data?.message || "Fetch Profile Warning",
      );
      return null;
    }

    return data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch profile",
    );
    console.error("Fetch Profile Error:", error);

    throw error;
  }
};

/* -------- Fetch Dashboard -------- */
export const fetchDashboardService = async () => {
  try {
    const { data } = await api.get(API_ROUTES.DASHBOARD.BASE);

    if (!data?.success) {
      toast(data?.message || "Fetch dashboard with warning");
      console.warn(
        "Fetch Dashboard Warning:",
        data?.message || "Fetch Dashboard Warning",
      );
      return null;
    }

    return data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch dashboard",
    );
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

    if (!data?.success) {
      toast(data?.message || "Fetch employees with warning");
      console.warn(
        "Fetch Employees Warning:",
        data?.message || "Fetch Employees Warning",
      );
      return null;
    }

    return data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch employees",
    );
    console.error("Fetch Employees Error:", error);

    throw error;
  }
};

/* -------- Fetch Leave Applications -------- */
export const fetchLeaveApplicationsService = async () => {
  try {
    const { data } = await api.get(API_ROUTES.LEAVE_APPLICATION.BASE);

    if (!data?.success) {
      toast(data?.message || "Fetch leave applications with warning");
      console.warn(
        "Fetch Leave Applications Warning:",
        data?.message || "Fetch Leave Applications Warning",
      );
      return null;
    }

    return data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch leave applications",
    );
    console.error("Fetch Leave Applications Error:", error);

    throw error;
  }
};

/* -------- Fetch Attendance -------- */
export const fetchAttendanceService = async () => {
  try {
    const { data } = await api.get(API_ROUTES.ATTENDANCE.BASE);

    if (!data?.success) {
      toast(data?.message || "Fetch attendance with warning");
      console.warn(
        "Fetch Attendance Warning:",
        data?.message || "Fetch Attendance Warning",
      );
      return null;
    }

    return data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch attendance",
    );
    console.error("Fetch Attendance Error:", error);

    throw error;
  }
};

/* -------- Fetch Payslips -------- */
export const fetchPayslipsService = async () => {
  try {
    const { data } = await api.get(API_ROUTES.PAYSLIPS.BASE);

    if (!data?.success) {
      toast(data?.message || "Fetch payslips with warning");
      console.warn(
        "Fetch Payslips Warning:",
        data?.message || "Fetch Payslips Warning",
      );
      return null;
    }

    return data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch payslips",
    );
    console.error("Fetch Payslips Error:", error);

    throw error;
  }
};

/* -------- Fetch Payslip By ID -------- */
export const fetchPayslipByIDService = async (id) => {
  try {
    const { data } = await api.get(`${API_ROUTES.PAYSLIPS.BASE}/${id}`);

    if (!data?.success) {
      toast(data?.message || "Fetch payslip by ID with warning");
      console.warn(
        "Fetch Payslip By ID Warning:",
        data?.message || "Fetch Payslip By ID Warning",
      );
      return null;
    }

    return data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch payslip by ID",
    );
    console.error("Fetch Payslip By ID Error:", error);

    throw error;
  }
};
