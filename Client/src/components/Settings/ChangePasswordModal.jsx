// Client / src / components / Settings / ChangePasswordModal.jsx
import { Eye, EyeOff, LockIcon, X } from "lucide-react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import Button from "../Button";
import { InputField } from "../FormField/InputField";

const ChangePasswordModal = ({ open, onClose }) => {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
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

          {/* <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button> */}

          <Button
            onClick={onClose}
            variant="ghost"
            hoverRounded={false}
            iconLeft={<X className="w-5 h-5" />}
            className="p-2! text-gray-400! hover:text-gray-600! hover:bg-gray-100"
          />
        </div>

        <form className="p-6 space-y-5" onSubmit={handleSubmit}>
          {message.text && (
            <div
              className={`p-3 rounded-xl text-sm flex items-start gap-3 ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                  message.type === "success" ? "bg-green-500" : "bg-red-500"
                }`}
              />
              {message.text}
            </div>
          )}

          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>

            <input type="password" name="currentPassword" required />
          </div> */}

          <InputField
            label="Current Password"
            name="currentPassword"
            type={showCurrentPassword ? "text" : "password"}
            placeholder="********"
            required
            labelPosition="top"
            iconRight={
              //   <button
              //     type="button"
              //     onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              //     className="text-gray-400 hover:text-gray-600 mt-2"
              //   >
              //     {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              //   </button>

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

          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>

            <input type="password" name="newPassword" required />
          </div> */}

          <InputField
            label="New Password"
            name="newPassword"
            type={showNewPassword ? "text" : "password"}
            placeholder="********"
            required
            labelPosition="top"
            iconRight={
              //   <button
              //     type="button"
              //     onClick={() => setShowNewPassword(!showNewPassword)}
              //     className="text-gray-400 hover:text-gray-600 mt-2"
              //   >
              //     {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              //   </button>

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
            {/* <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button> */}

            <Button
              type="button"
              onClick={onClose}
              variant="secondary"
              text="Cancel"
              className="flex-1"
            />

            {/* <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 flex justify-center items-center gap-2"
            >
              {loading && <ClipLoader size={20} color="#FFFFFF" />}
              Update Password
            </button> */}

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
