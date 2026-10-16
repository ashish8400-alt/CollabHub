
function Help() {
  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Help & Support</h1>
        <p className="mt-2 text-gray-400">
          Find answers and get help with CollabHub.
        </p>
      </div>

      <div className="mb-8 rounded-2xl border border-gray-700 bg-gray-800 p-6">
        <h2 className="mb-4 text-xl font-bold">
          How can we help you?
        </h2>

        <input
          type="text"
          placeholder="Search for help..."
          className="w-full rounded-xl border border-gray-700 bg-gray-900 p-4 outline-none focus:border-violet-500"
        />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
          <div className="mb-4 text-3xl">📁</div>
          <h2 className="font-bold">Projects</h2>
          <p className="mt-2 text-sm text-gray-400">
            Learn how to manage projects and collaborate with your team.
          </p>
        </div>

        <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
          <div className="mb-4 text-3xl">✅</div>
          <h2 className="font-bold">Tasks</h2>
          <p className="mt-2 text-sm text-gray-400">
            Understand task assignments, priorities and deadlines.
          </p>
        </div>

        <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
          <div className="mb-4 text-3xl">💬</div>
          <h2 className="font-bold">Messages</h2>
          <p className="mt-2 text-sm text-gray-400">
            Get help with team conversations and notifications.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
        <h2 className="mb-6 text-xl font-bold">
          Frequently Asked Questions
        </h2>

        <div className="border-b border-gray-700 py-5">
          <h3 className="font-semibold">
            How do I create a project?
          </h3>
          <p className="mt-2 text-sm text-gray-400">
            Open the Projects page to manage your team projects.
          </p>
        </div>

        <div className="border-b border-gray-700 py-5">
          <h3 className="font-semibold">
            How can I manage my tasks?
          </h3>
          <p className="mt-2 text-sm text-gray-400">
            Visit My Tasks to view your assigned work and deadlines.
          </p>
        </div>

        <div className="py-5">
          <h3 className="font-semibold">
            How do I contact support?
          </h3>
          <p className="mt-2 text-sm text-gray-400">
            Contact support when you need assistance with your workspace.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Help;

