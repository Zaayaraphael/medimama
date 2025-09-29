import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaTimes } from "react-icons/fa";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Welcome! I’m your MediMama AI agent, how can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Load API Key
  const GEMINI_KEY =
    import.meta.env.VITE_GOOGLE_GENAI_API_KEY ||
    import.meta.env.VITE_GEMINI_API_KEY;

  // ✅ Create client
  const genAI = GEMINI_KEY ? new GoogleGenerativeAI(GEMINI_KEY) : null;

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!genAI) {
      alert("Missing Google Generative AI API Key in .env file");
      return;
    }

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // ✅ Use v1 Gemini model
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(input);

      console.log("Gemini raw response:", result);

      // ✅ Extract reply safely
      let reply =
        result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
        result?.response?.text() ||
        "⚠️ No response from AI.";

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (error) {
      console.error("Gemini API error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Sorry, I couldn't fetch a response. Try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 p-4 rounded-full shadow-lg hover:bg-green-700"
        >
          <FaRobot size={24} className="text-white" />
        </button>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="w-80 h-96 bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center bg-green-600 text-white px-4 py-3">
              <h2 className="font-bold">MediMama AI</h2>
              <button onClick={() => setIsOpen(false)}>
                <FaTimes size={20} className="hover:cursor-pointer" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg max-w-xs ${
                    msg.sender === "bot"
                      ? "bg-green-100 text-gray-800 text-left"
                      : "bg-green-600 text-white text-right ml-auto"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {loading && (
                <p className="text-gray-500 text-sm">🤖 Typing...</p>
              )}
            </div>

            {/* Input */}
            <div className="flex border-t">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 text-sm outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="bg-green-600 text-white px-4 hover:bg-green-700 disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
