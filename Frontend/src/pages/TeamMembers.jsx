import { useEffect, useState } from "react";
import InviteMemberForm from "../components/InviteMemberForm";
import { getMyProjects } from "../services/projectService";
import { getProjectMembers, addMember, removeMember } from "../services/memberService";

function TeamMembers() {
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getMyProjects()
      .then((data) => {
        setProjects(data.projects || []);
        if (data.projects?.length) setProjectId(data.projects[0]._id);
      })
      .catch((err) => setError(err.response?.data?.message || "Failed to load projects"));
  }, []);

  useEffect(() => {
    if (!projectId) return;
    getProjectMembers(projectId)
      .then((data) => setMembers(data.members || []))
      .catch((err) => setError(err.response?.data?.message || "Failed to load members"));
  }, [projectId]);

  async function handleAddMember(member) {
    try {
      await addMember(projectId, member.email);
      const data = await getProjectMembers(projectId);
      setMembers(data.members || []);
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add member");
    }
  }

  async function handleRemove(memberId) {
    if (!window.confirm("Remove this member from the project?")) return;
    try {
      await removeMember(projectId, memberId);
      setMembers((previous) => previous.filter((member) => member._id !== memberId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove member");
    }
  }

  const filtered = members.filter((member) =>
    `${member.name} ${member.email}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mobile-content-padding min-h-full p-6 text-white md:p-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div><h1 className="text-3xl font-bold">Team Members</h1><p className="mt-2 text-gray-400">Manage members in the selected project.</p></div>
        <button onClick={() => setShowForm(!showForm)} className="rounded-xl bg-violet-600 px-5 py-3 font-semibold">{showForm ? "Cancel" : "+ Invite Member"}</button>
      </div>
      {error && <p className="mb-4 text-red-400">{error}</p>}
      {projects.length > 0 && (
        <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className="mb-6 w-full rounded-xl border border-gray-700 bg-gray-800 p-3">
          {projects.map((project) => <option key={project._id} value={project._id}>{project.name}</option>)}
        </select>
      )}
      {showForm && <InviteMemberForm onAddMember={handleAddMember} onCancel={() => setShowForm(false)} />}
      <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search members..." className="mb-6 w-full rounded-xl border border-gray-700 bg-gray-800 p-3" />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((member) => (
          <div key={member._id} className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
            <div className="mb-5 flex items-center gap-4">
              {member.profileImage ? <img src={member.profileImage} alt="" className="h-14 w-14 rounded-2xl object-cover" /> : <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600 text-2xl font-bold">{member.name?.charAt(0).toUpperCase()}</div>}
              <div><h3 className="font-bold">{member.name}</h3><p className="text-sm text-gray-400">{member.email}</p></div>
            </div>
            <button onClick={() => handleRemove(member._id)} className="rounded-lg bg-red-600 px-4 py-2 text-sm">Remove</button>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <p className="mt-6 text-center text-gray-400">No team members found.</p>}
    </div>
  );
}

export default TeamMembers;
