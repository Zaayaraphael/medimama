import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import pregnancyTips from "./pregnancyTips";
import { motion } from "framer-motion";




const MaternalCare = () => {
  const [week, setWeek] = useState("");
  const [tips, setTips] = useState([]);

  const navigate =  useNavigate();

  const handleCheck = () => {
    if (!week) return;

    let selectedTips = [];

    if (week <= 12) {
      selectedTips = pregnancyTips.firstTrimester;
    } else if (week <= 28) {
      selectedTips = pregnancyTips.secondTrimester;
    } else if (week <= 40) {
      selectedTips = pregnancyTips.thirdTrimester;
    } else {
      selectedTips = ["Please enter a week between 1 and 40."];
    }

    setTips(selectedTips);
  };

  // 👉 actions
  const handleBookAppointment = () => {
    
    navigate("/doctorlist");
  };

  const handleDownloadGuide = () => {
    
    window.open("/files/nutrition_guide.pdf", "_blank"); 
  };

  const handleJoinGroup = () => {
    
    window.open("https://chat.whatsapp.com/", "_blank");
  };

  return (
    <motion.div
     initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.4 }}
    className="max-w-2xl mx-auto py-10 text-center">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        Maternal Care & Pregnancy Tracker
      </h1>
      
      <p className="text-gray-600 mb-4">
        Track your pregnancy week and get tailored health and wellness tips to
        guide you through your journey.
      </p>

      <input
        type="number"
        value={week}
        onChange={(e) => setWeek(e.target.value)}
        placeholder="Enter pregnancy week (1-40)"
        className="w-full p-3 border rounded mb-4"
      />

      <button
        onClick={handleCheck}
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
      >
        Get Care Tips
      </button>

      {tips.length > 0 && (
        <div className="mt-6 p-6 bg-green-50 border rounded-lg shadow-sm text-left">
          <h2 className="text-xl font-semibold text-green-800 mb-2">
            Your Care Guide
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {tips.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>

          {/* Call to Actions */}
          <div className="mt-6 flex flex-col gap-3">
            <button 
              onClick={handleBookAppointment}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Book a Doctor’s Appointment
            </button>
            
            <button 
              onClick={handleDownloadGuide}
              className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
            >
              Download Weekly Nutrition Guide
            </button>
            
            <button 
              onClick={handleJoinGroup}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Join Our Mothers’ Support Group
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MaternalCare;
