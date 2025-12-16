import { Dumbbell, Heart, Mail, Github, Linkedin, Instagram } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const linkClass =
    "hover:text-white transition-colors";

  return (
    <footer className="w-full bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-white text-xl font-bold flex items-center gap-2">
            <Dumbbell className="text-green-500" /> FitTrack
          </h2>
          <p className="mt-3 text-sm">
            Train smarter. Eat better. Track progress.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <NavLink to="/" className={linkClass}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/workouts" className={linkClass}>Workouts</NavLink>
            </li>
            <li>
              <NavLink to="/diet" className={linkClass}>Diet Plans</NavLink>
            </li>
            <li>
              <NavLink to="/progress" className={linkClass}>Progress</NavLink>
            </li>
            <li>
              <NavLink to="/profile" className={linkClass}>Profile</NavLink>
            </li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
        <h3 className="text-white font-semibold mb-3">Connect</h3>

  <div className="flex gap-4 mt-2">
    {/* Email */}
    <a href="mailto:tushalanand4@gmail.com"className="hover:text-red-500 transition"aria-label="Email">
      <Mail className="cursor-pointer" />
    </a>

    {/* GitHub */}
    <a href="https://github.com/pandeYtushal"target="_blank"rel="noopener noreferrer"className="hover:text-gray-400 transition"aria-label="GitHub">
      <Github className="cursor-pointer" />
    </a>

    {/* LinkedIn */}
    <a href="https://www.linkedin.com/in/tushal-anand18"target="_blank"rel="noopener noreferrer"className="hover:text-blue-500 transition"aria-label="LinkedIn">
      <Linkedin className="cursor-pointer" />
    </a>
    {/* Instagram */}
    <a href="https://www.instagram.com/_tushal.pandey"target="_blank"rel="noopener noreferrer"className="hover:text-red-500 transition"aria-label="Instagram">
      <Instagram className="cursor-pointer" />
    </a>
  </div>
</div>
</div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-4 text-center text-sm">
  <p className="flex items-center justify-center gap-1 flex-wrap">
    © {new Date().getFullYear()} FitTrack • Built with
    <Heart size={14} className="text-red-500" />By
    <a href="https://tushal-pandey.vercel.app"target="_blank"rel="noopener noreferrer"
    className="text-orange-500 hover:text-orange-500">
      Tushal Pandey
    </a>
  </p>
</div>

    </footer>
  );
}
