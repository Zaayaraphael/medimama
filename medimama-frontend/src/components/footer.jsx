import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Logo from "../assets/Logo.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-400 text-[#737373]  px-2 py-8 mt-16">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-8">
        {/* Links section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-xl">
          <ul className="flex flex-col space-y-2 
            ">
            <li className="hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer ">About Us</li>
            <li className="hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer ">How to use Medimama</li>
            <li className="hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer ">Privacy protection</li>
          </ul>

          <ul className="flex flex-col space-y-2 ">
            <li className="hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer ">Help Center</li>
            <li className="hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer ">Jobs</li>
            <li className="hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer ">Cookie Preferences</li>
            <li className="hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer ">Legal Notices</li>
          </ul>

          <ul className="flex flex-col space-y-2 
            ">
            <li className="hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer ">Media Center</li>
            <li className="hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer ">Terms of Use</li>
            <li className="hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer ">Contact Us</li>
          </ul>
        </div>

        {/* Social icons */}
        <div className="flex  gap-6 ">
          <h2 className=" text-3xl text-white ">Follow us!</h2>
          
          <a href="https://facebook.com/ZaayaRexisTer" target="_blank" rel="noreferrer">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com/zaayaraphael" target="_blank" rel="noreferrer">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <FaInstagram size={24} />
          </a>
          <a href="https://linkedin.com/in/zaaya-raphael" target="_blank" rel="noreferrer">
            <FaLinkedin size={24} />
          </a>
        </div>

        {/* Copyright */}
        <div>
          <p>
            &copy; {new Date().getFullYear()} Raphael Zaaya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
