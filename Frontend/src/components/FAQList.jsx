import { useState } from "react";

function FAQList({ faqs }) {
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <div className="rounded-2xl border border-gray-700 bg-gray-800 p-6">
      <h2 className="mb-6 text-xl font-bold">
        Frequently Asked Questions
      </h2>

      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="border-b border-gray-700 py-5"
        >
          <button
            onClick={() =>
              setOpenFAQ(openFAQ === faq.id ? null : faq.id)
            }
            className="flex w-full items-center justify-between gap-4 text-left font-semibold"
          >
            {faq.question}

            <span className="text-violet-400">
              {openFAQ === faq.id ? "−" : "+"}
            </span>
          </button>

          {openFAQ === faq.id && (
            <p className="mt-3 text-sm text-gray-400">
              {faq.answer}
            </p>
          )}
        </div>
      ))}

      {faqs.length === 0 && (
        <p className="py-5 text-center text-gray-400">
          No matching FAQs found.
        </p>
      )}
    </div>
  );
}

export default FAQList;