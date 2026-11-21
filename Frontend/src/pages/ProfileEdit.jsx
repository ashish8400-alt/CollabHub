import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { getMyProfile, updateMyProfile, uploadProfileImage } from "../services/profileService";
import useAuth from "../context/useAuth";

function ProfileEdit() {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getMyProfile()
      .then((data) => {
        setName(data.user?.name || "");
        setEmail(data.user?.email || "");
        setProfileImage(data.user?.profileImage || "");
      })
      .catch((err) => setError(err.response?.data?.message || "Failed to load profile"))
      .finally(() => setLoading(false));
  }, []);

  async function handleImageUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await uploadProfileImage(file);
      setProfileImage(data.profileImage || "");
      updateUser({ profileImage: data.profileImage });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload profile image");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return setError("Full name is required.");
    setSaving(true);
    setError("");
    try {
      const data = await updateMyProfile(name.trim());
      updateUser({ name: data.user?.name || name.trim() });
      setSuccess("Profile updated successfully.");
      setTimeout(() => navigate("/settings", { replace: true }), 650);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mobile-content-padding min-h-full p-6 text-white md:p-8">
      <button type="button" onClick={() => navigate("/settings")} className="mb-6 flex items-center gap-2 text-sm text-gray-400 hover:text-white"><ArrowLeft className="h-4 w-4" />Back to settings</button>
      <div className="mx-auto max-w-3xl">
        <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-400">Account</p><h1 className="mt-2 text-3xl font-bold">Edit profile</h1></div>
        {loading ? <div className="workspace-card p-8"><div className="skeleton h-20 w-20 rounded-full" /><div className="mt-5 skeleton h-12 w-full rounded-xl" /></div> : (
          <form onSubmit={handleSubmit} className="workspace-card p-6 md:p-8">
            {error && <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}
            {success && <div className="mb-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">{success}</div>}
            <div className="mb-6 flex items-center gap-4 border-b border-gray-700/60 pb-6">{profileImage ? <img src={profileImage} alt="" className="h-16 w-16 rounded-full object-cover" /> : <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-600/20 text-xl font-bold text-violet-300">{(name || "U").charAt(0).toUpperCase()}</div>}<div><p className="font-semibold">Profile photo</p><label className="mt-2 inline-block cursor-pointer rounded-lg border border-gray-700 px-3 py-2 text-xs text-gray-300 hover:bg-white/[0.04]">Change image<input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" /></label></div></div>
            <label className="block text-sm font-semibold text-gray-300">Full name</label><input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-xl border border-gray-700 bg-[#101729] px-4 py-3 outline-none" required />
            <label className="mt-5 block text-sm font-semibold text-gray-300">Email address</label><input value={email} readOnly className="mt-2 w-full cursor-not-allowed rounded-xl border border-gray-700 bg-[#101729] px-4 py-3 text-gray-500 outline-none" />
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-700/60 pt-6 sm:flex-row sm:justify-end"><button type="button" onClick={() => navigate("/settings")} className="rounded-xl border border-gray-700 px-5 py-3 text-sm font-semibold hover:bg-white/[0.04]">Cancel</button><button type="submit" disabled={saving} className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold disabled:opacity-60"><Save className="h-4 w-4" />{saving ? "Saving..." : "Save changes"}</button></div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProfileEdit;
