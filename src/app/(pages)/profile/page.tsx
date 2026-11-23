"use client";

import { useState } from "react";
import {
  UserRound,
  Settings,
  MapPin,
  LockKeyhole,
  Eye,
  EyeOff,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import changePassword from "@/actions/changePassword.actions";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

interface AccountSettingsProps {
  user?: {
    name: string;
    email: string;
    phone: string;
    role?: string;
    status?: string;
  };
}

export default function AccountSettings() {


  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  async function handleChangePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await changePassword({
        currentPassword,
        password: newPassword,
        rePassword: confirmPassword,
      });

      toast.success("Password changed successfully!");

      await signOut({
        callbackUrl: "/login",
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  }
  const togglePassword = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-100";

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-gradient-to-r from-green-600 to-emerald-400 px-5 py-8 text-white md:px-10">
        <div className="mx-auto flex max-w-7xl items-center gap-4">
          <div className="flex size-12 items-center justify-center rounded-xl bg-white/20">
            <UserRound size={25} />
          </div>

          <div>
            <h1 className="text-xl font-bold md:text-2xl">My Account</h1>
            <p className="mt-1 text-xs text-green-50 md:text-sm">
              Manage your personal information and account settings
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-7 md:grid-cols-[220px_minmax(0,1fr)] md:px-6">
        <aside>
          <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
            <h3 className="mb-3 px-2 text-xs font-bold text-gray-800">
              My Account
            </h3>

            <nav className="space-y-1">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm text-gray-500 transition hover:bg-gray-50"
              >
                <span className="flex items-center gap-3">
                  <MapPin size={17} />
                  My Addresses
                </span>
                <ChevronRight size={15} />
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg bg-green-50 px-3 py-3 text-sm font-semibold text-green-600"
              >
                <span className="flex items-center gap-3">
                  <Settings size={17} />
                  Settings
                </span>
                <ChevronRight size={15} />
              </button>
            </nav>
          </div>
        </aside>

        <section className="min-w-0">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-gray-900">
              Account Settings
            </h2>
            <p className="mt-1 text-xs text-gray-400">
              Update your profile information and manage your account security
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm md:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <LockKeyhole size={20} />
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-800">
                  Change Password
                </h3>
                <p className="mt-1 text-xs text-gray-400">
                  Update your password to keep your account secure
                </p>
              </div>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-gray-600">
                  Current Password
                </label>

                <div className="relative">
                  <input
                    type={showPasswords.current ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter your current password"
                    className={`${inputClass} pr-11`}
                  />

                  <button
                    type="button"
                    onClick={() => togglePassword("current")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Toggle current password visibility"
                  >
                    {showPasswords.current ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-gray-600">
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                    className={`${inputClass} pr-11`}
                  />

                  <button
                    type="button"
                    onClick={() => togglePassword("new")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Toggle new password visibility"
                  >
                    {showPasswords.new ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-gray-600">
                  Confirm New Password
                </label>

                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    className={`${inputClass} pr-11`}
                  />

                  <button
                    type="button"
                    onClick={() => togglePassword("confirm")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showPasswords.confirm ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-3 text-xs font-semibold text-white transition hover:bg-amber-700"
              >
                <ShieldCheck size={15} />
                Change Password
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
