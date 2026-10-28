import { useState } from "react";
import ChangePasswordForm from "../components/ChangePasswordForm";

function Settings() {
  const [fullName, setFullName] = useState("Ashish");
  const [email, setEmail] = useState("ashish@example.com");
  const [saved, setSaved] = useState(false);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  const [emailNotifications, setEmailNotifications] = useState(true);

  function handleSaveChanges(e) {
    e.preventDefault();
    setSaved(true);
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">

      {/* Page Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>

        <p className="mt-2 text-gray-400">
          Manage your account and profile
        </p>
      </div>

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
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSaved(false);
                }}
                className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 outline-none focus:border-violet-500"
                required
              />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-violet-600 px-5 py-3 font-medium hover:bg-violet-700"
            >
              Save Changes
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
              onSubmit={() => {
                setShowPasswordForm(false);
                setPasswordMessage(
                  "Form validated. Connect the backend to update your actual password."
                );
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

      </div>
    </div>
  );
}

export default Settings;