import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { 
  Search, Menu, X, 
  Home, Activity, Stethoscope, HeartPulse, 
  Ambulance, Pill, Users, BookOpen, Settings, LogOut, HelpCircle
} from "lucide-react";
import { useAuthStore } from "../store/auth";

const Navbar = () => {
  const {user} = useAuthStore();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  

  const avatarUrl = user ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.username)}` : "";






  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navRef = useRef(null);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }

    function handleKey(e) {
      if (e.key === "Escape") {
        setShowMenu(false);
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [dropdownRef]);

  const handleLogOut = () => {
    // clear user from zustand store
    try {
      if (typeof useAuthStore.setState === "function") {
        useAuthStore.setState({ user: null });
      }
    } catch (err) {
      // fall back: no-op
    }
    setShowMenu(false);
    setIsOpen(false);
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-1 px-3 py-2 rounded-md transition transform hover:-translate-y-1 ${
      isActive
        ? "bg-green-600 text-white font-semibold shadow-md"
        : "hover:bg-gray-100"
    }`;

  return (
    <nav className="flex justify-between items-center p-4 shadow-md h-20 md:text-[15px] relative">
      {/* Logo */}
      <div className="text-2xl font-bold text-nowrap">
        Medi<span className="text-green-500">Mama</span>
      </div>

      {/* Desktop Links */}
      <ul className="hidden md:flex gap-4 font-medium">
        <li>
          <NavLink to="/" className={linkClass}>
            <Home size={18} />
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/symptom" className={linkClass}>
            <Activity size={18} />
            Symptom Checker
          </NavLink>
        </li>
        <li>
          <NavLink to="/TalkToDoctor" className={linkClass}>
            <Stethoscope size={18} />
            Telehealth
          </NavLink>
        </li>
        <li>
          <NavLink to="/MaternalCare" className={linkClass}>
            <HeartPulse size={18} />
            Maternal Care
          </NavLink>
        </li>
        <li>
          <NavLink to="/emergency" className={linkClass}>
            <Ambulance size={18} />
            Emergency Aid
          </NavLink>
        </li>
        <li>
          <NavLink to="/pharmacy" className={linkClass}>
            <Pill size={18} />
            Pharmacy
          </NavLink>
        </li>
        <li>
          <NavLink to="/community" className={linkClass}>
            <Users size={18} />
            Community
          </NavLink>
        </li>
        <li>
          <NavLink to="/resources" className={linkClass}>
            <BookOpen size={18} />
            Resources
          </NavLink>
        </li>
      </ul>

      {/* Search + Login (Desktop only) */}
      <div className="hidden md:flex items-center space-x-6 relative">
        <div className="relative">
          <input
            type="text"
            className="bg-white px-4 py-2 rounded-full min-w-72 pr-10 outline-none text-black"
            placeholder="Search..."
          />
          <Search className="absolute top-2 right-4 w-5 h-5 text-black" />
        </div>

        {!user ? (
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-green-700 text-white font-semibold shadow-md"
                  : "bg-green-600 text-white hover:bg-green-700 hover:shadow-xl"
              }`
            }
          >
            Login
          </NavLink>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <img
              src={avatarUrl}
              alt="avatar"
              className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer"
              onClick={() => setShowMenu((s) => !s)}
            />

            {showMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b">
                  <div className="font-semibold text-gray-800 truncate">{user.username}</div>
                  <div className="text-xs text-gray-500 truncate">{user.email}</div>
                </div>

                <button className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center gap-3 text-gray-700">
                  <HelpCircle className="w-5 h-5" />
                  Help Center
                </button>

                <button className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center gap-3 text-gray-700">
                  <Settings className="w-5 h-5" />
                  Settings
                </button>

                <button
                  onClick={() => {
                    // handle logout below
                    if (typeof handleLogOut === "function") handleLogOut();
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center gap-3 text-gray-700"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hamburger Button (Mobile) */}
      <button
        className="md:hidden text-black"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white shadow-lg z-50 md:hidden">
          <ul className="flex flex-col gap-3 p-6 font-medium">
            <li>
              <NavLink to="/" className={linkClass} onClick={() => setIsOpen(false)}>
                <Home size={18} /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/symptom" className={linkClass} onClick={() => setIsOpen(false)}>
                <Activity size={18} /> Symptom Checker
              </NavLink>
            </li>
            <li>
              <NavLink to="/TalkToDoctor" className={linkClass} onClick={() => setIsOpen(false)}>
                <Stethoscope size={18} /> Telehealth
              </NavLink>
            </li>
            <li>
              <NavLink to="/MaternalCare" className={linkClass} onClick={() => setIsOpen(false)}>
                <HeartPulse size={18} /> Maternal Care
              </NavLink>
            </li>
            <li>
              <NavLink to="/emergency" className={linkClass} onClick={() => setIsOpen(false)}>
                <Ambulance size={18} /> Emergency Aid
              </NavLink>
            </li>
            <li>
              <NavLink to="/pharmacy" className={linkClass} onClick={() => setIsOpen(false)}>
                <Pill size={18} /> Pharmacy
              </NavLink>
            </li>
            <li>
              <NavLink to="/community" className={linkClass} onClick={() => setIsOpen(false)}>
                <Users size={18} /> Community
              </NavLink>
            </li>
            <li>
              <NavLink to="/resources" className={linkClass} onClick={() => setIsOpen(false)}>
                <BookOpen size={18} /> Resources
              </NavLink>
            </li>
            <li>
              {!user ? (
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg ${
                      isActive
                        ? "bg-green-700 text-white font-semibold shadow-md"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </NavLink>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={avatarUrl} alt="avatar" className="w-12 h-12 rounded-full" />
                    <div>
                      <div className="font-semibold text-gray-800">{user.username}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>

                  <div className="flex flex-col ml-4">
                    <NavLink to="/settings" className="text-sm text-green-600 mb-2" onClick={() => setIsOpen(false)}>Settings</NavLink>
                    <button onClick={() => { if (typeof handleLogOut === 'function') handleLogOut(); }} className="text-sm text-red-600">Sign Out</button>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}

    
    </nav>
  );
};

export default Navbar;
