import { useState } from "react";

function ChangePasswordForm({ onCancel, onSubmit }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    onSubmit();

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <input
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        placeholder="Current password"
        className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white outline-none focus:border-violet-500"
        required
      />

      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New password (minimum 8 characters)"
        className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white outline-none focus:border-violet-500"
        required
      />

      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm new password"
        className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 text-white outline-none focus:border-violet-500"
        required
      />

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-lg bg-violet-600 px-5 py-3 hover:bg-violet-700"
        >
          Update Password
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-600 px-5 py-3 hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ChangePasswordForm;