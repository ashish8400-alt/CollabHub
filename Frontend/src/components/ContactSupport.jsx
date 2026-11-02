import { useState } from "react";

function ContactSupport() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      return;
    }

    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div className="mt-8 rounded-2xl border border-gray-700 bg-gray-800 p-6">
      <h2 className="mb-2 text-xl font-bold">
        Contact Support
      </h2>

      <p className="mb-6 text-sm text-gray-400">
        Having a problem? Send us your query.
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="mb-4 w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white"
          required
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          className="mb-4 w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white"
          required
        />

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your problem..."
          rows="4"
          className="mb-4 w-full rounded-lg border border-gray-700 bg-gray-900 p-3 text-white"
          required
        />

        <button
          type="submit"
          className="rounded-lg bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-700"
        >
          Submit Query
        </button>

        {submitted && (
          <p className="mt-4 text-sm text-green-400">
            Query submitted successfully!
          </p>
        )}
      </form>
    </div>
  );
}

export default ContactSupport;