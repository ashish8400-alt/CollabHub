import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangePasswordForm from "../components/ChangePasswordForm";
import { getMyProfile, updateMyProfile, changePassword } from "../services/profileService";
import useAuth from "../context/useAuth";

function Settings() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [error, setError] = useState("");
  const { updateUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getMyProfile()
      .then((data) => {
        setFullName(data.user?.name || "");
        setEmail(data.user?.email || "");
      })
      .catch((err) => setError(err.response?.data?.message || "Failed to load profile"));
  }, []);

  async function handleSaveChanges(e) {
    e.preventDefault();
    try {
      const data = await updateMyProfile(fullName);
      updateUser({ name: data.user.name });
      setSaved(true);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    }
  }

  function handleLogout() {
    if (!window.confirm("Are you sure you want to log out?")) return;
    logout();
    navigate("/", { replace: true });
  }

  return (
    <div className="mobile-content-padding min-h-full p-6 text-white md:p-8">

      {/* Page Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>

        <p className="mt-2 text-gray-400">
          Manage your account and profile
        </p>
      </div>

      {error && <p className="mb-6 text-sm text-red-400">{error}</p>}

      <div className="max-w-3xl space-y-6">

        {/* Profile Information */}
        <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
          <h2 className="mb-5 text-xl font-semibold">
            Profile Information
          </h2>

          <form onSubmit={handleSaveChanges}>
            <div className="mb-5">
              <label className="mb-2 block text-sm text-gray-300">
                Full Name
              </label>

              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  setSaved(false);
                }}
                className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 outline-none focus:border-violet-500"
                required
              />
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-sm text-gray-300">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                readOnly
                className="w-full cursor-not-allowed rounded-lg border border-gray-600 bg-gray-900 p-3 text-gray-400 outline-none"
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-violet-600 px-5 py-3 font-medium hover:bg-violet-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/settings/profile/edit")}
              className="ml-3 rounded-lg border border-gray-600 px-5 py-3 font-medium hover:bg-gray-700"
            >
              Open Profile Editor
            </button>

            {saved && (
              <p className="mt-4 text-sm text-green-400">
                Profile information saved successfully!
              </p>
            )}
          </form>
        </div>

        {/* Account Security */}
        <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
          <h2 className="mb-5 text-xl font-semibold">
            Account Security
          </h2>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-medium">Password</p>

              <p className="mt-1 text-sm text-gray-400">
                Change your account password
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowPasswordForm(!showPasswordForm);
                setPasswordMessage("");
              }}
              className="rounded-lg border border-gray-600 px-4 py-2 hover:bg-gray-700"
            >
              {showPasswordForm ? "Cancel" : "Change Password"}
            </button>
          </div>

          {showPasswordForm && (
            <ChangePasswordForm
              onCancel={() => setShowPasswordForm(false)}
              onSubmit={async (currentPassword, newPassword) => {
                try {
                  await changePassword(currentPassword, newPassword);
                  setShowPasswordForm(false);
                  setPasswordMessage("Password changed successfully.");
                  setError("");
                } catch (err) {
                  setError(err.response?.data?.message || "Failed to change password");
                  throw err;
                }
              }}
            />
          )}

          {passwordMessage && (
            <p className="mt-4 text-sm text-yellow-400">
              {passwordMessage}
            </p>
          )}
        </div>

        {/* Preferences */}
        <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
          <h2 className="mb-3 text-xl font-semibold">
            Preferences
          </h2>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium">Email Notifications</p>

              <p className="mt-1 text-sm text-gray-400">
                Receive updates about your projects
              </p>
            </div>

            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) =>
                setEmailNotifications(e.target.checked)
              }
              className="h-5 w-5 accent-violet-600"
            />
          </div>
        </div>

        {/* Logout */}
        <div className="rounded-xl border border-red-500/30 bg-gray-800 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Logout</h2>
              <p className="mt-1 text-sm text-gray-400">
                End your current CollabHub session.
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-red-500/50 px-5 py-3 font-medium text-red-400 hover:bg-red-500/10"
            >
              Logout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Settings;