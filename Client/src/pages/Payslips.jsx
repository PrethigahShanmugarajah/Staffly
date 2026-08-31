// Client / src / pages / Payslips.jsx
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

  // const fetchPayslips = useCallback(async () => {
  //   try {
  //     const res = await api.get("/api/payslips");
  //     setPayslips(res.data.data || []);
  //   } catch (error) {
  //     toast.error(error?.response?.data?.error || error?.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

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

  // useEffect(() => {
  //   if (isAdmin)
  //     // api
  //     //   .get("/api/employees")
  //     fetchEmployeesService()
  //       .then((res) => {
  //         setEmployees((res.data.result || []).filter((e) => !e.isDeleted));
  //       })
  //       .catch(() => {});
  // }, [isAdmin]);

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
        {/* <div>
          <h1 className="text-2xl font-medium text-gray-900 tracking-tight">
            Payslips
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            {isAdmin
              ? "Generate and manage employee payslips"
              : "Your payslip history"}
          </p>
        </div> */}

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
