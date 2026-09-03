import {
  Building2Icon,
  CalendarIcon,
  FileTextIcon,
  UsersIcon,
} from "lucide-react";
import PageHeader from "../PageHeader";
import StatsCard from "../StatsCard";

const AdminDashboard = ({ data }) => {
  const stats = [
    {
      icon: UsersIcon,
      value: data.totalEmployees,
      label: "Total Employees",
      description: "Active workforce",
    },
    {
      icon: Building2Icon,
      value: data.totalDepartments,
      label: "Departments",
      description: "Organization units",
    },
    {
      icon: CalendarIcon,
      value: data.todayAttendance,
      label: "Today's Attendance",
      description: "Checked in today",
    },
    {
      icon: FileTextIcon,
      value: data.pendingLeaves,
      label: "Pending Leaves",
      description: "Awaiting approval",
    },
  ];
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back, Admin - here's your overview"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
        {stats.map((s) => (
          <StatsCard
            key={s.label}
            title={s.label}
            value={s.value}
            icon={s.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
