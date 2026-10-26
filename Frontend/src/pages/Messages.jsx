import { useState } from "react";
import MessageInput from "../components/MessageInput";
import TeamMemberList from "../components/TeamMemberList";
import MessageList from "../components/MessageList";

function Messages() {
  const members = [
  {
    id: 1,
    name: "Rahul Sharma",
    lastMessage: "Hey, how is the project going?",
  },
  {
    id: 2,
    name: "Priya Singh",
    lastMessage: "Design is ready!",
  },
  {
    id: 3,
    name: "Aman Verma",
    lastMessage: "Let's discuss the tasks.",
  },
];

const [selectedMember, setSelectedMember] = useState(members[0]);

const [unreadCounts, setUnreadCounts] = useState({
  2: 1,
  3: 1,
});



const [chats, setChats] = useState({
  1: [
    { id: 1, text: "Hey, how is the project going?", sender: "Rahul" },
    { id: 2, text: "It's going well! I am working on the frontend.", sender: "me" },
    { id: 3, text: "Great! Let me know when it's ready.", sender: "Rahul" },
  ],
  2: [
    { id: 4, text: "Design is ready!", sender: "Priya" },
    { id: 5, text: "Thanks! I'll check it.", sender: "me" },
  ],
  3: [
    { id: 6, text: "Let's discuss the tasks.", sender: "Aman" },
  ],
});



const messages = chats[selectedMember.id] || [];



function handleSelectMember(member) {
  setSelectedMember(member);

  setUnreadCounts((previousCounts) => ({
    ...previousCounts,
    [member.id]: 0,
  }));
}



  function handleSendMessage(message) {
  const newMessage = {
    id: Date.now(),
    text: message,
    sender: "me",
  };

  setChats((previousChats) => ({
    ...previousChats,
    [selectedMember.id]: [
      ...(previousChats[selectedMember.id] || []),
      newMessage,
    ],
  }));
}

function handleDeleteMessage(id) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this message?"
  );

  if (confirmDelete) {
    setChats((previousChats) => ({
      ...previousChats,
      [selectedMember.id]: previousChats[selectedMember.id].filter(
        (message) => message.id !== id
      ),
    }));
  }
}


  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">

      {/* Page Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Messages</h1>

        <p className="mt-2 text-gray-400">
          Chat with your team members
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">

        {/* Team Members */}
     <TeamMemberList
  members={members}
  selectedMember={selectedMember}
  onSelectMember={handleSelectMember}
  chats={chats}
  unreadCounts={unreadCounts}
/>

        {/* Chat Section */}
        <div className="rounded-xl border border-gray-700 bg-gray-800 p-5 md:col-span-2">

          <div className="border-b border-gray-700 pb-4">
            <h2 className="text-xl font-semibold">
  {selectedMember.name}
</h2>

            <p className="mt-1 text-sm text-green-400">
              Team Member
            </p>
          </div>

          {/* Messages List */}
          {/* Messages List */}
<MessageList
  messages={messages}
  onDeleteMessage={handleDeleteMessage}
/>

          {/* Message Input */}
          <MessageInput onSend={handleSendMessage} />

        </div>
      </div>
    </div>
  );
}

export default Messages;