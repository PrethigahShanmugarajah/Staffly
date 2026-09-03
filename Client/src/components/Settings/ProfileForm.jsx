import { Save, User } from "lucide-react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import Button from "../Button";
import { InputField } from "../FormField/InputField";
import { TextAreaField } from "../FormField/TextAreaField";
import { updateProfileService } from "../../services/mutations";
import { useAppContext } from "../../context/appContext";

const ProfileForm = ({ initialData, onSuccess }) => {
  const { user } = useAppContext();
  const isAdmin = user?.role === "ADMIN";

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    try {
      await updateProfileService(formData);
      onSuccess?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg border border-gray-200/70 p-5 sm:p-6 mb-6"
    >
      <h2 className="text-base font-medium text-gray-900 mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
        <User className="w-5 h-5 text-gray-400" /> Public Profile
      </h2>

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            label="Name"
            name="name"
            type="text"
            disabled
            value={`${initialData?.firstName || ""} ${initialData?.lastName || ""}`}
            labelPosition="top"
            size="xs"
            inputClassName="bg-gray-50! text-gray-400! cursor-not-allowed!"
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            disabled
            value={initialData?.email || ""}
            labelPosition="top"
            size="xs"
            inputClassName="bg-gray-50! text-gray-400! cursor-not-allowed!"
          />

          <div className="sm:col-span-2">
            <InputField
              label="Position"
              name="position"
              type="text"
              disabled
              value={initialData?.position || ""}
              labelPosition="top"
              size="xs"
              inputClassName="bg-gray-50! text-gray-400! cursor-not-allowed!"
            />
          </div>
        </div>

        {!isAdmin && (
          <div>
            <TextAreaField
              label="Bio"
              name="bio"
              defaultValue={initialData?.bio || ""}
              placeholder="Write your brief bio..."
              disabled={initialData?.isDeleted}
              labelPosition="top"
              textareaClassName={
                initialData?.isDeleted
                  ? "bg-gray-50! text-gray-400! cursor-not-allowed!"
                  : ""
              }
            />

            <p className="text-xs text-gray-400 mt-1.5">
              This will be displayed on your profile.
            </p>
          </div>
        )}

        {isAdmin ? null : initialData?.isDeleted ? (
          <div className="pt-2">
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-center">
              <p className="text-red-600 font-medium tracking-tight">
                Account Deactivated
              </p>

              <p className="text-sm text-red-500 mt-0.5">
                You can no longer update your profile.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={loading}
              text="Save Changes"
              iconLeft={
                loading ? <ClipLoader size={20} color="#FFFFFF" /> : <Save />
              }
              className="w-full sm:w-auto"
            />
          </div>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
