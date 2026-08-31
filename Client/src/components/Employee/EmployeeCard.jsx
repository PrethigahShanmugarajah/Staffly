// Client / src / components / Employee / EmployeeCard.jsx
import { PencilIcon, Trash2Icon } from "lucide-react";
import Button from "../Button";
import { useState } from "react";
import ConfirmPopup from "../ConfirmPopup";
import { deleteEmployeeService } from "../../services/mutations";

const EmployeeCard = ({ employee, onDelete, onEdit }) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // const handleDelete = async () => {
  //   if (!confirm("Are you sure want o delete this employee?")) return;
  // };

  const handleDelete = async () => {
    setShowDeletePopup(true);
  };

  // const handleConfirmDelete = async () => {
  //   setDeleteLoading(true);

  //   try {
  //     await api.delete(`/api/employees/${employee.id}`);

  //     setShowDeletePopup(false);
  //     onDelete();
  //   } catch (error) {
  //     toast.error(error.response?.data?.error || error.message);
  //   } finally {
  //     setDeleteLoading(false);
  //     setShowDeletePopup(false);
  //   }
  // };

  const handleConfirmDelete = async () => {
    setDeleteLoading(true);

    try {
      await deleteEmployeeService(employee.id);

      onDelete();
    } finally {
      setDeleteLoading(false);
      setShowDeletePopup(false);
    }
  };

  return (
    <div className="group relative bg-white rounded-lg border border-gray-200/70 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden cursor-pointer">
      <div className="relative aspect-4/3 w-full overflow-hidden bg-linear-to-br from-gray-100 to-gray-50">
        <div className="w-full h-full flex items-center justify-center">
          {/* -------- Circle Icons -------- */}
          <div className="w-20 h-20 rounded-full bg-linear-to-br from-teal-100 to-gray-100 flex items-center justify-center">
            <span className="text-2xl font-medium text-teal-400">
              {employee.firstName[0]} {employee.lastName[0]}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute top-3 left-3 flex gap-2">
        <span className="bg-white/90 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-gray-600 rounded-lg shadow-sm">
          {employee.department || "Remote"}
        </span>

        {employee.isDeleted && (
          <span className="bg-rose-500/60 font-medium text-white px-2.5 py-1 text-xs rounded">
            DELETED
          </span>
        )}
      </div>

      {!employee.isDeleted && (
        <div className="absolute inset-0 bg-linear-to-t from-teal-700/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6 gap-3">
          {/* <button
            onClick={() => onEdit(employee)}
            className="p-2.5 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-teal-600 rounded-xl shadow-lg transition-all hover:scale-105"
          >
            <PencilIcon className="w-4 h-4" />
          </button> */}

          <Button
            onClick={() => onEdit(employee)}
            variant="ghost"
            color="teal"
            size="s"
            hoverRounded={false}
            iconLeft={<PencilIcon className="w-4 h-4" />}
            className="p-2.5! bg-white/90 backdrop-blur-sm! text-gray-700! hover:text-teal-600! shadow-lg transition-all hover:scale-105"
          />

          {/* <button
            onClick={handleDelete}
            className="p-2.5 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-red-600 rounded-xl shadow-lg transition-all hover:scale-105"
          >
            <Trash2Icon className="w-4 h-4" />
          </button> */}

          <Button
            onClick={handleDelete}
            variant="ghost"
            size="s"
            hoverRounded={false}
            iconLeft={<Trash2Icon className="w-4 h-4" />}
            className="p-2.5! bg-white/90 backdrop-blur-sm! text-gray-700 hover:text-red-600! shadow-lg transition-all hover:scale-105"
          />
        </div>
      )}

      <div className="p-5">
        <h3 className="text-gray-900">
          {employee.firstName} {employee.lastName}
        </h3>

        <p className="text-xs text-gray-500">{employee.position}</p>
      </div>

      {showDeletePopup && (
        <ConfirmPopup
          onClose={() => setShowDeletePopup(false)}
          onConfirm={handleConfirmDelete}
          loading={deleteLoading}
          item={`${employee.firstName} ${employee.lastName}`}
          title="Delete Employee"
          children={
            <>
              Are you sure you want to delete{" "}
              <b>
                {employee.firstName} {employee.lastName}
              </b>
              ?
            </>
          }
          confirmText="Delete"
          closeText="Cancel"
        />
      )}
    </div>
  );
};

export default EmployeeCard;
