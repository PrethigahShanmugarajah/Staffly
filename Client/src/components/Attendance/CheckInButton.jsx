// Client / src / components / Attendance / CheckInButton.jsx
import { LogInIcon, LogOutIcon } from "lucide-react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import Button from "../Button";
import { clockInOutService } from "../../services/mutations";

const CheckInButton = ({ todayRecord, onAction }) => {
  const [loading, setLoading] = useState(false);

  const handleAttendance = async () => {
    setLoading(true);

    try {
      // await api.post("/api/attendance");
      await clockInOutService();
      onAction();
    } finally {
      setLoading(false);
    }
  };

  if (todayRecord?.checkOut) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-2xl border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Work Day Completed</h3>

        <p className="text-gray-500 text-sm mt-1">
          Great job! See you tomorrow
        </p>
      </div>
    );
  }

  const isCheckedIn = !!todayRecord?.checkIn;

  return (
    <div className="absolute bottom-4 right-4 flex flex-col z-1">
      {/* <button
        onClick={handleAttendance}
        disabled={loading}
        className={`w-full max-w-xs flex justify-between items-center gap-8 p-4 rounded-xl bg-linear-to-br text-white ${
          isCheckedIn
            ? "from-gray-700 to-gray-700"
            : "from-teal-600 to-teal-700"
        }`}
      >
        {loading ? (
          <ClipLoader size={20} color="#FFFFFF" />
        ) : isCheckedIn ? (
          <LogOutIcon className="size-7" />
        ) : (
          <LogInIcon className="size-7" />
        )}

        <div className="relative flex flex-col items-center text-center">
          <h2 className="text-lg font-medium mb-1">
            {loading ? "Processing..." : isCheckedIn ? "Clock Out" : "Clock In"}
          </h2>

          <p className="text-xs opacity-80">
            {isCheckedIn ? "Click to end your shift" : "Start your work day"}
          </p>
        </div>
      </button> */}

      <Button
        onClick={handleAttendance}
        disabled={loading}
        color={isCheckedIn ? "gray" : "teal"}
        iconLeft={
          loading ? (
            <ClipLoader size={20} color="#FFFFFF" />
          ) : isCheckedIn ? (
            <LogOutIcon className="size-7" />
          ) : (
            <LogInIcon className="size-7" />
          )
        }
        className={`w-full max-w-xs p-4! rounded-xl bg-linear-to-br! ${
          isCheckedIn
            ? "from-gray-700! to-gray-700!"
            : "from-teal-600! to-teal-700!"
        }`}
      >
        <div className="relative flex flex-col items-center text-center">
          <h2 className="text-lg font-medium mb-1">
            {loading ? "Processing..." : isCheckedIn ? "Clock Out" : "Clock In"}
          </h2>

          <p className="text-xs opacity-80">
            {isCheckedIn ? "Click to end your shift" : "Start your work day"}
          </p>
        </div>
      </Button>
    </div>
  );
};

export default CheckInButton;
