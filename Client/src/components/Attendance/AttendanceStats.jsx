import { AlertCircleIcon, CalendarIcon, ClockIcon } from "lucide-react";
import StatsCard from "../StatsCard";

const AttendanceStats = ({ history }) => {
  const totalPresent = history.filter(
    (h) => (h.status === "PRESENT") | (h.status === "LATE"),
  ).length;

  const totalLate = history.filter((h) => h.status === "LATE").length;

  const stats = [
    { title: "Days Present", value: totalPresent, icon: CalendarIcon },
    { title: "Late Arrivals", value: totalLate, icon: AlertCircleIcon },
    { title: "Avg. Work Hrs", value: "8.5", suffix: "Hrs", icon: ClockIcon },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8 cursor-pointer">
      {stats.map((s) => (
        <StatsCard
          key={s.title}
          title={s.title}
          value={s.value}
          suffix={s.suffix}
          icon={s.icon}
        />
      ))}
    </div>
  );
};

export default AttendanceStats;
