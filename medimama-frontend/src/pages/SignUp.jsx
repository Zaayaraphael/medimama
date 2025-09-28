import React, { useState } from "react";
import countryList from "react-select-country-list";
import NaijaStates from "naija-state-local-government";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useAuthStore } from "../store/auth";
import toast from "react-hot-toast";


const Signup = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    dob: "",
    nationality: "",
    state: "",
    lga: "",
    city: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [states, setStates] = useState([]);
  const [lgas, setLgas] = useState([]);
  const countries = countryList().getData();

  const {Signup, isLoading, error} = useAuthStore();

  

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "nationality") {
      if (value === "Nigeria") {
        setStates(NaijaStates.states());
      } else {
        setStates([]);
        setLgas([]);
      }
    }

    if (name === "state") {
      setLgas(NaijaStates.lgas(value).lgas);
    }
  };

  // Validation function
  const validate = () => {
    let newErrors = {};

    if (!formData.firstname.trim()) newErrors.firstname = "First name is required";
    if (!formData.lastname.trim()) newErrors.lastname = "Last name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10-15 digits";
    }

    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.nationality) newErrors.nationality = "Nationality is required";

    if (formData.nationality === "Nigeria") {
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.lga) newErrors.lga = "LGA is required";
    }

    if (!formData.city.trim()) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validate first
    if (!validate()) return;

    try {
      const { firstname, lastname, email, phone, dob, nationality, state, lga, city, password } = formData;
      await Signup(firstname, lastname, email, phone, dob, nationality, state, lga, city, password);
      toast.success('Signup successful');
      navigate('/');
    } catch (err) {
      console.error('Signup failed:', err);
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <motion.div 
    initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.4 }}
    
    className="max-w-xl items-center justify-center mx-auto p-6 mt-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-green-700 mb-6">Sign Up</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        {/* Date of Birth */}
       <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="dob"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}
        </div>

        {/* Nationality */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nationality <span className="text-red-500">*</span>
          </label>
          <select
            name="nationality"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select Nationality</option>
            {countries.map((country, idx) => (
              <option key={idx} value={country.label}>
                {country.label}
              </option>
            ))}
          </select>
          {errors.nationality && <p className="text-red-500 text-sm">{errors.nationality}</p>}
        </div>

        {/* State */}
        {states.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State <span className="text-red-500">*</span>
            </label>
            <select
              name="state"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select State</option>
              {states.map((state, idx) => (
                <option key={idx} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
          </div>
        )}

        {/* LGA */}
        {lgas.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LGA <span className="text-red-500">*</span>
            </label>
            <select
              name="lga"
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select LGA</option>
              {lgas.map((lga, idx) => (
                <option key={idx} value={lga}>
                  {lga}
                </option>
              ))}
            </select>
            {errors.lga && <p className="text-red-500 text-sm">{errors.lga}</p>}
          </div>
        )}

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City 
          </label>
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
        </div>

{/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}  
        </div>


        {error && <p className=" text-red-500">{error}</p>} 
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Sign Up
        </button>
      </form>
       <div className='mt-10 text-black text-sm flex justify-between w-full px-4 items-center '>
            <p>Already have an account? <span onClick={() => navigate("/signin")}
                className='text-green-700 font-medium cursor-pointer ml-2 hover:underline'>
                    Sign In Now</span></p>

        </div>
    </motion.div>
  );
};

export default Signup;
