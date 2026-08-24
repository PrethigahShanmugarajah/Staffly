// Client / src / assets / assets.js
import Logo from "./Logo.png";

export { Logo };

export const dummyProfileData = {
  _id: "69b411e6f8a807df391d7b13",
  firstName: "Sathya",
  lastName: "Priya",
  email: "sathyapriya@example.com",
  image: null,
};

export const dummyEmployeeDashboardData = {
  currentMonthAttendance: 20,
  pendingLeaves: 2,
  latestPayslip: {
    netSalary: 2000,
  },

  employee: {
    firstName: "Sathya",
    lastName: "Priya",
    position: "Software Engineer",
    department: "Engineering",
  },
};

export const dummyAdminDashboardData = {
  role: "ADMIN",
  totalEmployees: 3,
  totalDepartments: 10,
  todayAttendance: 1,
  pendingLeaves: 1,
};
