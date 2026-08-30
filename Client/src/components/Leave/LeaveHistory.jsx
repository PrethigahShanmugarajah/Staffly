// Client / src / components / Leave / LeaveHistory.jsx
import { format } from "date-fns";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import Button from "../Button";
import { updateLeaveApplicationStatusService } from "../../services/mutations";
import ConfirmPopup from "../ConfirmPopup";

const LeaveHistory = ({ leaves, isAdmin, onUpdate }) => {
  // const [processing, setProcessing] = useState(null);
  const [processingApprove, setProcessingApprove] = useState(false);
  const [processingReject, setProcessingReject] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);

  // const handleStatusUpdate = async (id, status) => {
  //   setProcessing(id);
  // };

  const handleStatusUpdate = async (id, status) => {
    if (status === "APPROVED") {
      setProcessingApprove(true);
    } else {
      setProcessingReject(true);
    }

    try {
      // await api.patch(`/api/leaveApplication/${id}`, { status });
      await updateLeaveApplicationStatusService(id, { status });
      onUpdate();
    } finally {
      // setProcessingApprove(null);
      // setProcessingReject(null);
      setProcessingApprove(false);
      setProcessingReject(false);
    }
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
                        {leave.employee?.firstName} {leave.employee?.lastName}
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
                              onClick={() =>
                                setConfirmAction({
                                  id: leave._id || leave.id,
                                  status: "APPROVED",
                                  employeeName: `${leave.employee?.firstName} ${leave.employee?.lastName}`,
                                  startDate: leave.startDate,
                                  endDate: leave.endDate,
                                  reason: leave.reason,
                                })
                              }
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
                              onClick={() =>
                                setConfirmAction({
                                  id: leave._id || leave.id,
                                  status: "REJECTED",
                                  employeeName: `${leave.employee?.firstName} ${leave.employee?.lastName}`,
                                  startDate: leave.startDate,
                                  endDate: leave.endDate,
                                  reason: leave.reason,
                                })
                              }
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

      {confirmAction && (
        <ConfirmPopup
          onClose={() => setConfirmAction(null)}
          onConfirm={async () => {
            await handleStatusUpdate(confirmAction.id, confirmAction.status);
            setConfirmAction(null);
          }}
          loading={
            confirmAction.status === "APPROVED"
              ? processingApprove
              : processingReject
          }
          title={
            confirmAction.status === "APPROVED"
              ? "Approve Leave?"
              : "Reject Leave?"
          }
          description={
            <>
              <p>
                Are you sure you want to{" "}
                {confirmAction.status === "APPROVED" ? "approve" : "reject"}{" "}
                this leave application?
              </p>

              <div className="mt-4 text-center space-y-2">
                <p>
                  <strong>Employee:</strong> {confirmAction.employeeName}
                </p>

                <p>
                  <strong>Dates:</strong>{" "}
                  {format(new Date(confirmAction.startDate), "MMM dd")} -{" "}
                  {format(new Date(confirmAction.endDate), "MMM dd, yyyy")}
                </p>

                <p>
                  <strong>Reason:</strong> {confirmAction.reason}
                </p>
              </div>
            </>
          }
          confirmText={
            confirmAction.status === "APPROVED" ? "Approve" : "Reject"
          }
          closeText="Cancel"
          confirmColor={confirmAction.status === "APPROVED" ? "green" : "red"}
        />
      )}
    </div>
  );
};

export default LeaveHistory;
