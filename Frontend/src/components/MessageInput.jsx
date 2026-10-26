import { useState } from "react";

function MessageInput({ onSend }) {
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (message.trim() === "") {
      return;
    }

    onSend(message);
    setMessage("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 border-t border-gray-700 pt-4"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="min-w-0 flex-1 rounded-lg border border-gray-600 bg-gray-900 p-3 text-white outline-none focus:border-violet-500"
      />

      <button
        type="submit"
        className="rounded-lg bg-violet-600 px-5 py-3 font-medium hover:bg-violet-700"
      >
        Send
      </button>
    </form>
  );
}

export default MessageInput;