import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const DoctorList = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    doctor: "",
    date: "",
    time: "",
    message: "",
  });
  const Navigate = useNavigate();


  const [submitted, setSubmitted] = useState(false);

  const doctors = [
    { name: "Dr. Musa Ibrahim", discipline: "Pediatrics" },
    { name: "Dr. Amina Yusuf", discipline: "Gynecology"},
    { name: "Dr. John Okafor", discipline: "General Medicine" },
    { name: "Dr. Fatima Bello", discipline: "Obstetrics" }, 
  ];


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Data:", formData);
    setSubmitted(true);
  };

  const handleBack = () => {
    setSubmitted(false);
  };

  const handleGoHome = () => {
    Navigate("/");
  }


  return (
    <div className='max-w-2xl mx-auto py-10 px-6 m-10 bg-white shadow-md rounded-lg'>

      <h1 className='text-3xl font-bond text-green-700 mb-6 text-center'>Book a Doctor's Appointment</h1>
      

      {!submitted ? (
      <form onSubmit={handleSubmit} className='space-y-4'>
        {/* name */}
        <input type="text"
        name='name'
        value={formData.name}
        onChange={handleChange}
        placeholder='Full Name'
        className='w-full p-3 border rounded-lg'
        required />

         <input type="email"
        name='email'
        value={formData.email}
        onChange={handleChange}
        placeholder='Email'
        className='w-full p-3 border rounded-lg'
        required />

         <input type="tel"
        name='phone'
        value={formData.phone}
        onChange={handleChange}
        placeholder='Your Phone Number'
        className='w-full p-3 border rounded-lg'
        required />

        {/* select doctor */}

        <select name="doctor" 
        value={formData.doctor}
        onChange={handleChange}
        className='w-full p-3 border rounded-lg'
        required
        >

          <option value="">Select Doctor</option>
          {doctors.map((doc, index) => (
            <option key={index} value={doc.name}>
              {doc.name} - {doc.discipline}
            </option>
          ))}
        </select>


        {/*Date */}

        <input type="date"
        name='date'
        value={formData.date}
        onChange={handleChange}
        className='w-full p-3 border rounded-lg'
        required />


        <input type="time"
        name='time'
        value={formData.time}
        onChange={handleChange}
        className='w-full p-3 border rounded-lg'
        required />

        <textarea name="message" 
        value={formData.message}
        onChange={handleChange}
        placeholder='Adittional notes (optional'
        className='w-full p-3 border rounded-lg' />

        <button 
        type='submit'
        className='w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-900 transition'>
Confirm Appoitnment
        </button>
        </form>
      ) : (
        <div className='text-center p-10 bg-green-50 border border-green-200 rounded-lg'>
          <h2 className='text-2xl font-semibold text-green-800 mb-4'>Appointment Confirmed!</h2>

          <p className='text-gray-700'>
            Thank you, {formData.name}. 
            Your appointment with 
            
            <span className='font-semibold'>{formData.doctor} </span>
            on 
            <span className='font-semibold'>{formData.date} at {formData.time}
              </span>
               has been booked.</p>
          <p className='text-green-700 mt-2'>We will contact you shortly at {formData.email} or {formData.phone}.</p>
        
        {/* back button */}
        <div className='mt-6 flex justify-between w-full px-4'>

          <button
          onClick={handleBack}
          className='bg-gray-500 text-white px-6 py-2 
          rounded-lg hover:bg-gray-600 hover:cursor-pointer' >
              Back
          </button>

          <button
          onClick={handleGoHome}
          className='bg-green-700 px-6 py-2 rounded-lg hover:bg-green-900 hover:cursor-pointer'>
            Go to Home
          </button>

        </div>
        </div>
      )}
    </div>
  )
}

export default DoctorList
