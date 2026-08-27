// Client / src / components / Attendance / AttendanceStats.jsx
import { AlertCircleIcon, CalendarIcon, ClockIcon } from "lucide-react";

const AttendanceStats = ({ history }) => {
  const totalPresent = history.filter(
    (h) => (h.status === "PRESENT") | (h.status === "LATE"),
  ).length;

  const totalLate = history.filter((h) => h.status === "LATE").length;

  const stats = [
    { label: "Days Present", value: totalPresent, icon: CalendarIcon },
    { label: "Late Arrivals", value: totalLate, icon: AlertCircleIcon },
    { label: "Avg. Work Hrs", value: "8.5 Hrs", icon: ClockIcon },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8 cursor-pointer">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white rounded-lg border border-gray-200/70 hover:-translate-y-0.5 transition-all duration-300 p-5 sm:p-6 flex items-center gap-4 relative overflow-hidden group"
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-gray-500/10 group-hover:bg-teal-500/70" />

          <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-teal-50 transition-colors duration-200">
            <s.icon className="w-5 h-5 text-gray-600 group-hover:text-teal-600 transition-colors duration-200" />
          </div>

          <div>
            <p className="text-sm text-gray-500">{s.label}</p>

            <p className="text-2xl font-medium text-gray-900 tracking-tight">
              {s.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceStats;
