import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import medibg from "../assets/medibg.png";
import Navbar from './Navbar';

const Hero = () => {
  return (
  
    <motion.div 
     initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.4 }}
    
    className='relative  w-full h-[90vh] flex items-center inset-0 p-30
     justify-center pt-20'>
        <img src={medibg}
        alt="Pregnant Mother with Nurses" 
        className='relative w-full h-full object-cover overflow-hidden inset-0'/>

        {/* OVERLAY */}
        <div className='absolute w-full h-full bg-gradient-to-r 
        from-green-900/70 to-green-600/40'></div>
      
      {/* CONTENT */}
      <div className='relative z-10 max-w-6xl mx-auto px-6 lg:px-12 text-white'>

        {/* ANIMATED HEADLINE */}
        <motion.h1

        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}

        className='text-4xl md:text-6xl font-bold mb-4 leading-tight'>
            Caring for mothers, <br />Saving lives
        </motion.h1>

        {/* Animated Subtext */}
        <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}

        className='text-lg md:text-xl mb-6 max-w-2xl'
        >
             MediMama connects pregnant women to doctors, emergency aid, and nearby
          pharmacies — powered by AI for quick lifesaving support.
        </motion.p>

        {/* ANIMATED BUTTONS */}

         <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex gap-4 mb-10"
        >
         
          <Link
            to="/telehealth"
            className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg text-white shadow-lg
            hover:shadow-xl transition transform hover:-translate-y-2"
          >
            Get Telehealth Help
          </Link>
          <Link
            to="/emergency"
            className="px-6 py-3 bg-white hover:bg-gray-100 rounded-lg text-green-700 font-semibold shadow-lg
            hover:shadow-xl cursor-pointer transition transform hover:-translate-y-2"
          >
            Emergency Aid
          </Link> 
          
        </motion.div>

        {/* Feature Cards with stagger animation */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 hover:cursor-pointer"
        >
          {[
            { icon: "🩺", title: "24/7 Telehealth", text: "Instant video calls with doctors" },
            { icon: "🤖", title: "AI Assistant", text: "Smart guidance in emergencies" },
            
            { icon: "💊", title: "Nearest Pharmacy", text: "Find drugs & availability near you" },

            
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className="bg-white/20 backdrop-blur-lg p-4 rounded-xl text-center hover:scale-105 transition-transform"
            >
              <span className="text-3xl">{feature.icon}</span>
              <h3 className="font-semibold mt-2">{feature.title}</h3>
              <p className="text-sm">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.div>
  )
}

export default Hero;
