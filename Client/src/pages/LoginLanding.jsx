// Client / src / pages / LoginLanding.jsx
import LoginLeftSide from "../components/Login/LoginLeftSide";
import { ArrowRightIcon, ShieldIcon, UserIcon } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Loading from "../components/Loading";

const LoginLanding = () => {
  const { user, loading } = useAppContext();

  if (loading) return <Loading size="xl" />;

  if (!user) return <Navigate to="/login" />;

  const portalOptions = [
    {
      to: "/login/admin",
      title: "Admin Portal",
      description:
        "Manage employees, monitor attendance, and oversee your organization from one central dashboard.",
      icon: ShieldIcon,
    },

    {
      to: "/login/employee",
      title: "Employee Portal",
      description:
        "Access your profile, view attendance, manage your information, and stay connected with your workplace.",
      icon: UserIcon,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <LoginLeftSide />

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12 lg:p-16 relative overflow-y-auto min-h-screen">
        <div className="w-full max-w-md animate-fade-in relative z-10">
          {/* -------- Header -------- */}
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-medium text-gray-900 tracking-tight mb-3">
              Welcome Back
            </h2>

            <p className="text-gray-500 text-justify">
              Choose your portal to access Staffly and manage your employee
              information, attendance, and workplace activities with ease.
            </p>
          </div>

          {/* -------- Portals List -------- */}
          <div className="space-y-4">
            {portalOptions.map((portal) => (
              <Link
                key={portal.to}
                to={portal.to}
                className="group block bg-gray-50 border border-gray-200 rounded-lg p-5 sm:p-6 transition-all duration-300 hover:border-teal-400 hover:bg-teal-50"
              >
                <div className="relative z-10 flex items-center justify-between gap-4 sm:gap-5">
                  <h3 className="text-lg text-gray-800 group-hover:text-teal-600 mb-1 transition-colors">
                    {portal.title}
                  </h3>

                  <ArrowRightIcon className="w-4 h-4 text-gray-400 group-hover:text-teal-600 group-hover:trangray-x-1 transition-all duration-300" />
                </div>
              </Link>
            ))}
          </div>

          {/* -------- Footer -------- */}
          <div className="mt-12 text-center md:text-left text-sm text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Staffly. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLanding;
