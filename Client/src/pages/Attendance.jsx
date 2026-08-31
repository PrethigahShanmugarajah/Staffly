// Client / src / pages / Attendance.jsx
import { useCallback, useEffect, useState } from "react";
import Loading from "../components/Loading";
import CheckInButton from "../components/Attendance/CheckInButton";
import AttendanceStats from "../components/Attendance/AttendanceStats";
import AttendanceHistory from "../components/Attendance/AttendanceHistory";
import PageHeader from "../components/PageHeader";
import { fetchAttendanceService } from "../services/fetch";

const Attendance = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  // const fetchData = useCallback(async () => {
  //   try {
  //     const res = await api.get("/api/attendance");
  //     const json = res.data;
  //     setHistory(json.data || []);
  //     if (json.employee?.isDeleted) setIsDeleted(true);
  //   } catch (error) {
  //     toast.error(error?.response?.data?.error || error?.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchAttendanceService();

      setHistory(data.data || []);
      if (data.employee?.isDeleted) setIsDeleted(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loading size="xl" />;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayRecord = history.find(
    (r) => new Date(r.date).toDateString() === today.toDateString(),
  );

  return (
    <div className="animate-fade-in">
      {/* <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-900 tracking-tight">
          Attendance
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Track your work hours and daily check-ins
        </p>
      </div> */}

      <PageHeader
        title="Attendance"
        subtitle="Track your work hours and daily check-ins"
      />

      {isDeleted ? (
        <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl text-center">
          <p className="text-red-600">
            You can no longer clock in or out because your employee records have
            been marked as deleted.
          </p>
        </div>
      ) : (
        <div className="mb-8">
          <CheckInButton todayRecord={todayRecord} onAction={fetchData} />
        </div>
      )}

      <AttendanceStats history={history} />

      <AttendanceHistory history={history} />
    </div>
  );
};

export default Attendance;
