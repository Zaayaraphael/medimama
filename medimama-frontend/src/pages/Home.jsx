import React from 'react'
import Hero from '../components/Hero'
import AboutSection from '../components/AboutSection'
import FeedBack from '../components/feedBack'
import Footer from '../components/footer'
import Pharmacy from './pharmacy'


const Home = () => {
  return (
    <div className='p-5'>
      <Hero />
      <AboutSection />
      <FeedBack />
      <Footer />
      
    </div>
  )
}

export default Home
