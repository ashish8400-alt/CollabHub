import { useState } from "react";

function CalendarGrid({ events, selectedDate, onDateSelect }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  function handlePreviousMonth() {
    setCurrentMonth(new Date(year, month - 1, 1));
  }

  function handleNextMonth() {
    setCurrentMonth(new Date(year, month + 1, 1));
  }


  function handleToday() {
  const today = new Date();

  setCurrentMonth(today);
  onDateSelect(
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
  );
}


  function hasEvent(day) {
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    return events.some((event) => event.date === date);
  }

  return (
    <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6 xl:col-span-2">

      {/* Month Navigation */}
      <div className="mb-6 flex items-center justify-between">

        <button
          onClick={handlePreviousMonth}
          className="rounded-lg bg-gray-700 px-4 py-2 hover:bg-gray-600"
        >
          ←
        </button>

        <h2 className="text-xl font-bold">
          {monthName}
        </h2>

        <button
          onClick={handleNextMonth}
          className="rounded-lg bg-gray-700 px-4 py-2 hover:bg-gray-600"
        >
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

      <button
  onClick={handleToday}
  className="mb-4 rounded-lg border border-gray-700 px-4 py-2 text-sm text-violet-400 hover:bg-gray-700"
>
  Today
</button>

      {/* Calendar Dates */}
      <div className="grid grid-cols-7 gap-2 text-center">

        {/* Empty Spaces */}
        {Array.from({ length: firstDay }, (_, index) => (
          <div key={`empty-${index}`}></div>
        ))}

        {/* Dates */}
        {Array.from({ length: totalDays }, (_, index) => {
          const day = index + 1;

          const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

          const isSelected = selectedDate === date;

          const eventExists = hasEvent(day);

          return (
            <button
              key={day}
              onClick={() => onDateSelect(date)}
              className={`rounded-lg p-3 transition ${
                isSelected
                  ? "bg-violet-600 font-bold"
                  : eventExists
                  ? "bg-blue-600 font-bold"
                  : "hover:bg-gray-700"
              }`}
            >
              {day}
            </button>
          );
        })}

      </div>

      {/* Selected Date */}
      <p className="mt-5 text-sm text-gray-400">
        Selected Date:{" "}
        <span className="font-semibold text-violet-400">
          {selectedDate || "None"}
        </span>
      </p>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-5 border-t border-gray-700 pt-5 text-sm text-gray-400">

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-violet-600"></span>
          Selected Date
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-blue-600"></span>
          Event Date
        </div>

      </div>

    </div>
  );
}

export default CalendarGrid;