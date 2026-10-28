import { useState } from "react";

function AddEventForm({ onAddEvent, onCancel }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim() || !date || !time) {
      return;
    }

    onAddEvent({
      title: title.trim(),
      date,
      description: description.trim(),
      time,
    });
  }

  return (
    <div className="mb-6 rounded-xl border border-gray-700 bg-gray-900 p-5">
      <h3 className="mb-5 text-xl font-bold">Create New Event</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event title"
          className="mb-4 w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white outline-none focus:border-violet-500"
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mb-4 w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white outline-none focus:border-violet-500"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Event description"
          rows="3"
          className="mb-4 w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white outline-none focus:border-violet-500"
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="mb-5 w-full rounded-lg border border-gray-700 bg-gray-800 p-3 text-white outline-none focus:border-violet-500"
          required
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-700"
          >
            Add Event
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

export default AddEventForm;