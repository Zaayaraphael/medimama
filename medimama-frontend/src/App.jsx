import { useState } from 'react'
import {  Routes, Route } from 'react-router-dom'

import Hero from './components/Hero'
import Navbar from './components/Navbar'
import AboutSection from './components/AboutSection'
import Footer from './components/footer'
import ChatBot from "./components/ChatBot.jsx"
import FeedBack from './components/feedBack.jsx'


import Pharmacy from './pages/pharmacy.jsx'
import Home from './pages/Home.jsx'
import Emergency from './pages/Emergency.jsx'
import Symptom from './pages/symptom.jsx'
import TalkToDoctor from './pages/TalkToDoctor.jsx'
import MaternalCare from './pages/MaternalCare.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import RequireAuth from './components/RequireAuth'
import DoctorList from './components/DoctorList.jsx'
import Community from './pages/Community.jsx'
import { Toaster } from "react-hot-toast";
import { useAuthStore } from './store/auth.js'
import { useEffect } from 'react'

const App = ()  => {
  

  return (
    <>
    <Toaster />
    <Navbar />
    <ChatBot />
    
 
 

 <Routes>
  <Route path={'/'} element={<Home />} />
  <Route path={'/pharmacy'} element={<Pharmacy />} />
  <Route path={'/emergency'} element={<RequireAuth><Emergency /></RequireAuth>} />
  <Route path={'/symptom'} element={<Symptom />} />
  <Route path={'/signin'} element={<SignIn />} />
  <Route path={"/signup"} element={<SignUp />} />
  <Route path={'/doctorlist'} element={<DoctorList />} />

  <Route path={'/talktodoctor'} element={<TalkToDoctor />} />
  <Route path={'/maternalcare'} element={<MaternalCare />} />
  <Route path={"/community"} element={<Community />} />
 </Routes>
 </>
  )
}

export default App
