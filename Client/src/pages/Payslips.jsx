import { useCallback, useEffect, useState } from "react";
import Loading from "../components/Loading";
import PayslipList from "../components/Payslips/PayslipList";
import GeneratePayslipForm from "../components/Payslips/GeneratePayslipForm";
import PageHeader from "../components/PageHeader";
import { useAppContext } from "../context/appContext";
import { fetchEmployeesService, fetchPayslipsService } from "../services/fetch";

const Payslips = () => {
  const [payslips, setPayslips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAppContext();
  const isAdmin = user?.role === "ADMIN";

  const fetchPayslips = useCallback(async () => {
    try {
      const data = await fetchPayslipsService();
      setPayslips(data?.data || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayslips();
  }, [fetchPayslips]);

  useEffect(() => {
    if (!isAdmin) return;

    const loadEmployees = async () => {
      try {
        const res = await fetchEmployeesService();

        const employeeList = (res?.result || []).filter((e) => !e.isDeleted);

        setEmployees(employeeList);
      } catch {
        //
      }
    };

    loadEmployees();
  }, [isAdmin]);

  if (loading) return <Loading size="xl" />;

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <PageHeader
          title="Payslips"
          subtitle={
            isAdmin
              ? "Generate and manage employee payslips"
              : "Your payslip history"
          }
        />

        {isAdmin && (
          <GeneratePayslipForm
            employees={employees}
            onSuccess={fetchPayslips}
          />
        )}
      </div>

      <PayslipList payslips={payslips} isAdmin={isAdmin} />
    </div>
  );
};

export default Payslips;
