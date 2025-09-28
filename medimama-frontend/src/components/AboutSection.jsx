import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';


const AboutSection = () => {
  return ( 
    <div 
     
    className='  justify-between py-16 px-6 
    rounded-2xl'> 


      <div 
      
      className="flex items-center justify-center">
  <motion.div 
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.9 }}
  viewport={{ once: true, amount: 0.3 }}
  
  className="max-w-xl text-center">
    <h1 className="text-5xl font-bold text-green-600 mb-6">
      Resilient Health, Powered by AI
    </h1>

    <p className="text-lg text-gray-600 mb-8">
      MediMama helps mothers, families, and communities access instant,
      reliable healthcare advice, connect with doctors, and find emergency
      support anytime, anywhere.
    </p>
<div>
    <div className="flex gap-6 justify-center">
      <Link
        to="/Symptom"
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        Try AI Symptom Checker
      </Link>
      <Link
        to="/TalkToDoctor"
        className="px-6 py-3 border border-green-600 text-green-700 rounded-lg hover:bg-green-100"
      >
        Talk to a Doctor
      </Link>
    </div>
  </div>
</motion.div>

      </div>
      <section className="py-16 grid md:grid-cols-3 gap-6 text-center">
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
          <h3 className="text-xl font-bold text-green-700 mb-3">24/7 AI Health Assistant</h3>
          <p className="text-gray-600">Instant medical advice at your fingertips, anytime, anywhere.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
          <h3 className="text-xl font-bold text-green-700 mb-3">Telehealth Access</h3>
          <p className="text-gray-600">Video consultations with doctors & nurses, directly from your phone.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
          <h3 className="text-xl font-bold text-green-700 mb-3">Maternal Care Support</h3>
          <p className="text-gray-600">Pregnancy tracking, nutrition tips, and safe delivery guidance.</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-green-50 rounded-lg text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Our Mission & Vision</h2>
        <p className="max-w-3xl mx-auto text-gray-700 mb-4">
          Our mission is to make healthcare accessible, affordable, and AI-driven for mothers, children, and families everywhere.
        </p>
        <p className="max-w-3xl mx-auto text-gray-700">
          Our vision is a world where no mother or child is left without medical care, no matter where they live.
        </p>
      </section>
    </div>
  )
}

export default AboutSection
