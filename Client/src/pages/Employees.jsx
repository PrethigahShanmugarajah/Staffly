import { useCallback, useEffect, useState } from "react";
import { Plus, Search, X } from "lucide-react";
import { DEPARTMENTS } from "../constants/department";
import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";
import EmployeeCard from "../components/Employee/EmployeeCard";
import EmployeeForm from "../components/Employee/EmployeeForm";
import Button from "../components/Button";
import { InputField } from "../components/FormField/InputField";
import { SelectInput } from "../components/FormField/SelectInput";
import { fetchEmployeesService } from "../services/fetch";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchEmployees = useCallback(async () => {
    try {
      const data = await fetchEmployeesService(selectedDept);

      setEmployees(data.result);
    } finally {
      setLoading(false);
    }
  }, [selectedDept]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const filtered = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.position}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="animate-fade-in">
      {/* -------- Header -------- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <PageHeader title="Employees" subtitle="Manage your team members" />

        <Button
          onClick={() => setShowCreateModal(true)}
          text="Add Employee"
          iconLeft={<Plus size={16} />}
          className="w-full sm:w-auto"
        />
      </div>

      {/* -------- Search Bar -------- */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-2">
          <InputField
            type="text"
            placeholder="Search employees..."
            size="s"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            iconLeft={<Search className="w-4 h-4" />}
            inputClassName="pl-10!"
          />
        </div>

        <SelectInput
          size="m"
          options={[
            { value: "", label: "All Departments" },
            ...DEPARTMENTS.map((deptName) => ({
              value: deptName,
              label: deptName,
            })),
          ]}
          value={selectedDept}
          onChange={(value) => setSelectedDept(value)}
          className="flex-1"
        />
      </div>

      {/* -------- Employee Cards -------- */}
      {loading ? (
        <Loading size="xl" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filtered.length === 0 ? (
            <p className="col-span-full text-center py-16 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
              No employees found
            </p>
          ) : (
            filtered.map((emp) => (
              <EmployeeCard
                key={emp.id}
                employee={emp}
                onDelete={fetchEmployees}
                onEdit={(e) => setEditEmployee(e)}
              />
            ))
          )}
        </div>
      )}

      {/* -------- Create Employee Modal -------- */}
      {showCreateModal && (
        <div
          className="fixed bg-black/40 backdrop-blur-sm inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
          onClick={() => setShowCreateModal(false)}
        >
          <div className="fixed inset-0" />

          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 pb-0">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Add New Employee
                </h2>

                <p className="text-sm text-gray-500 mt-0.5">
                  Create a user account and employee profile
                </p>
              </div>

              <Button
                onClick={() => setShowCreateModal(false)}
                variant="ghost"
                iconLeft={<X className="w-5 h-5" />}
                className="p-2! hover:bg-gray-100! text-gray-400! hover:text-gray-600!"
              />
            </div>

            <div className="p-6">
              <EmployeeForm
                onSuccess={() => {
                  setShowCreateModal(false);
                  fetchEmployees();
                }}
                onCancel={() => setShowCreateModal(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* -------- Edit Employee Modal -------- */}
      {editEmployee && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-sm"
          onClick={() => setEditEmployee(null)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 pb-0">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Edit Employee
                </h2>

                <p className="text-sm text-gray-500 mt-0.5">
                  Update employee details
                </p>
              </div>

              <Button
                onClick={() => setEditEmployee(null)}
                variant="ghost"
                iconLeft={<X className="w-5 h-5" />}
                className="p-2! hover:bg-gray-100! text-gray-400! hover:text-gray-600!"
              />
            </div>

            <div className="p-6">
              <EmployeeForm
                initialData={editEmployee}
                onSuccess={() => {
                  setEditEmployee(null);
                  fetchEmployees();
                }}
                onCancel={() => setEditEmployee(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
