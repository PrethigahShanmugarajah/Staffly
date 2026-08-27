// Client / src / components / Attendance / AttendanceHistory.jsx
import {
  getDayTypeDisplay,
  getWorkingHoursDisplay,
} from "../../utils/attendanceUtils";
import { format } from "date-fns";

const AttendanceHistory = ({ history }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200/70 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">Recent Activity</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Check In</th>
              <th className="px-6 py-4">Check Out</th>
              <th className="px-6 py-4">Working Hours</th>
              <th className="px-6 py-4">Day Type</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-gray-400">
                  No records found
                </td>
              </tr>
            ) : (
              history.map((record) => {
                const dayType = getDayTypeDisplay(record);

                return (
                  <tr key={record._id || record.id}>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {format(new Date(record.date), "MMM dd, yyyy")}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {record.checkIn
                        ? format(new Date(record.checkIn), "hh:mm a")
                        : "-"}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {record.checkOut
                        ? format(new Date(record.checkOut), "hh:mm a")
                        : "-"}
                    </td>

                    <td className="px-6 py-4 text-gray-600 font-medium">
                      {getWorkingHoursDisplay(record)}
                    </td>

                    <td className="px-6 py-4">
                      {dayType.label !== "-" ? (
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs ${dayType.className}`}
                        >
                          {dayType.label}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs ${
                          record.status === "PRESENT"
                            ? "bg-green-50 text-green-700 ring-1 ring-green-600/10"
                            : record.status === "LATE"
                              ? "bg-orange-50 text-orange-700 ring-1 ring-orange-600/10"
                              : "bg-red-50 text-red-700 ring-1 ring-red-600/10"
                        }`}
                      >
                        {record.status}
                      </span>
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

export default AttendanceHistory;
