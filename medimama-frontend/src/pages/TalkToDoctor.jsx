import React from 'react'
import { FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';
import { motion } from 'framer-motion';


const TalkToDoctor = () => {

    const [showDoctors, setShowDoctors] = useState(false);


    const doctors = [
         {
      name: "Dr. Musa Ibrahim",
      discipline: "Pediatrics",
      available: "Mon - Fri, 9AM - 4PM",
      location: "MediCity Clinic, Gombe",
      whatsapp: "+2348012345678",
    },
    {
      name: "Dr. Amina Yusuf",
      discipline: "Gynecology",
      available: "Tue - Sat, 10AM - 5PM",
      location: "HealthPlus Hospital, Bauchi",
      whatsapp: "+2348098765432",
    },
    {
      name: "Dr. John Okafor",
      discipline: "General Medicine",
      available: "Daily, 8AM - 6PM",
      location: "CarePoint Medical Center, Abuja",
      whatsapp: "+2347012349999",
    },

     {
      name: "Dr. Musa Ibrahim",
      discipline: "Pediatrics",
      available: "Mon - Fri, 9AM - 4PM",
      location: "MediCity Clinic, Gombe",
      whatsapp: "+2348012345678",
    },
    {
      name: "Dr. Amina Yusuf",
      discipline: "Gynecology",
      available: "Tue - Sat, 10AM - 5PM",
      location: "HealthPlus Hospital, Bauchi",
      whatsapp: "+2348098765432",
    },
    {
      name: "Dr. John Okafor",
      discipline: "General Medicine",
      available: "Daily, 8AM - 6PM",
      location: "CarePoint Medical Center, Abuja",
      whatsapp: "+2347012349999",
    },

     {
      name: "Dr. Musa Ibrahim",
      discipline: "Pediatrics",
      available: "Mon - Fri, 9AM - 4PM",
      location: "MediCity Clinic, Gombe",
      whatsapp: "+2348012345678",
    },
    {
      name: "Dr. Amina Yusuf",
      discipline: "Gynecology",
      available: "Tue - Sat, 10AM - 5PM",
      location: "HealthPlus Hospital, Bauchi",
      whatsapp: "+2348098765432",
    },
    {
      name: "Dr. John Okafor",
      discipline: "General Medicine",
      available: "Daily, 8AM - 6PM",
      location: "CarePoint Medical Center, Abuja",
      whatsapp: "+2347012349999",
    },

     {
      name: "Dr. Musa Ibrahim",
      discipline: "Pediatrics",
      available: "Mon - Fri, 9AM - 4PM",
      location: "MediCity Clinic, Gombe",
      whatsapp: "+2348012345678",
    },
    {
      name: "Dr. Amina Yusuf",
      discipline: "Gynecology",
      available: "Tue - Sat, 10AM - 5PM",
      location: "HealthPlus Hospital, Bauchi",
      whatsapp: "+2348098765432",
    },
    {
      name: "Dr. John Okafor",
      discipline: "General Medicine",
      available: "Daily, 8AM - 6PM",
      location: "CarePoint Medical Center, Abuja",
      whatsapp: "+2347012349999",
    },
    ];


  return (
    <motion.div 
    
    initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.4 }}

    className='p-8 bg-gray-50 min-h-screen'>

        {/* Button to toggle doctors list */}
      <button
        onClick={() => setShowDoctors(!showDoctors)}
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        {showDoctors ? "Hide Doctors" : "Talk to a Doctor"}
      </button>

      {/* Doctors List */}
      {showDoctors && (
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {doctors.map((doc, index) => (
            <div
              key={index}
              className="p-6 bg-white shadow-lg rounded-xl hover:shadow-xl transition"
            >
              <h2 className="text-xl font-bold text-green-700 mb-2">
                {doc.name}
              </h2>
              <p className="text-gray-600">Discipline: {doc.discipline}</p>
              <p className="text-gray-600">Available: {doc.available}</p>
              <p className="text-gray-600">Location: {doc.location}</p>

              {/* WhatsApp Chat Button */}
              <a
                href={`https://wa.me/${doc.whatsapp.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                <FaWhatsapp className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          ))}
        </div>
      )}
      
    </motion.div>
  )
}

export default TalkToDoctor
