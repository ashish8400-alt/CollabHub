function Messages() {
return ( <div className="min-h-screen bg-gray-900 p-8 text-white"> <div className="mb-8"> <h1 className="text-3xl font-bold">Messages</h1> <p className="mt-2 text-gray-400">
Chat with your team members </p> </div>


  <div className="grid gap-6 md:grid-cols-3">
    <div className="rounded-xl border border-gray-700 bg-gray-800 p-5">
      <h2 className="mb-5 text-xl font-semibold">Team Members</h2>

      <div className="mb-4 rounded-lg bg-gray-700 p-4">
        <p className="font-medium">Rahul Sharma</p>
        <p className="mt-1 text-sm text-gray-400">
          Hey, how is the project going?
        </p>
      </div>

      <div className="mb-4 rounded-lg p-4 hover:bg-gray-700">
        <p className="font-medium">Priya Singh</p>
        <p className="mt-1 text-sm text-gray-400">
          Design is ready!
        </p>
      </div>

      <div className="rounded-lg p-4 hover:bg-gray-700">
        <p className="font-medium">Aman Verma</p>
        <p className="mt-1 text-sm text-gray-400">
          Let's discuss the tasks.
        </p>
      </div>
    </div>

    <div className="rounded-xl border border-gray-700 bg-gray-800 p-5 md:col-span-2">
      <div className="border-b border-gray-700 pb-4">
        <h2 className="text-xl font-semibold">Rahul Sharma</h2>
        <p className="mt-1 text-sm text-green-400">Team Member</p>
      </div>

      <div className="flex min-h-80 flex-col gap-4 py-6">
        <div className="max-w-xs rounded-xl bg-gray-700 p-4">
          Hey, how is the project going?
        </div>

        <div className="ml-auto max-w-xs rounded-xl bg-violet-600 p-4">
          It's going well! I am working on the frontend.
        </div>

        <div className="max-w-xs rounded-xl bg-gray-700 p-4">
          Great! Let me know when it's ready.
        </div>
      </div>

      <div className="flex gap-3 border-t border-gray-700 pt-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="min-w-0 flex-1 rounded-lg border border-gray-600 bg-gray-900 p-3 outline-none focus:border-violet-500"
        />

        <button className="rounded-lg bg-violet-600 px-5 py-3 font-medium hover:bg-violet-700">
          Send
        </button>
      </div>
    </div>
  </div>
</div>


);
}

export default Messages;
