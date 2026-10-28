import { useState } from "react";

function Settings() {


  const [fullName, setFullName] = useState("Ashish");
const [email, setEmail] = useState("ashish@example.com");
const [saved, setSaved] = useState(false);

function handleSaveChanges(e) {
  e.preventDefault();
  setSaved(true);
}


return ( <div className="min-h-screen bg-gray-900 p-8 text-white"> <div className="mb-8"> <h1 className="text-3xl font-bold">Settings</h1> <p className="mt-2 text-gray-400">
Manage your account and profile </p> </div>


  {/* Profile Information */}
<div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
  <h2 className="mb-5 text-xl font-semibold">
    Profile Information
  </h2>

  <form onSubmit={handleSaveChanges}>
    <div className="mb-5">
      <label className="mb-2 block text-sm text-gray-300">
        Full Name
      </label>

      <input
        type="text"
        value={fullName}
        onChange={(e) => {
          setFullName(e.target.value);
          setSaved(false);
        }}
        className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 outline-none focus:border-violet-500"
        required
      />
    </div>

    <div className="mb-5">
      <label className="mb-2 block text-sm text-gray-300">
        Email Address
      </label>

      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setSaved(false);
        }}
        className="w-full rounded-lg border border-gray-600 bg-gray-900 p-3 outline-none focus:border-violet-500"
        required
      />
    </div>

    <button
      type="submit"
      className="rounded-lg bg-violet-600 px-5 py-3 font-medium hover:bg-violet-700"
    >
      Save Changes
    </button>

    {saved && (
      <p className="mt-4 text-sm text-green-400">
        Profile information saved successfully!
      </p>
    )}
  </form>
</div>
</div>


);
}

export default Settings;
