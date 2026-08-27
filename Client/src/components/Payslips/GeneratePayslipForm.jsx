// Client / src / components / Payslips / GeneratePayslipForm.jsx
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "../../context/appContext";
import { ClipLoader } from "react-spinners";
import Button from "../Button";
import { SelectInput } from "../FormField/SelectInput";
import { InputField } from "../FormField/InputField";

// eslint-disable-next-line no-unused-vars
const GeneratePayslipForm = ({ employees, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [month, setMonth] = useState("");

  const { CURRENCY } = useAppContext();

  if (!isOpen)
    return (
      // <button
      //   onClick={() => setIsOpen(true)}
      //   className="bg-linear-to-r from-teal-600 to-teal-500 text-white px-5 py-2.5 rounded-md text-sm hover:from-teal-700 hover:to-teal-600 transition-all duration-200 shadow-md shadow-teal-500/25 active:scale-[0.98] flex items-center gap-2"
      // >
      //   <Plus className="w-4 h-4" /> Generate Payslip
      // </button>

      <Button
        onClick={() => setIsOpen(true)}
        text="Generate Payslip"
        iconLeft={<Plus className="w-4 h-4" />}
      />
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg border border-gray-200/70 max-w-lg w-full p-6 animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">
            Generate Monthly Payslip
          </h3>

          {/* <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X size={20} />
          </button> */}

          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            iconLeft={<X size={20} />}
            className="p-1! text-gray-400! hover:text-gray-600! hover:bg-gray-100"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* -------- Select Employee -------- */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employee
            </label>

            <select name="employeeId" required>
              {employees.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.firstName} {e.lastName} ({e.position})
                </option>
              ))}
            </select>
          </div> */}

          <SelectInput
            label="Employee"
            name="employeeId"
            required
            options={employees.map((e) => ({
              value: e.id,
              label: `${e.firstName} ${e.lastName} (${e.position})`,
            }))}
            placeholder="Select Employee"
            value={employeeId}
            onChange={setEmployeeId}
          />

          {/* -------- Select Month & Year -------- */}
          <div className="grid grid-cols-2 gap-4">
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Month
              </label>

              <select name="month">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div> */}

            <SelectInput
              label="Month"
              name="month"
              options={Array.from({ length: 12 }, (_, i) => i + 1).map((m) => ({
                value: m,
                // label: m.toString(),
                label: `${m.toString().padStart(2, "0")} - ${new Date(2000, m - 1).toLocaleString("en-US", { month: "long" })}`,
              }))}
              placeholder="Select Month"
              value={month}
              onChange={setMonth}
            />

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>

              <input
                type="number"
                name="year"
                defaultValue={new Date().getFullYear()}
              />
            </div> */}

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
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Basic Salary
            </label>

            <input
              type="number"
              name="basicSalary"
              required
              placeholder={`${CURRENCY} 5000`}
            />
          </div> */}

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
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allowances
              </label>

              <input type="number" name="allowances" defaultValue="0" />
            </div> */}

            <InputField
              label="Allowances"
              labelPosition="top"
              name="allowances"
              type="number"
              defaultValue="0"
              size="s"
            />

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deductions
              </label>

              <input type="number" name="deductions" defaultValue="0" />
            </div> */}

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
            {/* <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-md text-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            >
              Cancel
            </button> */}

            <Button
              onClick={() => setIsOpen(false)}
              type="button"
              variant="secondary"
              text="Cancel"
            />

            {/* <button
              disabled={loading}
              type="submit"
              className="bg-linear-to-r from-teal-600 to-teal-500 text-white px-5 py-2.5 rounded-md text-sm hover:from-teal-700 hover:to-teal-600 transition-all duration-200 shadow-md shadow-teal-500/25 active:scale-[0.98] flex items-center"
            >
              {loading && <ClipLoader size={20} color="#FFFFFF" />}
              Generate
            </button> */}

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
