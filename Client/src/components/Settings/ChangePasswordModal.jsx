import { Eye, EyeOff, LockIcon, X } from "lucide-react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import Button from "../Button";
import { InputField } from "../FormField/InputField";
import { changePasswordService } from "../../services/mutations";

const ChangePasswordModal = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");

    try {
      const data = await changePasswordService({
        currentPassword,
        newPassword,
      });

      if (data?.success) {
        e.target.reset();
      }
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 pb-0">
          <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <LockIcon className="w-5 h-5 text-gray-400" /> Change Password
          </h2>

          <Button
            onClick={onClose}
            variant="ghost"
            hoverRounded={false}
            iconLeft={<X className="w-5 h-5" />}
            className="p-2! text-gray-400! hover:text-gray-600! hover:bg-gray-100"
          />
        </div>

        <form className="p-6 space-y-5" onSubmit={handleSubmit}>
          <InputField
            label="Current Password"
            name="currentPassword"
            type={showCurrentPassword ? "text" : "password"}
            placeholder="********"
            required
            labelPosition="top"
            iconRight={
              <Button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                variant="ghost"
                hoverRounded={false}
                iconLeft={
                  showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />
                }
                className="text-gray-400! hover:text-gray-600! mt-1 -mr-4"
              />
            }
          />

          <InputField
            label="New Password"
            name="newPassword"
            type={showNewPassword ? "text" : "password"}
            placeholder="********"
            required
            labelPosition="top"
            iconRight={
              <Button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                variant="ghost"
                hoverRounded={false}
                iconLeft={
                  showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />
                }
                className="text-gray-400! hover:text-gray-600! mt-1 -mr-4"
              />
            }
          />

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              onClick={onClose}
              variant="secondary"
              text="Cancel"
              className="flex-1"
            />

            <Button
              type="submit"
              disabled={loading}
              text="Update Password"
              iconLeft={loading && <ClipLoader size={20} color="#FFFFFF" />}
              className="flex-1"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
