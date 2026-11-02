import { useState } from "react";
import HelpSearch from "../components/HelpSearch";
import FAQList from "../components/FAQList";
import ContactSupport from "../components/ContactSupport";

function Help() {
  const [searchTerm, setSearchTerm] = useState("");

  const helpTopics = [
    {
      id: 1,
      icon: "📁",
      title: "Projects",
      description:
        "Learn how to manage projects and collaborate with your team.",
    },
    {
      id: 2,
      icon: "✅",
      title: "Tasks",
      description:
        "Understand task assignments, priorities and deadlines.",
    },
    {
      id: 3,
      icon: "💬",
      title: "Messages",
      description:
        "Get help with team conversations and notifications.",
    },
  ];

  const faqs = [
    {
      id: 1,
      question: "How do I create a project?",
      answer:
        "Open the Projects page to manage your team projects.",
    },
    {
      id: 2,
      question: "How can I manage my tasks?",
      answer:
        "Visit My Tasks to view your assigned work and deadlines.",
    },
    {
      id: 3,
      question: "How do I contact support?",
      answer:
        "Contact support when you need assistance with your workspace.",
    },
  ];

  const filteredTopics = helpTopics.filter((topic) =>
    (topic.title + " " + topic.description)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const filteredFaqs = faqs.filter((faq) =>
    (faq.question + " " + faq.answer)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white md:p-8">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Help & Support</h1>

        <p className="mt-2 text-gray-400">
          Find answers and get help with CollabHub.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8 rounded-2xl border border-gray-700 bg-gray-800 p-6">
        <h2 className="mb-4 text-xl font-bold">
          How can we help you?
        </h2>

        <HelpSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      {/* Help Topics */}
      <div className="mb-8">
        <h2 className="mb-5 text-xl font-bold">
          Help Categories
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              className="rounded-xl border border-gray-700 bg-gray-800 p-6"
            >
              <div className="mb-4 text-3xl">
                {topic.icon}
              </div>

              <h2 className="font-bold">{topic.title}</h2>

              <p className="mt-2 text-sm text-gray-400">
                {topic.description}
              </p>
            </div>
          ))}

        </div>
        {filteredTopics.length === 0 && (
  <p className="py-5 text-center text-gray-400">
    No matching categories found.
  </p>
)}
      </div>

      {/* FAQs */}
      
<FAQList faqs={filteredFaqs} />

<ContactSupport />

    </div>
  );
}

export default Help;