function MessageList({ messages, onDeleteMessage }) {
  return (
    <div className="flex min-h-80 flex-col gap-4 py-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender === "me"
              ? "justify-end"
              : "justify-start"
          }`}
        >
          <div
            className={`max-w-xs rounded-xl p-4 ${
              message.sender === "me"
                ? "bg-violet-600"
                : "bg-gray-700"
            }`}
          >
            <p>{message.text}</p>

              <p className="mt-2 text-right text-xs text-gray-300">
  {message.time || ""}
</p>

            {message.sender === "me" && (
              <button
                onClick={() => onDeleteMessage(message.id)}
                className="mt-2 text-xs text-violet-200 underline hover:text-white"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}

      {messages.length === 0 && (
        <p className="text-center text-gray-400">
          No messages yet. Start a conversation!
        </p>
      )}
    </div>
  );
}

export default MessageList;