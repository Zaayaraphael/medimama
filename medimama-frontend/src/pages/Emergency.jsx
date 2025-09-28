import React, { useState } from 'react'
import { motion } from "framer-motion";

const Emergency = () => {

    const [selectedTip, setSelectedTip] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const tips = [
      {
      title: "CPR",
      desc: "Learn how to perform CPR in case of cardiac arrest.",
      details: "Check responsiveness, call emergency services, push hard and fast in the center of the chest at 100-120 compressions per minute."
    },
    {
      title: "Burns",
      desc: "Cool the burn with running water for 20 minutes.",
      details: "Do not use ice. Remove tight items (rings, watches) before swelling starts. Cover with clean cloth."
    },
    {
      title: "Bleeding",
      desc: "Apply firm pressure to stop the bleeding.",
      details: "Use a clean cloth or bandage. If bleeding continues, add more layers, do not remove soaked bandage."
    },
    {
      title: "Choking",
      desc: "Perform the Heimlich maneuver to clear airway.",
      details: "Stand behind the person, wrap arms around waist, give quick upward abdominal thrusts until object is expelled."
    },
    ];

    const sendMessage = () => {
      if (!input.trim()) return;
      const newMessage = { role: "user", text: input };
      setMessages([...messages, newMessage, { role: "ai", text: "AI response"}]);
      setInput("");
    }


  return (
    <motion.div
    initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.4 }}


    className='p-8 bg-gray-300 min-h-screen'>
      <div className=' flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-bold text-green-700 mt-6 I'>
        Emergency Aid
      </h1>

      <p className='mb-8 text-gray-600'>Quick steps and lifesaving information for common emergencies.</p>
    </div>
      {/* TIPS SELECTION */}
      <div className='grid md:grid-cols-2 gap-6 mb-10'>
        {tips.map((tip, index) => (
          
          <div key={index}
          className='p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition'>

            <h2 className='text-xl font-semibold text-green-700 mb-2'>{tip.title}</h2>

            <p className='text-gray-600'>{tip.desc}</p>

            <button
            onClick={() => setSelectedTip(selectedTip === index ? null : index)}
            className='mt-4 px-2 bg-green-600 text-white rounded-lg hover:bg-green-700'>
               {selectedTip === index ? "Hide Details" : "Learn More"}

            </button>

            {selectedTip === index && (
              <p className='mt-3 text-gray-700'>{tip.details}</p>
            )}


          </div>
        ))}

      </div>

      {/* AI ASSISTANT */}

      <div className='mt-12 p-6 bg-green-100rounded-xl shadow-md'>
        <h2 className='text-2xl font-bold text-green-800 mb-3'>AI Emergency Assistant</h2>

        <div className='h-60 bg-white p-4 rounded-lg shadow overflow-y-auto mb-4'>
          {messages.map((msg, i) => (
            <div 
            key={i}
            className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}>
              <span className={`inline-block px-3 py-2 rounded-lg ${
                msg.role === "user" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"
              }`}>

                {msg.text}

              </span>

            </div>
          ))}

        </div>

        <div className='flex gap-2'>

          <input type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type your emergency question...'
          className='flex-1 p-3 border rounded-lg shadow-sm
          focus:outline-none'/>

          <button
          onClick={sendMessage}
          className='px-6 py-2 bg-green-600 text-white rounded-lg 
          hover:bg-green-700'>

            Send

          </button>

        </div>

      </div>


      {/* EMERGENCY CALL */}

      <div className='mt-10 text-center'>

        <a href="tel:0800000000"
        className='inline-block px-6 py-3 bg-red-500 text-white 
        rounded-lg hover:bg-red-700'>
          🚨 Call Emergency (0800000000)
        </a>

      </div>
      
    </motion.div>
  );
};

export default Emergency
