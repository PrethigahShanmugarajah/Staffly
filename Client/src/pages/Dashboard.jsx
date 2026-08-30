// Client / src / pages / Dashboard.jsx
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import AdminDashboard from "../components/Dashboard/AdminDashboard";
import EmployeeDashboard from "../components/Dashboard/EmployeeDashboard";
import { fetchDashboardService } from "../services/fetch";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   api
  //     .get("/api/dashboard")
  //     .then((res) => setData(res.data))
  //     .catch((err) => toast.error(err.response?.data?.error || err?.message))
  //     .finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
    fetchDashboardService()
      .then((data) => setData(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading size="xl" />;

  if (!data)
    return (
      <p className="text-center text-slate-500 py-12">
        Failed to load dashboard
      </p>
    );

  if (data.role === "ADMIN") {
    return <AdminDashboard data={data} />;
  } else {
    return <EmployeeDashboard data={data} />;
  }
};

export default Dashboard;
