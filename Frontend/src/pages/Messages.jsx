import { useEffect, useState } from "react";
import { getMyProjects } from "../services/projectService";
import { getProjectMembers } from "../services/memberService";
import { getMessageHistory, sendMessage } from "../services/messageService";
import useAuth from "../context/useAuth";

function Messages() {
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth();

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
      .then((data) => {
        const otherMembers = (data.members || []).filter((member) => member._id !== user?.id);
        setMembers(otherMembers);
        setSelectedMember((current) => current || otherMembers[0] || null);
      })
      .catch((err) => setError(err.response?.data?.message || "Failed to load members"));
  }, [projectId, user?.id]);

  useEffect(() => {
    if (!selectedMember?._id) {
      return;
    }
    getMessageHistory(selectedMember._id)
      .then((data) => setMessages(data.data || []))
      .catch((err) => setError(err.response?.data?.message || "Failed to load messages"));
  }, [selectedMember]);

  async function handleSend(e) {
    e.preventDefault();
    if (!text.trim() || !selectedMember) return;
    try {
      const data = await sendMessage(selectedMember._id, text.trim());
      setMessages((previous) => [...previous, data.data]);
      setText("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send message");
    }
  }

  return (
    <div className="mobile-content-padding min-h-full p-6 text-white md:p-8">
      <h1 className="mb-6 text-3xl font-bold">Messages</h1>
      {error && <p className="mb-4 text-red-400">{error}</p>}
      {projects.length > 0 && (
        <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className="mb-6 w-full rounded-xl border border-gray-700 bg-gray-800 p-3">
          {projects.map((project) => <option key={project._id} value={project._id}>{project.name}</option>)}
        </select>
      )}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-gray-700 bg-gray-800 p-4">
          {members.map((member) => (
            <button key={member._id} onClick={() => setSelectedMember(member)} className={`mb-2 w-full rounded-lg p-3 text-left ${selectedMember?._id === member._id ? "bg-violet-600" : "bg-gray-900"}`}>
              <p className="font-semibold">{member.name}</p><p className="text-xs text-gray-300">{member.email}</p>
            </button>
          ))}
          {members.length === 0 && <p className="text-sm text-gray-400">No other project members.</p>}
        </div>
        <div className="rounded-xl border border-gray-700 bg-gray-800 p-5 md:col-span-2">
          <h2 className="mb-4 border-b border-gray-700 pb-4 text-xl font-semibold">{selectedMember?.name || "Select a member"}</h2>
          <div className="mb-4 max-h-96 space-y-3 overflow-y-auto">
            {messages.map((message) => (
              <div key={message._id} className={`max-w-[75%] rounded-lg p-3 ${String(message.sender) === String(user?.id) ? "ml-auto bg-violet-600" : "bg-gray-700"}`}>
                {message.message}
              </div>
            ))}
            {messages.length === 0 && <p className="text-sm text-gray-400">No messages yet.</p>}
          </div>
          <form onSubmit={handleSend} className="flex gap-3">
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." className="flex-1 rounded-lg border border-gray-700 bg-gray-900 p-3" disabled={!selectedMember} />
            <button type="submit" disabled={!selectedMember || !text.trim()} className="rounded-lg bg-violet-600 px-5 py-3 disabled:opacity-50">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Messages;
