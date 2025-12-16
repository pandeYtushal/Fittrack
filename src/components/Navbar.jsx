import { useState } from "react";
import { NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import {Menu,X,Home,Dumbbell,Apple,BarChart3,User,LogOut,} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const linkClass ="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-800";

  return (
    <nav className="w-full bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold text-2xl flex items-center gap-2">FitTrack</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-2 items-center">
          <NavLink to="/" className={linkClass}>
            <Home size={20} /> Home
          </NavLink>
          <NavLink to="/workouts" className={linkClass}>
            <Dumbbell size={20} /> Workouts
          </NavLink>
          <NavLink to="/diet" className={linkClass}>
            <Apple size={20} /> Diet
          </NavLink>
          <NavLink to="/progress" className={linkClass}>
            <BarChart3 size={20} /> Progress
          </NavLink>
          <NavLink to="/profile" className={linkClass}>
            <User size={20} /> Profile
          </NavLink>

          <button onClick={handleLogout}className="flex items-center gap-2 bg-red-600 px-3 py-2 rounded-full hover:bg-red-700">
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)}className="md:hidden">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-6 py-4 space-y-3">
          <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>
            <Home size={20} /> Home
          </NavLink>
          <NavLink to="/workouts" className={linkClass} onClick={() => setOpen(false)}>
            <Dumbbell size={20} /> Workouts
          </NavLink>
          <NavLink to="/diet" className={linkClass} onClick={() => setOpen(false)}>
            <Apple size={20} /> Diet
          </NavLink>
          <NavLink to="/progress" className={linkClass} onClick={() => setOpen(false)}>
            <BarChart3 size={20} /> Progress
          </NavLink>
          <NavLink to="/profile" className={linkClass} onClick={() => setOpen(false)}>
            <User size={20} /> Profile
          </NavLink>

          <button onClick={handleLogout}className="w-auto rounded-full flex items-center gap-2 bg-red-600 px-3 py-2 rounded hover:bg-red-700">
            <LogOut size={18} />Logout
          </button>
        </div>
      )}
    </nav>
  );
}
