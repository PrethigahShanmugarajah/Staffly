// Client / src / pages / Leave.jsx
import { useCallback, useEffect, useState } from "react";
import { dummyLeaveData } from "../assets/assets";
import Loading from "../components/Loading";
import {
  PalmtreeIcon,
  PlusIcon,
  ThermometerIcon,
  UmbrellaIcon,
} from "lucide-react";
import LeaveHistory from "../components/Leave/LeaveHistory";
import ApplyLeaveModal from "../components/Leave/ApplyLeaveModal";
import PageHeader from "../components/PageHeader";
import StatsCard from "../components/StatsCard";
import Button from "../components/Button";

const Leave = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isDeleted, setIsDeleted] = useState(false);

  const isAdmin = false;

  const fetchLeaves = useCallback(() => {
    setLeaves(dummyLeaveData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchLeaves();
  }, [fetchLeaves]);

  if (loading) return <Loading size="xl" />;

  const approvedLeaves = leaves.filter((l) => l.status === "APPROVED");
  const sickCount = approvedLeaves.filter((l) => l.type === "SICK").length;
  const casualCount = approvedLeaves.filter((l) => l.type === "CASUAL").length;
  const annalCount = approvedLeaves.filter((l) => l.type === "ANNUAL").length;

  // const leaveStats = [
  //   { label: "Sick Leave", value: sickCount, icon: ThermometerIcon },
  //   { label: "Casual Leave", value: casualCount, icon: UmbrellaIcon },
  //   { label: "Annual Leave", value: annalCount, icon: PalmtreeIcon },
  // ];

  const leaveStats = [
    {
      title: "Sick Leave",
      value: sickCount,
      suffix: "taken",
      icon: ThermometerIcon,
    },
    {
      title: "Casual Leave",
      value: casualCount,
      suffix: "taken",
      icon: UmbrellaIcon,
    },
    {
      title: "Annual Leave",
      value: annalCount,
      suffix: "taken",
      icon: PalmtreeIcon,
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        {/* <div className="mb-8">
          <h1 className="text-2xl font-medium text-gray-900 tracking-tight">
            Leave Management
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            {isAdmin
              ? "Manage leave applications"
              : "Your leave history and requests"}
          </p>
        </div> */}

        <PageHeader
          title="Leave Management"
          subtitle={
            isAdmin
              ? "Manage leave applications"
              : "Your leave history and requests"
          }
        />

        {!isAdmin && !isDeleted && (
          // <button
          //   onClick={() => setShowModal(true)}
          //   className="bg-linear-to-r from-teal-600 to-teal-500 text-white px-5 py-2.5 rounded-md text-sm hover:from-teal-700 hover:to-teal-600 transition-all duration-200 shadow-md shadow-teal-500/25 active:scale-[0.98] flex items-center gap-2 w-full sm:w-auto justify-center"
          // >
          //   <PlusIcon className="w-4 h-4" /> Apply for leave
          // </button>

          <Button
            onClick={() => setShowModal(true)}
            iconLeft={<PlusIcon className="w-4 h-4" />}
            text="Apply for leave"
          />
        )}
      </div>

      {/* {!isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
          {leaveStats.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-lg border border-gray-200/70 hover:-translate-y-0.5 transition-all duration-300 p-5 sm:p-6 flex items-center gap-4 relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-gray-500/70 group-hover:bg-teal-500/70" />

              <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-teal-50 transition-colors duration-200">
                <s.icon className="w-5 h-5 text-gray-600 group-hover:text-teal-600 transition-colors duration-200" />
              </div>

              <div>
                <p>{s.label}</p>

                <p className="text-2xl font-bold text-gray-900 tracking-tight">
                  {s.value}{" "}
                  <span className="text-sm font-normal text-gray-400">
                    taken
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )} */}

      {!isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
          {leaveStats.map((s) => (
            <StatsCard
              key={s.title}
              title={s.title}
              value={s.value}
              suffix={s.suffix}
              icon={s.icon}
            />
          ))}
        </div>
      )}

      <LeaveHistory leaves={leaves} isAdmin={isAdmin} onUpdate={fetchLeaves} />

      <ApplyLeaveModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchLeaves}
      />
    </div>
  );
};

export default Leave;
