// Client / src / components / Leave / LeaveHistory.jsx
import { format } from "date-fns";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import Button from "../Button";

// eslint-disable-next-line no-unused-vars
const LeaveHistory = ({ leaves, isAdmin, onUpdate }) => {
  // const [processing, setProcessing] = useState(null);
  const [processingApprove, setProcessingApprove] = useState(false);
  const [processingReject, setProcessingReject] = useState(false);

  // const handleStatusUpdate = async (id, status) => {
  //   setProcessing(id);
  // };

  const handleStatusUpdate = async (status) => {
    if (status === "APPROVED") {
      setProcessingApprove(true);
    } else {
      setProcessingReject(true);
    }

    setTimeout(() => {
      if (status === "APPROVED") {
        setProcessingApprove(false);
      } else {
        setProcessingReject(false);
      }
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200/70 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <tr className="hover:bg-gray-50/50 transition-colors duration-150">
              {isAdmin && <th className="px-6 py-4 bg-gray-50/80">Employee</th>}
              <th className="px-6 py-4 bg-gray-50/80">Type</th>
              <th className="px-6 py-4 bg-gray-50/80">Dates</th>
              <th className="px-6 py-4 bg-gray-50/80">Reason</th>
              <th className="px-6 py-4 bg-gray-50/80">Status</th>
              {isAdmin && (
                <th className="px-6 py-4 bg-gray-50/80 text-center">Actions</th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {leaves.length === 0 ? (
              <tr className="hover:bg-gray-50/50 transition-colors duration-150">
                <td
                  colSpan={isAdmin ? 6 : 4}
                  className="text-center py-12 text-gray-400"
                >
                  No leave applications found
                </td>
              </tr>
            ) : (
              leaves.map((leave) => {
                return (
                  <tr
                    key={leave._id || leave.id}
                    className="hover:bg-gray-50/50 transition-colors duration-150 cursor-pointer"
                  >
                    {isAdmin && (
                      <td className="px-6 py-4 text-gray-900">
                        {leave.employee?.firstName}
                        {leave.employee?.lastName}
                      </td>
                    )}

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-gray-100 text-gray-600">
                        {leave.type}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-xs text-gray-500">
                      {format(new Date(leave.startDate), "MMM dd")} -{" "}
                      {format(new Date(leave.endDate), "MMM dd, yyyy")}
                    </td>

                    <td
                      className="px-6 py-4 max-w-xs truncate text-gray-500"
                      title={leave.reason}
                    >
                      {leave.reason}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs ${
                          leave.status === "APPROVED"
                            ? "bg-green-50 text-green-700 ring-1 ring-green-600/10"
                            : leave.status === "REJECTED"
                              ? "bg-red-50 text-red-700 ring-1 ring-red-600/10"
                              : "bg-orange-50 text-orange-700 ring-1 ring-orange-600/10"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>

                    {isAdmin && (
                      <td className="px-6 py-4">
                        {leave.status === "PENDING" && (
                          <div className="flex justify-center gap-2">
                            {/* <button
                              disabled={!!processing}
                              onClick={() =>
                                handleStatusUpdate(
                                  leave._id || leave.id,
                                  "APPROVED",
                                )
                              }
                              className="p-1.5 rounded-md bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                            >
                              {processing === (leave._id || leave.id) ? (
                                <ClipLoader size={20} color="#FFFFFF" />
                              ) : (
                                <Check className="w-4 h-4" />
                              )}
                            </button> */}

                            <Button
                              disabled={processingApprove || processingReject}
                              onClick={() => handleStatusUpdate("APPROVED")}
                              color="teal"
                              variant="ghost"
                              hoverRounded={false}
                              iconLeft={
                                processingApprove ? (
                                  <ClipLoader size={20} color="#FFFFFF" />
                                ) : (
                                  <Check className="w-4 h-4" />
                                )
                              }
                              className="p-1.5! bg-green-50! text-green-600! hover:bg-green-100! transition-colors!"
                            />

                            {/* <button
                              onClick={() =>
                                handleStatusUpdate(
                                  leave._id || leave.id,
                                  "REJECTED",
                                )
                              }
                              disabled={!!processing}
                              className="p-1.5 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            >
                              {processing === (leave._id || leave.id) ? (
                                <ClipLoader size={20} color="#FFFFFF" />
                              ) : (
                                <X className="w-4 h-4" />
                              )}
                            </button> */}

                            <Button
                              onClick={() => handleStatusUpdate("REJECTED")}
                              disabled={processingApprove || processingReject}
                              color="gray"
                              variant="ghost"
                              hoverRounded={false}
                              iconLeft={
                                processingReject ? (
                                  <ClipLoader size={20} color="#FFFFFF" />
                                ) : (
                                  <X className="w-4 h-4" />
                                )
                              }
                              className="p-1.5! bg-red-50! text-red-600! hover:bg-red-100! transition-colors!"
                            />
                          </div>
                        )}
                      </td>
                    )}
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

export default LeaveHistory;
