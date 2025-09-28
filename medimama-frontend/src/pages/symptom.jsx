import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";

const Symptom = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // init Gemini
  const GEMINI_KEY = import.meta.env.VITE_GOOGLE_GENAI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = GEMINI_KEY ? new GoogleGenerativeAI(GEMINI_KEY) : null;

  const handleCheck = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setResponse("Analyzing your symptoms...");

    

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const result = await model.generateContent(
        `You are a medical assistant AI. A user reported these symptoms: ${input}. Provide a possible explanation and safe general remedies. Avoid giving prescriptions.`
      );

      const aiResponse = result.response.candidates[0].content.parts[0].text || 'No response.';
      setResponse(aiResponse);
    } catch (error) {
      console.error(error);
      setResponse('⚠️ Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto text-center py-10"
    >
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        AI Symptom Checker
      </h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-4 border rounded-lg mb-4"
        placeholder="Describe your symptoms (e.g headache, fever, cough)..."
      />

      <button
        onClick={handleCheck}
        disabled={loading}
        className="px-6 py-3 bg-green-600 text-white rounded-lg
         hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Checking..." : "Check Symptoms"}
      </button>

      {response && (
        <div className="mt-6 p-4 bg-green-50 border rounded-lg text-left hover:shadow-lg transition-shadow">
          <p>{response}</p>
        </div>
      )}
    </motion.div>
  );
};

export default Symptom;
