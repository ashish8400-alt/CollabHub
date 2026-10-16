
function Calendar() {
  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white md:p-8">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Team Calendar</h1>
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

            <h2 className="text-xl font-bold">October 2026</h2>

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

            {/* Empty spaces before October 1 */}
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

            <div className="rounded-lg border border-violet-500 p-3">17</div>

            <div className="rounded-lg p-3 hover:bg-gray-700">18</div>
            <div className="rounded-lg p-3 hover:bg-gray-700">19</div>

            <div className="rounded-lg bg-blue-600 p-3 font-bold">20</div>

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

          <h2 className="mb-6 text-xl font-bold">Upcoming Events</h2>

          <div className="mb-5 rounded-xl border-l-4 border-violet-500 bg-gray-900 p-4">
            <p className="text-sm text-violet-400">October 17, 2026</p>
            <h3 className="mt-2 font-semibold">Team Meeting</h3>
            <p className="mt-1 text-sm text-gray-400">
              Project progress discussion
            </p>
            <p className="mt-3 text-sm text-gray-300">
              🕒 10:00 AM
            </p>
          </div>

          <div className="mb-5 rounded-xl border-l-4 border-blue-500 bg-gray-900 p-4">
            <p className="text-sm text-blue-400">October 20, 2026</p>
            <h3 className="mt-2 font-semibold">Project Deadline</h3>
            <p className="mt-1 text-sm text-gray-400">
              Complete the website development
            </p>
            <p className="mt-3 text-sm text-gray-300">
              🕒 05:00 PM
            </p>
          </div>

          <div className="rounded-xl border-l-4 border-green-500 bg-gray-900 p-4">
            <p className="text-sm text-green-400">October 25, 2026</p>
            <h3 className="mt-2 font-semibold">Design Review</h3>
            <p className="mt-1 text-sm text-gray-400">
              Review the final UI designs
            </p>
            <p className="mt-3 text-sm text-gray-300">
              🕒 02:00 PM
            </p>
          </div>

          <button className="mt-6 w-full rounded-xl bg-violet-600 py-3 font-semibold hover:bg-violet-700">
            + Add Event
          </button>

        </div>
      </div>
    </div>
  );
}

export default Calendar;

