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
        <Button
          type="button"
          variant="secondary"
          onClick={() => (onCancel ? onCancel() : navigate(-1))}
          text="Cancel"
        />

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
