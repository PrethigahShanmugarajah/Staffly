// Client / src / components / Dashboard / EmployeeDashboard.jsx
import {
  ArrowRightIcon,
  CalendarIcon,
  DollarSignIcon,
  FileTextIcon,
} from "lucide-react";
import { useAppContext } from "../../context/appContext";
import { Link } from "react-router-dom";
import DashboardCard from "./DashboardCard";
import PageHeader from "../PageHeader";

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
      {/* <div className="page-header">
        <h1 className="page-title">Welcome, {emp?.firstName}!</h1>

        <p className="page-subtitle">
          {emp?.position} - {emp?.department || "No Department"}
        </p>
      </div> */}

      <PageHeader
        title={`Welcome, ${emp?.firstName}!`}
        subtitle={`${emp?.position} - ${emp?.department || "No Department"}`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
        {/* {cards.map((card, index) => (
          <div
            key={index}
            className="card card-hover p-5 sm:p-6 relative overflow-hidden group flex items-center justify-between"
          >
            <div>
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-gray-500/70 group-hover:bg-teal-500/70" />

              <p className="text-sm font-medium text-gray-700">{card.title}</p>

              <p className="text-2xl font-bold text-gray-900 mt-1">
                {card.value}
              </p>
            </div>

            <card.icon className="size-10 p-2.5 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors duration-200" />
          </div>
        ))} */}

        {cards.map((card, index) => (
          <DashboardCard
            key={index}
            icon={card.icon}
            value={card.value}
            title={card.title}
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/attendance"
          className="btn-primary text-center inline-flex items-center justify-center gap-2"
        >
          Mark Attendance <ArrowRightIcon className="w-4 h-4" />
        </Link>

        <Link to="/leave" className="btn-secondary text-center">
          Apply for Leave
        </Link>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
