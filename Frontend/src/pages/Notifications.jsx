import { useEffect, useState } from "react";
import {
  getMyNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../services/notificationService";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyNotifications()
      .then((data) => setNotifications(data.data || []))
      .catch((err) => setError(err.response?.data?.message || "Failed to load notifications"));
  }, []);

  async function handleMarkAllRead() {
    try {
      await markAllNotificationsAsRead();
      setNotifications((previous) =>
        previous.map((notification) => ({ ...notification, isRead: true }))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update notifications");
    }
  }

  async function handleMarkRead(id) {
    try {
      await markNotificationAsRead(id);
      setNotifications((previous) =>
        previous.map((notification) =>
          notification._id === id ? { ...notification, isRead: true } : notification
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update notification");
    }
  }

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  return (
    <div className="mobile-content-padding min-h-full p-6 text-white md:p-8">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Notifications</h1>

        <p className="mt-2 text-gray-400">
          Stay updated with your team activities
        </p>
      </div>
      {error && <p className="mb-4 text-red-400">{error}</p>}

      {/* Recent Notifications */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">
            Recent Notifications
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            {unreadCount} unread notifications
          </p>
        </div>

        <button
          onClick={handleMarkAllRead}
          disabled={unreadCount === 0}
          className="rounded-lg bg-violet-600 px-4 py-2 hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Mark All as Read
        </button>
      </div>

      {/* Notification Cards */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification._id}
            className={`rounded-xl border p-5 ${
              notification.isRead
                ? "border-gray-700 bg-gray-800"
                : "border-violet-500/40 bg-gray-800"
            }`}
          >
            <div className="flex items-start gap-4">

              <div className="rounded-lg bg-violet-600/20 p-3">
                {notification.type === "MESSAGE" ? "💬" : notification.type === "TASK_COMPLETED" ? "✅" : "📁"}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">
                    {notification.type?.replaceAll("_", " ") || "Notification"}
                  </h3>

                  {!notification.isRead && (
                    <span className="rounded-full bg-violet-600 px-2 py-1 text-xs">
                      Unread
                    </span>
                  )}
                </div>

                <p className="mt-2 text-gray-300">
                  {notification.message}
                </p>

                <p className="mt-3 text-sm text-gray-500">
                  {notification.createdAt
                    ? new Date(notification.createdAt).toLocaleString()
                    : ""}
                </p>

                {!notification.isRead && (
                  <button
                    onClick={() => handleMarkRead(notification._id)}
                    className="mt-3 text-sm text-violet-400 hover:text-violet-300"
                  >
                    Mark as Read
                  </button>
                )}
              </div>

              {!notification.isRead && (
                <span className="h-2 w-2 shrink-0 rounded-full bg-violet-500"></span>
              )}

            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="rounded-xl border border-gray-700 bg-gray-800 p-8 text-center">
            <p className="text-gray-400">
              No notifications available.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}

export default Notifications;