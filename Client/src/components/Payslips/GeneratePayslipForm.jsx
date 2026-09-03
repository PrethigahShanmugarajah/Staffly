import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "../../context/appContext";
import { ClipLoader } from "react-spinners";
import Button from "../Button";
import { SelectInput } from "../FormField/SelectInput";
import { InputField } from "../FormField/InputField";
import { createPayslipService } from "../../services/mutations";

const GeneratePayslipForm = ({ employees, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [month, setMonth] = useState("");

  const { CURRENCY } = useAppContext();

  if (!isOpen)
    return (
      <Button
        onClick={() => setIsOpen(true)}
        text="Generate Payslip"
        iconLeft={<Plus className="w-4 h-4" />}
      />
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await createPayslipService(data);
      await onSuccess?.();
      setIsOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg border border-gray-200/70 max-w-lg w-full p-6 animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">
            Generate Monthly Payslip
          </h3>

          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            iconLeft={<X size={20} />}
            className="p-1! text-gray-400! hover:text-gray-600! hover:bg-gray-100"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* -------- Select Employee -------- */}

          <SelectInput
            label="Employee"
            name="employeeId"
            required
            options={employees.map((e) => ({
              value: e._id || e.id,
              label: `${e.firstName} ${e.lastName} (${e.position})`,
            }))}
            placeholder="Select Employee"
            value={employeeId}
            onChange={setEmployeeId}
          />

          {/* -------- Select Month & Year -------- */}
          <div className="grid grid-cols-2 gap-4">
            <SelectInput
              label="Month"
              name="month"
              options={Array.from({ length: 12 }, (_, i) => i + 1).map((m) => ({
                value: m,
                label: `${m.toString().padStart(2, "0")} - ${new Date(2000, m - 1).toLocaleString("en-US", { month: "long" })}`,
              }))}
              placeholder="Select Month"
              value={month}
              onChange={setMonth}
            />

            <InputField
              label="Year"
              labelPosition="top"
              name="year"
              type="number"
              defaultValue={new Date().getFullYear()}
              size="xs"
            />
          </div>

          {/* -------- Basic Salary -------- */}

          <InputField
            label="Basic Salary"
            labelPosition="top"
            name="basicSalary"
            type="number"
            required
            placeholder={`${CURRENCY} 5000`}
            size="s"
          />

          {/* -------- Allowances & Deductions -------- */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Allowances"
              labelPosition="top"
              name="allowances"
              type="number"
              defaultValue="0"
              size="s"
            />

            <InputField
              label="Deductions"
              labelPosition="top"
              name="deductions"
              type="number"
              defaultValue="0"
              size="s"
            />
          </div>

          {/* -------- Buttons -------- */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              onClick={() => setIsOpen(false)}
              type="button"
              variant="secondary"
              text="Cancel"
            />

            <Button
              disabled={loading}
              type="submit"
              text="Generate"
              iconLeft={loading && <ClipLoader size={20} color="#FFFFFF" />}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneratePayslipForm;
