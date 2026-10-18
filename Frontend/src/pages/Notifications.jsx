import { useState } from "react";

function Notifications() {
  const [isRead, setIsRead] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Notifications
        </h1>

        <p className="mt-2 text-gray-400">
          Stay updated with your team activities
        </p>
      </div>

      {/* Recent Notifications */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <h2 className="text-xl font-semibold">
          Recent Notifications
        </h2>

        <button
          onClick={() => setIsRead(true)}
          className="rounded-lg bg-violet-600 px-4 py-2 hover:bg-violet-700"
        >
          Mark All as Read
        </button>

      </div>

      {/* Notification 1 */}
      <div
        className={`mb-4 rounded-xl border ${
          isRead ? "border-gray-700" : "border-violet-500/40"
        } bg-gray-800 p-5`}
      >

        <div className="flex items-start gap-4">

          <div className="rounded-lg bg-violet-600/20 p-3">
            📁
          </div>

          <div className="flex-1">

            <div className="flex flex-wrap items-center gap-2">

              <h3 className="font-semibold">
                Project Updated
              </h3>

              {!isRead && (
                <span className="rounded-full bg-violet-600 px-2 py-1 text-xs">
                  Unread
                </span>
              )}

            </div>

            <p className="mt-2 text-gray-300">
              Rahul updated the Website Development project.
            </p>

            <p className="mt-3 text-sm text-gray-500">
              10 minutes ago
            </p>

          </div>

          {!isRead && (
            <span className="h-2 w-2 rounded-full bg-violet-500"></span>
          )}

        </div>

      </div>

      {/* Notification 2 */}
      <div className="mb-4 rounded-xl border border-gray-700 bg-gray-800 p-5">

        <div className="flex items-start gap-4">

          <div className="rounded-lg bg-green-600/20 p-3">
            ✅
          </div>

          <div className="flex-1">

            <h3 className="font-semibold">
              Task Completed
            </h3>

            <p className="mt-2 text-gray-300">
              Priya completed the Login Page design task.
            </p>

            <p className="mt-3 text-sm text-gray-500">
              1 hour ago
            </p>

          </div>

        </div>

      </div>

      {/* Notification 3 */}
      <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">

        <div className="flex items-start gap-4">

          <div className="rounded-lg bg-blue-600/20 p-3">
            💬
          </div>

          <div className="flex-1">

            <h3 className="font-semibold">
              New Message
            </h3>

            <p className="mt-2 text-gray-300">
              Aman sent you a message.
            </p>

            <p className="mt-3 text-sm text-gray-500">
              Yesterday
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Notifications;