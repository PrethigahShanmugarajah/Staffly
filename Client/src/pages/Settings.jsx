// Client / src / pages / Settings.jsx
import { useEffect, useState } from "react";
import { dummyProfileData } from "../assets/assets";
import Loading from "../components/Loading";
import { Lock } from "lucide-react";
import ProfileForm from "../components/Settings/ProfileForm";
import ChangePasswordModal from "../components/Settings/ChangePasswordModal";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";

const Settings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const fetchProfile = async () => {
    setProfile(dummyProfileData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProfile();
  }, []);

  if (loading) return <Loading size="xl" />;

  return (
    <div className="animate-fade-in">
      {/* <div className="mb-8">
        <h1 className="text-2xl font-medium text-gray-900 tracking-tight">
          Settings
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Manage your account and preferences
        </p>
      </div> */}

      <PageHeader
        title="Settings"
        subtitle="Manage your account and preferences"
      />

      {profile && (
        <ProfileForm initialData={profile} onSuccess={fetchProfile} />
      )}

      {/* -------- Change Password Trigger -------- */}
      <div className="card max-w-md p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gray-100 rounded-lg">
            <Lock className="w-5 h-5 text-gray-600" />
          </div>

          <div>
            <p className="font-medium text-gray-900">Password</p>

            <p className="text-sm text-gray-500">
              Update your account password
            </p>
          </div>
        </div>

        {/* <button
          onClick={() => setShowPasswordModal(true)}
          className="bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-md text-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 text-sm"
        >
          Change
        </button> */}

        <Button
          onClick={() => setShowPasswordModal(true)}
          variant="secondary"
          text="Change"
        />
      </div>

      <ChangePasswordModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
};

export default Settings;
