// Client / src / components / Settings / ProfileForm.jsx
import { Save, User } from "lucide-react";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import Button from "../Button";
import { InputField } from "../FormField/InputField";
import { TextAreaField } from "../FormField/TextAreaField";

// eslint-disable-next-line no-unused-vars
const ProfileForm = ({ initialData, onSuccess }) => {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg border border-gray-200/70 p-5 sm:p-6 mb-6"
    >
      <h2 className="text-base font-medium text-gray-900 mb-6 pb-4 border-b border-gray-100 flex items-center gap-2">
        <User className="w-5 h-5 text-gray-400" /> Public Profile
      </h2>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm border border-red-200 mb-6 flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
          {error}
        </div>
      )}

      {message && (
        <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm border border-red-200 mb-6 flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
          {message}
        </div>
      )}

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>

            <input
              type="text"
              disabled
              value={`${initialData.firstName} ${initialData.lastName}`}
              className="bg-gray-50 text-gray-400 cursor-not-allowed"
            />
          </div> */}

          <InputField
            label="Name"
            name="name"
            type="text"
            disabled
            value={`${initialData.firstName} ${initialData.lastName}`}
            labelPosition="top"
            size="xs"
            inputClassName="bg-gray-50! text-gray-400! cursor-not-allowed!"
          />

          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              disabled
              value={initialData.email}
              className="bg-gray-50 text-gray-400 cursor-not-allowed"
            />
          </div> */}

          <InputField
            label="Email"
            name="email"
            type="email"
            disabled
            value={initialData.email}
            labelPosition="top"
            size="xs"
            inputClassName="bg-gray-50! text-gray-400! cursor-not-allowed!"
          />

          {/* <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Position
            </label>

            <input
              type="text"
              disabled
              value={initialData.position}
              className="bg-gray-50 text-gray-400 cursor-not-allowed"
            />
          </div> */}

          <div className="sm:col-span-2">
            <InputField
              label="Position"
              name="position"
              type="text"
              disabled
              value={initialData.position}
              labelPosition="top"
              size="xs"
              inputClassName="bg-gray-50! text-gray-400! cursor-not-allowed!"
            />
          </div>
        </div>

        <div>
          {/* <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>

          <textarea
            disabled={initialData.isDeleted}
            name="bio"
            defaultValue={initialData.bio || ""}
            placeholder="Write your brief bio..."
            className={`resize-none ${initialData.isDeleted ? "bg-gray-50 text-gray-400 cursor-not-allowed" : ""}`}
          /> */}

          <TextAreaField
            label="Bio"
            name="bio"
            defaultValue={initialData.bio || ""}
            placeholder="Write your brief bio..."
            disabled={initialData.isDeleted}
            labelPosition="top"
            textareaClassName={
              initialData.isDeleted
                ? "bg-gray-50! text-gray-400! cursor-not-allowed!"
                : ""
            }
          />

          <p className="text-xs text-gray-400 mt-1.5">
            This will be displayed on your profile.
          </p>
        </div>

        {initialData.isDeleted ? (
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
            {/* <button
              type="submit"
              disabled={loading}
              className="bg-linear-to-r from-teal-600 to-teal-500 text-white px-5 py-2.5 rounded-md text-sm hover:from-teal-700 hover:to-teal-600 transition-all duration-200 shadow-md shadow-teal-500/25 active:scale-[0.98] flex items-center gap-2 justify-center w-full sm:w-auto"
            >
              {loading ? <ClipLoader size={20} color="#FFFFFF" /> : <Save />}{" "}
              Save Changes
            </button> */}

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
