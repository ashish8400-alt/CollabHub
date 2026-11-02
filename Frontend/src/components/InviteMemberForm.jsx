import { useState } from "react";

function InviteMemberForm({ onAddMember, onCancel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Member");
  const [designation, setDesignation] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !designation.trim()) {
      return;
    }

    const newMember = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      role,
      designation: designation.trim(),
      status: "Online",
    };

    onAddMember(newMember);
  }

  return (
    <div className="mb-8 rounded-xl border border-gray-700 bg-gray-800 p-6">
      <h2 className="mb-5 text-xl font-bold">
        Invite New Member
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="mb-4 w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white"
          required
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className="mb-4 w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white"
          required
        />

        <input
          type="text"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          placeholder="Designation (e.g. Developer)"
          className="mb-4 w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white"
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mb-5 w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white"
        >
          <option value="Admin">Admin</option>
          <option value="Member">Member</option>
        </select>

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-700"
          >
            Invite Member
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
    </div>
  );
}

export default InviteMemberForm;