import toast from "react-hot-toast";
import API_ROUTES from "../api/api_route";
import api from "../api/axios";

/* -------- Login User -------- */
export const loginUserService = async (payload) => {
  try {
    const { data } = await api.post(API_ROUTES.AUTH.LOGIN, payload);

    if (data?.success) {
      toast.success(data?.message);
    } else {
      toast(data?.message || "Login user with warning");
      console.warn(
        "Login User Warning:",
        data?.message || "Login User Warning",
      );
      return null;
    }

    return data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message || error?.message || "Failed to login",
    );
    console.error("Login Error:", error);

    throw error;
  }
};

/* -------- Create Employee -------- */
export const createEmployeeService = async (payload) => {
  try {
    const { data } = await api.post(API_ROUTES.EMPLOYEES.BASE, payload);

    if (data?.success) {
      toast.success(data?.message);
    } else {
      toast(data?.message || "Create employee with warning");
      console.warn(
        "Create Employee Warning:",
        data?.message || "Create Employee Warning",
      );
      return null;
    }

    return data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to create employee",
    );
    console.error("Create Employee Error:", error);

    throw error;
  }
};

/* -------- Update Employee -------- */
export const updateEmployeeService = async (id, payload) => {
  try {
    const { data } = await api.put(
      `${API_ROUTES.EMPLOYEES.BASE}/${id}`,
      payload,
    );

    if (data?.success) {
      toast.success(data?.message);
    } else {
      toast(data?.message || "Update employee with warning");
      console.warn(
        "Update Employee Warning:",
        data?.message || "Update Employee Warning",
      );
      return null;
    }

    return data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to update employee",
    );
    console.error("Update Employee Error:", error);

    throw error;
  }
};

/* -------- Delete Employee -------- */
export const deleteEmployeeService = async (id) => {
  try {
    const { data } = await api.delete(`${API_ROUTES.EMPLOYEES.BASE}/${id}`);

    if (data?.success) {
      toast.success(data?.message);
    } else {
      toast(data?.message || "Delete employee with warning");
      console.warn(
        "Delete Employee Warning:",
        data?.message || "Delete Employee Warning",
      );
      return null;
    }

    return data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to delete employee",
    );
    console.error("Delete Employee Error:", error);

    throw error;
  }
};

/* -------- Create Leave Application -------- */
export const createLeaveApplicationService = async (payload) => {
  try {
    const { data } = await api.post(API_ROUTES.LEAVE_APPLICATION.BASE, payload);

    if (data?.success) {
      toast.success(data?.message);
    } else {
      toast(data?.message || "Create leave application with warning");
      console.warn(
        "Create Leave Application Warning:",
        data?.message || "Create Leave Application Warning",
      );
      return null;
    }

    return data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to create leave application",
    );
    console.error("Create Leave Application Error:", error);

    throw error;
  }
};

/* -------- Update Leave Application Status -------- */
export const updateLeaveApplicationStatusService = async (id, payload) => {
  try {
    const { data } = await api.patch(
      `${API_ROUTES.LEAVE_APPLICATION.BASE}/${id}`,
      payload,
    );

    if (data?.success) {
      toast.success(data?.message);
    } else {
      toast(data?.message || "Update leave application status with warning");
      console.warn(
        "Update Leave Application Status Warning:",
        data?.message || "Update Leave Application Status Warning",
      );
      return null;
    }

    return data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to update leave application status",
    );
    console.error("Update Leave Application Status Error:", error);

    throw error;
  }
};

/* -------- Clock In/Out Employee -------- */
export const clockInOutService = async () => {
  try {
    const { data } = await api.post(API_ROUTES.ATTENDANCE.BASE);

    if (data?.success) {
      toast.success(data?.message);
    } else {
      toast(data?.message || "Clock in/out employee with warning");
      console.warn(
        "Clock In/Out Employee Warning:",
        data?.message || "Clock In/Out Employee Warning",
      );
      return null;
    }

    return data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to clock in/out employee",
    );
    console.error("Clock In/Out Employee Error:", error);

    throw error;
  }
};

/* -------- Create Payslip -------- */
export const createPayslipService = async (payload) => {
  try {
    const { data } = await api.post(API_ROUTES.PAYSLIPS.BASE, payload);

    if (data?.success) {
      toast.success(data?.message);
    } else {
      toast(data?.message || "Create payslip with warning");
      console.warn(
        "Create Payslip Warning:",
        data?.message || "Create Payslip Warning",
      );
      return null;
    }

    return data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to create payslip",
    );
    console.error("Create Payslip Error:", error);

    throw error;
  }
};

/* -------- Update Profile -------- */
export const updateProfileService = async (payload) => {
  try {
    const { data } = await api.put(API_ROUTES.PROFILE.BASE, payload);

    if (data?.success) {
      toast.success(data?.message);
    } else {
      toast(data?.message || "Update profile with warning");
      console.warn(
        "Update Profile Warning:",
        data?.message || "Update Profile Warning",
      );
      return null;
    }

    return data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to update profile",
    );
    console.error("Update Profile Error:", error);

    throw error;
  }
};

/* -------- Change Password -------- */
export const changePasswordService = async (payload) => {
  try {
    const { data } = await api.put(API_ROUTES.AUTH.CHANGE_PASSWORD, payload);

    if (data?.success) {
      toast.success(data?.message);
    } else {
      toast(data?.message || "Change password with warning");
      console.warn(
        "Change Password Warning:",
        data?.message || "Change Password Warning",
      );
      return null;
    }

    return data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error?.message ||
        "Failed to change password",
    );
    console.error("Change Password Error:", error);

    throw error;
  }
};
