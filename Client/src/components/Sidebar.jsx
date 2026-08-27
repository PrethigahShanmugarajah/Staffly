// Client / src / components / Sidebar.jsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { dummyProfileData } from "../assets/assets";
import {
  CalendarIcon,
  ChevronRightIcon,
  DollarSignIcon,
  FileTextIcon,
  LayoutGridIcon,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import Button from "./Button";

const Sidebar = () => {
  const { pathname } = useLocation();
  const [userName, setUserName] = useState();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserName(dummyProfileData.firstName + "" + dummyProfileData.lastName);
  }, []);

  /* -------- Close Mobile Sidebar on route Change -------- */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [pathname]);

  // eslint-disable-next-line no-constant-binary-expression
  const role = "ADMIN" || "EMPLOYEE";

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutGridIcon },
    role === "ADMIN"
      ? { name: "Employees", href: "/employees", icon: UserIcon }
      : { name: "Attendance", href: "/attendance", icon: CalendarIcon },
    { name: "Leave", href: "/leave", icon: FileTextIcon },
    { name: "Payslips", href: "/payslips", icon: DollarSignIcon },
    { name: "Settings", href: "/settings", icon: SettingsIcon },
  ];

  const handleLogout = () => {
    window.location.href = "/login";
  };

  const sidebarContent = (
    <>
      {/* -------- Brand Header -------- */}
      <div className="px-5 pt-6 pb-5 border-b border-white/6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserIcon className="text-white size-7" />

            <div>
              <p className="font-semibold text-[13px] text-white tracking-wide">
                Employee MS
              </p>

              <p className="text-[11px] text-gray-500 font-medium">
                Management System
              </p>
            </div>
          </div>

          {/* -------- Close Button on Mobile -------- */}
          {/* <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white p-1"
          >
            <XIcon size={20} />
          </button> */}
          <Button
            type="button"
            variant="ghost"
            hoverRounded={false}
            onClick={() => setMobileOpen(false)}
            iconLeft={<XIcon size={20} />}
            className="lg:hidden text-gray-400 hover:text-white p-1!"
          />
        </div>
      </div>

      {/* -------- User Profile Card -------- */}
      {userName && (
        <div className="mx-3 mt-4 mb-1 p-3 rounded-lg bg-white/3 border border-white/4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center ring-1 ring-white/10 shrink-0">
              <span className="text-gray-400 text-xs font-semibold">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>

            <div className="min-w-0">
              <p className="text-[13px] font-medium text-gray-200 truncate">
                {userName}
              </p>

              <p className="text-[11px] text-gray-500 truncate">
                {role === "ADMIN" ? "Administrator" : "Employee"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* -------- Section Label -------- */}
      <div className="px-5 pt-5 pb-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500">
          Navigation
        </p>
      </div>

      {/* -------- Navigation List -------- */}
      <div className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] font-medium transition-all duration-150 relative ${
                isActive
                  ? "bg-teal-500/12 text-teal-300"
                  : "text-gray-300 hover:text-white hover:bg-white/4"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-5 rounded-r-full bg-teal-500" />
              )}

              <item.icon
                className={`w-4.25 h-4.25 shrink-0 ${
                  isActive
                    ? "text-teal-300"
                    : "text-gray-400 group-hover:text-gray-300"
                }`}
              />

              <span className="flex-1">{item.name}</span>

              {isActive && (
                <ChevronRightIcon className="w-3.5 h-3.5 text-teal-500/50" />
              )}
            </Link>
          );
        })}
      </div>

      {/* -------- Logout -------- */}
      <div className="p-3 border-t border-white/6">
        {/* <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-[13px] font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/8 transition-all duration-150"
        >
          <LogOutIcon className="w-4.25 h-4.25" />
          <span>Logout</span>
        </button> */}

        <Button
          type="button"
          variant="ghost"
          hoverRounded={false}
          onClick={handleLogout}
          text="Logout"
          iconLeft={<LogOutIcon className="w-4.25 h-4.25" />}
          className="w-full text-gray-400 hover:text-red-400 hover:bg-red-500/8"
        />
      </div>
    </>
  );

  return (
    <>
      {/* -------- Mobile Hamburger Button -------- */}
      {/* <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded-lg shadow-lg border border-white/10"
      >
        <MenuIcon size={20} />
      </button> */}

      <Button
        type="button"
        variant="primary"
        color="black"
        hoverRounded={false}
        onClick={() => setMobileOpen(true)}
        iconLeft={<MenuIcon size={20} />}
        className="lg:hidden fixed top-4 left-4 z-50 p-2!"
      />

      {/* -------- Mobile Overlay -------- */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* -------- Sidebar - Desktop -------- */}
      <aside className="hidden lg:flex flex-col h-full w-65 bg-linear-to-b from-gray-900 via-gray-900 to-gray-950 text-white shrink-0 border-r border-white/4">
        {sidebarContent}
      </aside>

      {/* -------- Sidebar - Mobile -------- */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 w-72 bg-linear-to-b from-gray-900 via-gray-900 to-gray-950 text-white z-50 flex flex-col transform transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
