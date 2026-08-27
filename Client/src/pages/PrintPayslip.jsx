// Client / src / pages / PrintPayslip.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyPayslipData } from "../assets/assets";
import Loading from "../components/Loading";
import { format } from "date-fns";
import { useAppContext } from "../context/appContext";
import Button from "../components/Button";

const PrintPayslip = () => {
  const { id } = useParams();
  const [payslip, setPayslip] = useState(null);
  const [loading, setLoading] = useState(true);

  const { CURRENCY } = useAppContext();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPayslip(dummyPayslipData.find((slip) => slip._id === id));
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) return <Loading size="xxl" />;

  if (!payslip)
    return <p className="text-center py-12 text-gray-400">Payslip not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white animate-fade-in">
      <div className="text-center border-b border-gray-200 pb-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          PAYSLIP
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            Employee Name
          </p>

          <p className="font-semibold text-gray-900">
            {payslip.employee?.firstName} {payslip.employee?.lastName}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            Position
          </p>

          <p className="font-semibold text-gray-900">
            {payslip.employee?.position}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            Email
          </p>

          <p className="font-semibold text-gray-900">
            {payslip.employee?.email}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            Period
          </p>

          <p className="font-semibold text-gray-900">
            {format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy")}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-3 px-4 text-xs text-gray-500 uppercase tracking-wider">
                Description
              </th>

              <th className="text-right py-3 px-4 text-xs text-gray-500 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t border-gray-100">
              <td className="py-3 px-4 text-gray-700">Basic Salary</td>

              <td className="text-right py-3 px-4 text-gray-900 font-medium">
                {CURRENCY} {payslip.basicSalary?.toLocaleString()}
              </td>
            </tr>

            <tr className="border-t border-gray-100">
              <td className="py-3 px-4 text-gray-700">Allowances</td>

              <td className="text-right py-3 px-4 text-gray-900 font-medium">
                +{CURRENCY} {payslip.allowances?.toLocaleString()}
              </td>
            </tr>

            <tr className="border-t border-gray-100">
              <td className="py-3 px-4 text-gray-700">Deductions</td>

              <td className="text-right py-3 px-4 text-gray-900 font-medium">
                -{CURRENCY} {payslip.deductions?.toLocaleString()}
              </td>
            </tr>

            <tr className="border-t-2 border-gray-200 bg-gray-50">
              <td className="py-4 px-4 font-bold text-gray-700">Net Salary</td>

              <td className="text-right py-4 px-4 font-bold text-gray-900 text-lg">
                {CURRENCY} {payslip.netSalary?.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-center flex justify-center">
        {/* <button
          className="bg-linear-to-r from-teal-600 to-teal-500 text-white px-5 py-2.5 rounded-md text-sm hover:from-teal-700 hover:to-teal-600 transition-all duration-200 shadow-md shadow-teal-500/25 active:scale-[0.98] print:hidden"
          onClick={() => window.print()}
        >
          Print Payslip
        </button> */}

        <Button
          text="Print Payslip"
          onClick={() => window.print()}
          className="print:hidden"
        />
      </div>
    </div>
  );
};

export default PrintPayslip;
