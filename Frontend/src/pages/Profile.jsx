
function Profile() {
  return (
    <div className="p-8 text-white">
      <h1 className="mb-2 text-3xl font-bold">My Profile</h1>

      <p className="mb-8 text-gray-400">
        Manage your personal information.
      </p>

      <div className="max-w-2xl rounded-2xl border border-gray-700 bg-gray-800 p-8">
        
        <div className="mb-8 flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-600 text-3xl font-bold">
            A
          </div>

          <div>
            <h2 className="text-xl font-bold">Ashish</h2>
            <p className="text-gray-400">CollabHub Member</p>
          </div>
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-sm text-gray-300">
            Full Name
          </label>

          <input
            type="text"
            defaultValue="Ashish"
            className="w-full rounded-lg border border-gray-700 bg-gray-900 p-3 outline-none focus:border-violet-500"
          />
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-sm text-gray-300">
            Email Address
          </label>

          <input
            type="email"
            defaultValue="ashish@example.com"
            className="w-full rounded-lg border border-gray-700 bg-gray-900 p-3 outline-none focus:border-violet-500"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm text-gray-300">
            About Me
          </label>

          <textarea
            rows="4"
            placeholder="Write something about yourself..."
            className="w-full rounded-lg border border-gray-700 bg-gray-900 p-3 outline-none focus:border-violet-500"
          />
        </div>

        <button className="rounded-lg bg-violet-600 px-6 py-3 font-semibold hover:bg-violet-700">
          Save Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;

