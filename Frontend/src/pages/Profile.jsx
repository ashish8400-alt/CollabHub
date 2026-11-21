import { useEffect, useState } from "react";
import useAuth from "../context/useAuth";
import {
  getMyProfile,
  updateMyProfile,
  uploadProfileImage,
} from "../services/profileService";



function Profile() {


  const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [about, setAbout] = useState("");
const [saved, setSaved] = useState(false);
const [error, setError] = useState("");
const [profileImage, setProfileImage] = useState("");
const { updateUser } = useAuth();

useEffect(() => {
  getMyProfile()
    .then((data) => {
      setFullName(data.user?.name || "");
      setEmail(data.user?.email || "");
      setProfileImage(data.user?.profileImage || "");
    })
    .catch((err) => setError(err.response?.data?.message || "Failed to load profile"));
}, []);

async function handleSaveProfile() {
  try {
    const data = await updateMyProfile(fullName);
    updateUser({ name: data.user.name });
    setSaved(true);
    setError("");
  } catch (err) {
    setError(err.response?.data?.message || "Failed to update profile");
  }
}

async function handleImageUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const data = await uploadProfileImage(file);
    setProfileImage(data.profileImage);
    updateUser({ profileImage: data.profileImage });
  } catch (err) {
    setError(err.response?.data?.message || "Failed to upload profile image");
  }
}



  return (
    
    <div className="mobile-content-padding min-h-full p-6 text-white md:p-8">
      <h1 className="mb-2 text-3xl font-bold">My Profile</h1>

      <p className="mb-8 text-gray-400">
        Manage your personal information.
      </p>

      <div className="max-w-2xl rounded-2xl border border-gray-700 bg-gray-800 p-8">
        
        <div className="mb-8 flex items-center gap-5">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="h-20 w-20 rounded-full object-cover" />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-600 text-3xl font-bold">
              {(fullName || "U").charAt(0).toUpperCase()}
            </div>
          )}
          <label className="cursor-pointer rounded-lg border border-gray-600 px-4 py-2 text-sm hover:bg-gray-700">
            Change image
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </label>

          <div>
            <h2 className="text-xl font-bold">{fullName || "Ashish"}</h2>
            <p className="text-gray-400">CollabHub Member</p>
          </div>
        </div>

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
            className="w-full rounded-lg border border-gray-700 bg-gray-900 p-3 outline-none focus:border-violet-500"
          />
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-sm text-gray-300">
            Email Address
          </label>

          <input
            type="email"
           value={email}
           readOnly
           className="w-full cursor-not-allowed rounded-lg border border-gray-700 bg-gray-900 p-3 text-gray-400 outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm text-gray-300">
            About Me
          </label>

          <textarea
          value={about}
onChange={(e) => {
  setAbout(e.target.value);
  setSaved(false);
}}
            rows="4"
            placeholder="Write something about yourself..."
            className="w-full rounded-lg border border-gray-700 bg-gray-900 p-3 outline-none focus:border-violet-500"
          />
        </div>

      <button
  onClick={handleSaveProfile}
  className="rounded-lg bg-violet-600 px-6 py-3 font-semibold hover:bg-violet-700"
>
  Save Profile
</button>

{saved && (
  <p className="mt-4 text-sm text-green-400">
    Profile saved successfully!
  </p>
)}
{error && <p className="mt-4 text-sm text-red-400">{error}</p>}
      </div>
    </div>
  );
}

export default Profile;

