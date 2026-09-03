import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { Lock } from "lucide-react";
import ProfileForm from "../components/Settings/ProfileForm";
import ChangePasswordModal from "../components/Settings/ChangePasswordModal";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import { useAppContext } from "../context/appContext";
import { fetchProfileService } from "../services/fetch";

const Settings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const { user } = useAppContext();

  const fetchProfile = async () => {
    try {
      const data = await fetchProfileService();
      if (data?.profile) setProfile(data.profile);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  if (loading) return <Loading size="xl" />;

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Settings"
        subtitle="Manage your account and preferences"
      />

      {profile && (
        <ProfileForm initialData={profile} onSuccess={fetchProfile} />
      )}

      {/* -------- Change Password Trigger -------- */}
      <div className="bg-white rounded-lg border border-gray-200/70 max-w-md p-6 flex items-center justify-between">
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
