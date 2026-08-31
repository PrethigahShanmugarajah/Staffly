// Client / src / components / Leave / ApplyLeaveModal.jsx
import { useState } from "react";
import { CalendarDays, FileText, Send, X } from "lucide-react";
import { ClipLoader } from "react-spinners";
import Button from "../Button";
import { SelectInput } from "../FormField/SelectInput";
import { InputField } from "../FormField/InputField";
import { TextAreaField } from "../FormField/TextAreaField";
import { createLeaveApplicationService } from "../../services/mutations";

const ApplyLeaveModal = ({ open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [leaveType, setLeaveType] = useState("");

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // try {
    //   await api.post("/api/leaveApplication", data);
    //   onSuccess();
    //   onClose();
    // } catch (error) {
    //   toast.error(error.response?.data?.error || error?.message);
    // } finally {
    //   setLoading(false);
    // }

    try {
      await createLeaveApplicationService(data);
      onSuccess();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* -------- Header -------- */}
        <div className="flex items-center justify-between p-6 pb-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Apply for Leave
            </h2>

            <p className="text-sm text-gray-400 mt-0.5">
              Submit your leave request for approval
            </p>
          </div>

          {/* <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button> */}

          <Button
            onClick={onClose}
            variant="ghost"
            hoverRounded={false}
            iconLeft={<X className="h-5 w-5" />}
            className="p-2! hover:bg-gray-100! transition-colors! text-gray-400! hover:text-gray-600!"
          />
        </div>

        {/* -------- Form -------- */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* -------- Leave Type -------- */}
          {/* <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 text-gray-500" /> Leave Type
            </label>

            <select name="type" required>
              <option value="SICK">Sick Leave</option>
              <option value="CASUAL">Casual Leave</option>
              <option value="ANNUAL">Annual Leave</option>
            </select>
          </div> */}

          <SelectInput
            label={
              <>
                <FileText className="w-4 h-4 text-gray-500" />
                Leave Type
              </>
            }
            placeholder="Select Leave Type"
            name="type"
            required
            value={leaveType}
            onChange={(value) => setLeaveType(value)}
            options={[
              { value: "SICK", label: "Sick Leave" },
              { value: "CASUAL", label: "Casual Leave" },
              { value: "ANNUAL", label: "Annual Leave" },
            ]}
          />

          {/* -------- Duration -------- */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <CalendarDays className="w-4 h-4 text-gray-500" /> Duration
            </label>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-xs text-gray-400 mb-1">
                  From <span className="text-red-500 ml-1">*</span>
                </span>

                {/* <input type="date" name="startDate" required min={minDate} /> */}

                <InputField
                  type="date"
                  name="startDate"
                  required
                  min={minDate}
                  labelPosition="top"
                  size="s"
                />
              </div>

              <div>
                <span className="block text-xs text-gray-400 mb-1">
                  To<span className="text-red-500 ml-1">*</span>
                </span>

                {/* <input type="date" name="endDate" required min={minDate} /> */}

                <InputField
                  type="date"
                  name="endDate"
                  required
                  min={minDate}
                  labelPosition="top"
                  size="s"
                />
              </div>
            </div>
          </div>

          {/* -------- Reason -------- */}
          {/* <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Reason
            </label>

            <textarea
              name="reason"
              required
              rows={3}
              className="resize-none"
              placeholder="Briefly describe why you need this leave..."
            />
          </div> */}

          <TextAreaField
            label="Reason"
            labelPosition="top"
            name="reason"
            required
            rows={3}
            placeholder="Briefly describe why you need this leave..."
            size="m"
          />

          {/* -------- Buttons -------- */}
          <div className="flex gap-3 pt-2">
            {/* <button
              onClick={onClose}
              type="button"
              className="bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-md text-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex-1"
            >
              Cancel
            </button> */}

            <Button
              onClick={onClose}
              type="button"
              variant="secondary"
              text="Cancel"
              className="flex-1"
            />

            {/* <button
              disabled={loading}
              type="submit"
              className="bg-linear-to-r from-teal-600 to-teal-500 text-white px-5 py-2.5 rounded-md text-sm hover:from-teal-700 hover:to-teal-600 transition-all duration-200 shadow-md shadow-teal-500/25 active:scale-[0.98] flex-1 flex items-center justify-center gap-2"
            >
              {loading ? (
                <ClipLoader size={20} color="#FFFFFF" />
              ) : (
                <Send className="w-4 h-4" />
              )}

              {loading ? "Submitting..." : "Submit"}
            </button> */}

            <Button
              disabled={loading}
              type="submit"
              iconLeft={
                loading ? (
                  <ClipLoader size={20} color="#FFFFFF" />
                ) : (
                  <Send className="w-4 h-4" />
                )
              }
              text={loading ? "Submitting..." : "Submit"}
              className="flex-1"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeaveModal;
