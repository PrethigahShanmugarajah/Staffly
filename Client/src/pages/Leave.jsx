import { useCallback, useEffect, useState } from "react";
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
import { useAppContext } from "../context/appContext";
import { fetchLeaveApplicationsService } from "../services/fetch";

const Leave = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const { user } = useAppContext();

  const isAdmin = user?.role === "ADMIN";

  const fetchLeaves = useCallback(async () => {
    try {
      const data = await fetchLeaveApplicationsService();

      setLeaves(data?.data || []);

      if (data?.employee?.isDeleted) setIsDeleted(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  if (loading) return <Loading size="xl" />;

  const approvedLeaves = leaves.filter((l) => l.status === "APPROVED");
  const sickCount = approvedLeaves.filter((l) => l.type === "SICK").length;
  const casualCount = approvedLeaves.filter((l) => l.type === "CASUAL").length;
  const annalCount = approvedLeaves.filter((l) => l.type === "ANNUAL").length;

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
        <PageHeader
          title="Leave Management"
          subtitle={
            isAdmin
              ? "Manage leave applications"
              : "Your leave history and requests"
          }
        />

        {!isAdmin && !isDeleted && (
          <Button
            onClick={() => setShowModal(true)}
            iconLeft={<PlusIcon className="w-4 h-4" />}
            text="Apply for leave"
          />
        )}
      </div>

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
