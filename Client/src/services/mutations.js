// Client / src / services / mutations.js
import toast from "react-hot-toast";
import API_ROUTES from "../api/api_route";
import api from "../api/axios";

/* -------- Login User -------- */
export const loginUserService = async (payload) => {
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

/* -------- Create Employee -------- */
export const createEmployeeService = async (payload) => {
  try {
    const { data } = await api.post(API_ROUTES.EMPLOYEES.BASE, payload);

    console.log("Create Employee API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Create Employee Success:", data?.message);
    } else {
      toast(data?.message || "Create employee with warning");
      console.warn(
        "Create Employee Warning:",
        data?.message || "Create Employee Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
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

    console.log("Update Employee API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Update Employee Success:", data?.message);
    } else {
      toast(data?.message || "Update employee with warning");
      console.warn(
        "Update Employee Warning:",
        data?.message || "Update Employee Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Update Employee Error:", error);

    throw error;
  }
};

/* -------- Delete Employee -------- */
export const deleteEmployeeService = async (id) => {
  try {
    const { data } = await api.delete(`${API_ROUTES.EMPLOYEES.BASE}/${id}`);

    console.log("Delete Employee API Response:", data);

    if (data?.success) {
      toast.success(data?.message);
      console.log("Delete Employee Success:", data?.message);
    } else {
      toast(data?.message || "Delete employee with warning");
      console.warn(
        "Delete Employee Warning:",
        data?.message || "Delete Employee Warning",
      );
    }

    return data;
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.error("Delete Employee Error:", error);

    throw error;
  }
};
