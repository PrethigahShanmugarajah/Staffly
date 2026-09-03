import { format } from "date-fns";
import { useAppContext } from "../../context/appContext";
import { Download } from "lucide-react";
import Button from "../Button";

const PayslipList = ({ payslips, isAdmin }) => {
  const { CURRENCY } = useAppContext();

  return (
    <div className="bg-white rounded-lg border border-gray-200/70 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <tr className="hover:bg-gray-50/50 transition-colors duration-150">
              {isAdmin && <th className="px-6 py-4 bg-gray-50/80">Employee</th>}
              <th className="px-6 py-4 bg-gray-50/80">Period</th>
              <th className="px-6 py-4 bg-gray-50/80">Basic Salary</th>
              <th className="px-6 py-4 bg-gray-50/80">Net Salary</th>
              <th className="px-6 py-4 bg-gray-50/80 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {payslips.length === 0 ? (
              <tr className="hover:bg-gray-50/50 transition-colors duration-150">
                <td
                  colSpan={isAdmin ? 5 : 4}
                  className="text-center py-12 text-gray-400"
                >
                  No payslips found
                </td>
              </tr>
            ) : (
              payslips.map((payslip) => {
                return (
                  <tr
                    key={payslip._id || payslip.id}
                    className="hover:bg-gray-50/50 transition-colors duration-150 cursor-pointer"
                  >
                    {isAdmin && (
                      <td className="px-6 py-4 text-gray-900">
                        {payslip.employee?.firstName}{" "}
                        {payslip.employee?.lastName}
                      </td>
                    )}

                    <td className="px-6 py-4 text-gray-500">
                      {format(
                        new Date(payslip.year, payslip.month - 1),
                        "MMMM yyyy",
                      )}
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {CURRENCY} {payslip.basicSalary?.toLocaleString()}
                    </td>

                    <td className="font-medium px-6 py-4 text-gray-800">
                      {CURRENCY} {payslip.netSalary?.toLocaleString()}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <Button
                        onClick={() =>
                          window.open(
                            `/print/payslips/${payslip._id || payslip.id}`,
                          )
                        }
                        variant="outline"
                        size="s"
                        iconLeft={<Download className="w-3 h-3" />}
                        text="Download"
                        hoverRounded={false}
                        className="inline-flex text-sky-600! bg-sky-50! hover:bg-sky-100! border transition-colors ring-1 ring-sky-600/10! border-sky-600!"
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayslipList;
