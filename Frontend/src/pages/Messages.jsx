import { useState } from "react";
import MessageInput from "../components/MessageInput";
import TeamMemberList from "../components/TeamMemberList";
import MessageList from "../components/MessageList";
import MessageSearch from "../components/MessageSearch";


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


const [searchTerm, setSearchTerm] = useState("");


const messages = chats[selectedMember.id] || [];

const filteredMessages = messages.filter((message) =>
  message.text.toLowerCase().includes(searchTerm.toLowerCase())
);



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
  time: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
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

function handleClearChat() {
  const confirmClear = window.confirm(
    `Clear chat with ${selectedMember.name}?`
  );

  if (confirmClear) {
    setChats((previousChats) => ({
      ...previousChats,
      [selectedMember.id]: [],
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

       <div className="flex items-center justify-between border-b border-gray-700 pb-4">
  <div>
    <h2 className="text-xl font-semibold">
      {selectedMember.name}
    </h2>

    <p className="mt-1 text-sm text-green-400">
      Team Member
    </p>
  </div>

  <button
    onClick={handleClearChat}
    className="rounded-lg bg-red-600 px-4 py-2 text-sm hover:bg-red-700"
  >
    Clear Chat
  </button>
</div>

          {/* Messages List */}
          {/* Messages List */}
<MessageSearch
  searchTerm={searchTerm}
  onSearchChange={setSearchTerm}
/>

<MessageList
  messages={filteredMessages}
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