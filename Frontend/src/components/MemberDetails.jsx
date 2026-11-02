function MemberDetails({ member, onClose }) {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-gray-700 bg-gray-800 p-6 text-white">

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Member Profile</h2>

          <button
            onClick={onClose}
            className="rounded-lg px-3 py-2 hover:bg-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600 text-2xl font-bold">
            {member.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-gray-400">{member.designation}</p>
          </div>
        </div>

        <div className="space-y-4 border-t border-gray-700 pt-5">
          <p>Email: {member.email}</p>
          <p>Role: {member.role}</p>
          <p>Status: {member.status}</p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-violet-600 py-3 font-semibold hover:bg-violet-700"
        >
          Close
        </button>

      </div>
    </div>
  );
}

export default MemberDetails;