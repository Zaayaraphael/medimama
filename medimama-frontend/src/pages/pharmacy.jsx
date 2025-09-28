import React, { useState } from "react";
import { motion } from "framer-motion";

const Pharmacy = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_GENAI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY; // store in .env

  const handleSearch = async () => {
    setLoading(true);
    setResults([]);
    setAiResponse("");

    const drugs = [
      { name: "Paracetamol", location: "MediCity Pharmacy, Gombe" },
      { name: "Amoxicillin", location: "HealthPlus Pharmacy, Bauchi Road" },
      { name: "Ibuprofen", location: "CarePoint Pharmacy, Federal Lowcost" },
    ];

    const filtered = drugs.filter((drug) =>
      drug.name.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length > 0) {
      setResults(filtered);
      setLoading(false);
    } else {
      // Ask Gemini AI
      if (!GEMINI_API_KEY) {
        setAiResponse('⚠️ AI is not configured. Please set the API key.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + GEMINI_API_KEY,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `A user searched for "${query}". Suggest possible medicines, alternatives, and where they can get them in Nigeria.`,
                    },
                  ],
                },
              ],
            }),
          }
        );

        const data = await response.json();
        const text =
          data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "Sorry, I couldn’t find information.";
        setAiResponse(text);
      } catch (error) {
        console.error("Gemini API error:", error);
        setAiResponse("⚠️ Failed to fetch AI response.");
      }
      setLoading(false);
    }
  };

  return (
    <motion.div 
    initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.4 }}
    
    className="p-8 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-green-700 mb-4">Pharmacy</h1>
      <p className="mb-8 text-gray-600">
        Search for medicines and find the nearest pharmacy that stocks them.
      </p>

      {/* Search Bar */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Medicine..."
          className="flex-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 outline-none"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {results.map((drug, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold text-green-700 mb-2">
                {drug.name}
              </h2>
              <p className="text-gray-600">Available at: {drug.location}</p>
              <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Order Now
              </button>
            </div>
          ))}
        </div>
      )}

      {/* AI Response */}
      {aiResponse && (
        <div className="mt-10 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-green-700 mb-3">
            AI Suggestions
          </h2>
          <p className="mb-4 text-gray-600 whitespace-pre-line">{aiResponse}</p>
        </div>
      )}
    </motion.div>
  );
};

export default Pharmacy;
