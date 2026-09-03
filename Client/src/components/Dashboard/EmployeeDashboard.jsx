import {
  ArrowRightIcon,
  CalendarIcon,
  DollarSignIcon,
  FileTextIcon,
} from "lucide-react";
import { useAppContext } from "../../context/appContext";
import { Link } from "react-router-dom";
import PageHeader from "../PageHeader";
import StatsCard from "../StatsCard";

const EmployeeDashboard = ({ data }) => {
  const emp = data.employee;
  const { CURRENCY } = useAppContext();

  const cards = [
    {
      icon: CalendarIcon,
      value: data.currentMonthAttendance,
      title: "Days Present",
      subtitle: "This Month",
    },
    {
      icon: FileTextIcon,
      value: data.pendingLeaves,
      title: "Pending Leaves",
      subtitle: "Awaiting approval",
    },
    {
      icon: DollarSignIcon,
      value: data.latestPayslip
        ? `${CURRENCY} ${data.latestPayslip.netSalary?.toLocaleString()}`
        : "N/A",
      title: "Latest Payslip",
      subtitle: "Most recent payout",
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title={`Welcome, ${emp?.firstName}!`}
        subtitle={`${emp?.position} - ${emp?.department || "No Department"}`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
        {cards.map((card, index) => (
          <StatsCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/attendance"
          className="bg-linear-to-r from-teal-600 to-teal-500 text-white px-5 py-2.5 rounded-md text-sm hover:from-teal-700 hover:to-teal-600 transition-all duration-200 shadow-md shadow-teal-500/25 active:scale-[0.98] text-center inline-flex items-center justify-center gap-2"
        >
          Mark Attendance <ArrowRightIcon className="w-4 h-4" />
        </Link>

        <Link
          to="/leave"
          className="bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-md text-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-center"
        >
          Apply for Leave
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
