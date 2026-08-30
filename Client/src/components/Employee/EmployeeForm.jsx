// Client / src / components / Employee / EmployeeForm.jsx
import { useState } from "react";
import { useAppContext } from "../../context/appContext";
import { DEPARTMENTS } from "../../constants/department";
import { ClipLoader } from "react-spinners";
import { InputField } from "../FormField/InputField";
import { Eye, EyeOff } from "lucide-react";
import { TextAreaField } from "../FormField/TextAreaField";
import { SelectInput } from "../FormField/SelectInput";
import Button from "../Button";
import {
  createEmployeeService,
  updateEmployeeService,
} from "../../services/mutations";

const EmployeeForm = ({ initialData, onSuccess, onCancel }) => {
  const { navigate } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [showTemporaryPassword, setShowTemporaryPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [department, setDepartment] = useState(initialData?.department || "");

  const isEditMode = !!initialData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    if (isEditMode) {
      const pwd = formData.get("password");
      if (!pwd) formData.delete("password");
    }

    try {
      // const url = isEditMode
      //   ? `/api/employees/${initialData.id}`
      //   : "/api/employees";
      // const method = isEditMode ? "put" : "post";
      // await api[method](url, formData);
      // onSuccess ? onSuccess() : navigate("/employees");
      if (isEditMode) {
        await updateEmployeeService(initialData.id, formData);
      } else {
        await createEmployeeService(formData);
      }

      onSuccess ? onSuccess() : navigate("/employees");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-3xl animate-fade-in"
    >
      {/* -------- Personal Information -------- */}
      <div className="bg-white rounded-lg border border-gray-200/70 p-5 sm:p-6">
        <h3 className="font-medium mb-6 pb-4 border-b border-gray-100">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-gray-700">
          {/* <div>
            <label className="block mb-2">First Name</label>

            <input
              type="text"
              name="firstName"
              required
              defaultValue={initialData?.firstName}
            />
          </div> */}

          <InputField
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Enter first name"
            required
            size="s"
            labelPosition="top"
            defaultValue={initialData?.firstName}
          />

          {/* <div>
            <label className="block mb-2">Last Name</label>

            <input
              type="text"
              name="lastName"
              required
              defaultValue={initialData?.lastName}
            />
          </div> */}

          <InputField
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Enter last name"
            required
            size="s"
            labelPosition="top"
            defaultValue={initialData?.lastName}
          />

          {/* <div>
            <label className="block mb-2">Phone Number</label>

            <input
              type="number"
              name="phone"
              required
              defaultValue={initialData?.phone}
            />
          </div> */}

          <InputField
            label="Phone Number"
            name="phone"
            type="number"
            placeholder="Enter phone number"
            required
            size="s"
            labelPosition="top"
            defaultValue={initialData?.phone}
          />

          {/* <div>
            <label className="block mb-2">Join Date</label>

            <input
              type="date"
              name="joinDate"
              required
              defaultValue={
                initialData?.joinDate
                  ? new Date(initialData.joinDate).toISOString().split("T")[0]
                  : ""
              }
            />
          </div> */}

          <InputField
            label="Join Date"
            name="joinDate"
            type="date"
            required
            size="s"
            labelPosition="top"
            defaultValue={
              initialData?.joinDate
                ? new Date(initialData.joinDate).toISOString().split("T")[0]
                : ""
            }
          />

          <div className="sm:col-span-2">
            {/* <label className="block mb-2">Bio (Optional)</label>

            <textarea
              name="bio"
              defaultValue={initialData?.bio}
              rows={3}
              className="resize-none"
              placeholder="Brief description..."
            /> */}

            <TextAreaField
              name="bio"
              size="s"
              rows={3}
              defaultValue={initialData?.bio}
              placeholder="Brief description..."
              textareaClassName="resize-none"
            />
          </div>
        </div>
      </div>

      {/* -------- Employment Details -------- */}
      <div className="bg-white rounded-lg border border-gray-200/70 p-5 sm:p-6">
        <h3 className="text-base font-medium text-gray-900 mb-6 pb-4 border-b border-gray-100">
          Employment Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-gray-700">
          <div>
            {/* <label className="block mb-2">Department</label>

            <select
              name="department"
              defaultValue={initialData?.department || ""}
            >
              <option value="">Select Department</option>

              {DEPARTMENTS.map((deptName) => (
                <option key={deptName} value={deptName}>
                  {deptName}
                </option>
              ))}
            </select> */}

            <SelectInput
              label="Department"
              name="department"
              placeholder="Select Department"
              size="m"
              options={DEPARTMENTS.map((deptName) => ({
                value: deptName,
                label: deptName,
              }))}
              value={department}
              onChange={(value) => setDepartment(value)}
            />
          </div>

          {/* <div>
            <label className="block mb-2">Position</label>

            <input
              type="text"
              name="position"
              required
              defaultValue={initialData?.position}
            />
          </div> */}

          <InputField
            label="Position"
            name="position"
            type="text"
            placeholder="Enter position"
            required
            size="s"
            labelPosition="top"
            defaultValue={initialData?.position}
          />

          {/* <div>
            <label className="block mb-2">Basic Salary</label>

            <input
              type="number"
              name="basicSalary"
              required
              min="0"
              step="0.01"
              defaultValue={initialData?.basicSalary || 0}
            />
          </div> */}

          <InputField
            label="Basic Salary"
            name="basicSalary"
            type="number"
            placeholder="Enter basic salary"
            required
            min="0"
            step="0.01"
            size="s"
            labelPosition="top"
            defaultValue={initialData?.basicSalary || 0}
          />

          {/* <div>
            <label className="block mb-2">Allowances</label>

            <input
              type="number"
              name="allowances"
              required
              min="0"
              step="0.01"
              defaultValue={initialData?.allowances || 0}
            />
          </div> */}

          <InputField
            label="Allowances"
            name="allowances"
            type="number"
            placeholder="Enter allowances"
            required
            min="0"
            step="0.01"
            size="s"
            labelPosition="top"
            defaultValue={initialData?.allowances || 0}
          />

          {/* <div>
            <label className="block mb-2">Deductions</label>

            <input
              type="number"
              name="deductions"
              required
              min="0"
              step="0.01"
              defaultValue={initialData?.deductions || 0}
            />
          </div> */}

          <InputField
            label="Deductions"
            name="deductions"
            type="number"
            placeholder="Enter deductions"
            required
            min="0"
            step="0.01"
            size="s"
            labelPosition="top"
            defaultValue={initialData?.deductions || 0}
          />

          {isEditMode && (
            <div>
              {/* <label className="block mb-2">Status</label>

              <select
                name="employmentStatus"
                defaultValue={initialData?.employmentStatus}
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select> */}

              <SelectInput
                label="Status"
                name="employmentStatus"
                placeholder="Select Status"
                size="m"
                options={[
                  { value: "ACTIVE", label: "Active" },
                  { value: "INACTIVE", label: "Inactive" },
                ]}
                value={initialData?.employmentStatus || ""}
              />
            </div>
          )}
        </div>
      </div>

      {/* -------- Account Setup -------- */}
      <div className="bg-white rounded-lg border border-gray-200/70 p-5 sm:p-6">
        <h3 className="font-medium mb-6 pb-4 border-b border-gray-100">
          Account Setup
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm text-gray-700">
          <div className="sm:col-span-2">
            {/* <label className="block mb-2">Work Email</label>

            <input
              type="email"
              name="email"
              required
              defaultValue={initialData?.email}
            /> */}

            <InputField
              label="Work Email"
              name="email"
              type="email"
              placeholder="Enter work email"
              required
              size="s"
              labelPosition="top"
              defaultValue={initialData?.email}
            />
          </div>

          {!isEditMode && (
            <div>
              {/* <label className="block mb-2">Temporary Password</label>

              <input type="password" name="password" required /> */}

              <InputField
                label="Temporary Password"
                name="password"
                type={showTemporaryPassword ? "text" : "password"}
                placeholder="Enter temporary password"
                required
                size="s"
                labelPosition="top"
                iconRight={
                  showTemporaryPassword ? (
                    <EyeOff
                      className="size-4 cursor-pointer text-gray-400 hover:text-gray-700"
                      onClick={() => setShowTemporaryPassword(false)}
                    />
                  ) : (
                    <Eye
                      className="size-4 cursor-pointer text-gray-400 hover:text-gray-700"
                      onClick={() => setShowTemporaryPassword(true)}
                    />
                  )
                }
              />
            </div>
          )}

          {isEditMode && (
            <div>
              {/* <label className="block mb-2">Change Password(Optional)</label>

              <input
                type="password"
                name="password"
                placeholder="Leave blank to keep current"
              /> */}

              <InputField
                label="Change Password (Optional)"
                name="password"
                type={showChangePassword ? "text" : "password"}
                placeholder="Leave blank to keep current"
                size="s"
                labelPosition="top"
                iconRight={
                  showChangePassword ? (
                    <EyeOff
                      className="size-4 cursor-pointer text-gray-400 hover:text-gray-700"
                      onClick={() => setShowChangePassword(false)}
                    />
                  ) : (
                    <Eye
                      className="size-4 cursor-pointer text-gray-400 hover:text-gray-700"
                      onClick={() => setShowChangePassword(true)}
                    />
                  )
                }
              />
            </div>
          )}

          <div>
            {/* <label className="block mb-2">System Role</label>

            <select
              name="role"
              defaultValue={initialData?.user?.role || "EMPLOYEE"}
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>
            </select> */}

            <SelectInput
              label="System Role"
              name="role"
              placeholder="Select System Role"
              size="m"
              options={[
                { value: "EMPLOYEE", label: "Employee" },
                { value: "ADMIN", label: "Admin" },
              ]}
              value={initialData?.user?.role || "EMPLOYEE"}
            />
          </div>
        </div>
      </div>

      {/* -------- Buttons -------- */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-2">
        {/* <button
          type="button"
          className="bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-md text-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
          onClick={() => (onCancel ? onCancel() : navigate(-1))}
        >
          Cancel
        </button> */}

        <Button
          type="button"
          variant="secondary"
          onClick={() => (onCancel ? onCancel() : navigate(-1))}
          text="Cancel"
        />

        {/* <button
          type="submit"
          disabled={loading}
          className="bg-linear-to-r from-teal-600 to-teal-500 text-white px-5 py-2.5 rounded-md text-sm hover:from-teal-700 hover:to-teal-600 transition-all duration-200 shadow-md shadow-teal-500/25 active:scale-[0.98] flex items-center justify-center"
        >
          {loading && <ClipLoader size={20} color="#FFFFFF" />}

          {isEditMode ? "Update Employee" : "Create Employee"}
        </button> */}

        <Button
          type="submit"
          disabled={loading}
          text={isEditMode ? "Update Employee" : "Create Employee"}
          iconLeft={loading && <ClipLoader size={20} color="#FFFFFF" />}
        />
      </div>
    </form>
  );
};

export default EmployeeForm;
