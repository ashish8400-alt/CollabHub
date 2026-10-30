import { useState } from "react";
import AddEventForm from "../components/AddEventForm";
import EventSearch from "../components/EventSearch";

function Calendar() {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Team Meeting",
      date: "2026-10-17",
      description: "Project progress discussion",
      time: "10:00",
    },
    {
      id: 2,
      title: "Project Deadline",
      date: "2026-10-20",
      description: "Complete the website development",
      time: "17:00",
    },
    {
      id: 3,
      title: "Design Review",
      date: "2026-10-25",
      description: "Review the final UI designs",
      time: "14:00",
    },
  ]);

  // Add Event
  function handleAddEvent(event) {
    setEvents((previousEvents) => [
      ...previousEvents,
      { ...event, id: Date.now() },
    ]);

    setShowForm(false);
  }

  // Delete Event
  function handleDeleteEvent(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (confirmDelete) {
      setEvents((previousEvents) =>
        previousEvents.filter((event) => event.id !== id)
      );
    }
  }

  // Edit Event
  function handleEditEvent(event) {
    const title = window.prompt(
      "Enter event title:",
      event.title
    );

    if (title === null || title.trim() === "") return;

    const description = window.prompt(
      "Enter description:",
      event.description
    );

    if (description === null) return;

    const date = window.prompt(
      "Enter date (YYYY-MM-DD):",
      event.date
    );

    if (date === null || date.trim() === "") return;

    const time = window.prompt(
      "Enter time (HH:MM):",
      event.time
    );

    if (time === null || time.trim() === "") return;

    setEvents((previousEvents) =>
      previousEvents.map((item) =>
        item.id === event.id
          ? {
              ...item,
              title: title.trim(),
              description: description.trim(),
              date: date.trim(),
              time: time.trim(),
            }
          : item
      )
    );
  }

  // Search Events
  const filteredEvents = events.filter((event) =>
    (event.title + " " + event.description)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Sort Events
  const sortedEvents = [...filteredEvents].sort(
    (a, b) =>
      a.date.localeCompare(b.date) ||
      a.time.localeCompare(b.time)
  );

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white md:p-8">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Team Calendar
        </h1>

        <p className="mt-2 text-gray-400">
          Keep track of your meetings, tasks and deadlines.
        </p>
      </div>

      {/* Calendar and Events */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Monthly Calendar */}
        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 xl:col-span-2">

          <div className="mb-6 flex items-center justify-between">
            <button className="rounded-lg bg-gray-700 px-4 py-2 hover:bg-gray-600">
              ←
            </button>

            <h2 className="text-xl font-bold">
              October 2026
            </h2>

            <button className="rounded-lg bg-gray-700 px-4 py-2 hover:bg-gray-600">
              →
            </button>
          </div>

          {/* Week Days */}
          <div className="mb-3 grid grid-cols-7 gap-2 text-center text-sm text-gray-400">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Calendar Dates */}
          <div className="grid grid-cols-7 gap-2 text-center">

            <div></div>
            <div></div>
            <div></div>
            <div></div>

            <div className="rounded-lg bg-violet-600 p-3 font-bold">
              1
            </div>

            <div className="rounded-lg p-3 hover:bg-gray-700">2</div>
            <div className="rounded-lg p-3 hover:bg-gray-700">3</div>

            <div className="rounded-lg p-3 hover:bg-gray-700">4</div>
            <div className="rounded-lg p-3 hover:bg-gray-700">5</div>
            <div className="rounded-lg p-3 hover:bg-gray-700">6</div>
            <div className="rounded-lg p-3 hover:bg-gray-700">7</div>
            <div className="rounded-lg p-3 hover:bg-gray-700">8</div>
            <div className="rounded-lg p-3 hover:bg-gray-700">9</div>
            <div className="rounded-lg p-3 hover:bg-gray-700">10</div>

            <div className="rounded-lg p-3 hover:bg-gray-700">11</div>
            <div className="rounded-lg p-3 hover:bg-gray-700">12</div>
            <div className="rounded-lg p-3 hover:bg-gray-700">13</div>
            <div className="rounded-lg p-3 hover:bg-gray-700">14</div>
            <div className="rounded-lg p-3 hover:bg-gray-700">15</div>
            <div className="rounded-lg p-3 hover:bg-gray-700">16</div>

            <div className="rounded-lg border border-violet-500 p-3">
              17
            </div>

            <div className="rounded-lg p-3 hover:bg-gray-700">18</div>
            <div className="rounded-lg p-3 hover:bg-gray-700">19</div>

            <div className="rounded-lg bg-blue-600 p-3 font-bold">
              20
            </div>

            <div className="rounded-lg p-3 hover:bg-gray-700">21</div>
            <div className="rounded-lg p-3 hover:bg-gray-700">22</div>
            <div className="rounded-lg p-3 hover:bg-gray-700">23</div>
            <div className="rounded-lg p-3 hover:bg-gray-700">24</div>

            <div className="rounded-lg p-3 hover:bg-gray-700">25</div>
            <div className="rounded-lg p-3 hover:bg-gray-700">26</div>
            <div className="rounded-lg p-3 hover:bg-gray-700">27</div>
            <div className="rounded-lg p-3 hover:bg-gray-700">28</div>
            <div className="rounded-lg p-3 hover:bg-gray-700">29</div>
            <div className="rounded-lg p-3 hover:bg-gray-700">30</div>
            <div className="rounded-lg p-3 hover:bg-gray-700">31</div>

          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-5 border-t border-gray-700 pt-5 text-sm text-gray-400">

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-violet-600"></span>
              Selected Date
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-blue-600"></span>
              Task Deadline
            </div>

          </div>
        </div>

        {/* Upcoming Events */}
        <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6">

          <h2 className="mb-6 text-xl font-bold">
            Upcoming Events
          </h2>

          {/* Event Search */}
          <EventSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          {/* Add Event Form */}
          {showForm && (
            <AddEventForm
              onAddEvent={handleAddEvent}
              onCancel={() => setShowForm(false)}
            />
          )}

          {/* Event Cards */}
          {sortedEvents.map((event) => (
            <div
              key={event.id}
              className="mb-5 rounded-xl border-l-4 border-violet-500 bg-gray-900 p-4"
            >

              <p className="text-sm text-violet-400">
                {new Date(event.date + "T00:00:00").toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </p>

              <h3 className="mt-2 font-semibold">
                {event.title}
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                {event.description || "No description provided."}
              </p>

              <p className="mt-3 text-sm text-gray-300">
                🕒 {event.time}
              </p>

              {/* Edit Button */}
              <button
                onClick={() => handleEditEvent(event)}
                className="mt-4 w-full rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold hover:bg-amber-700"
              >
                Edit Event
              </button>

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteEvent(event.id)}
                className="mt-4 w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-700"
              >
                Delete Event
              </button>

            </div>
          ))}

          {/* Empty Message */}
          {events.length === 0 && (
            <p className="py-4 text-center text-gray-400">
              No upcoming events.
            </p>
          )}

          {events.length > 0 && sortedEvents.length === 0 && (
            <p className="py-4 text-center text-gray-400">
              No matching events found.
            </p>
          )}

          {/* Add Event Button */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-6 w-full rounded-xl bg-violet-600 py-3 font-semibold hover:bg-violet-700"
          >
            {showForm ? "Cancel" : "+ Add Event"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default Calendar;