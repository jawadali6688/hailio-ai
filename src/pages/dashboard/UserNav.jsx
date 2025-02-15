import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";

export default function UserNav() {
  const [isOpen, setIsOpen] = useState(false);
  const user = {
    name: "Jawad Khan",
    email: "jawad@gmail.com",
    avatar: "https://jawad-khan.vercel.app/assets/myProfile-BAuoORxB.png",
  };

  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center shadow-md">
      {/* Left - Navigation Links */}
      <div className="flex gap-6">
        <h1 className="text-4xl font-bold text-orange-500 mr-10 cursor-pointer hover:text-gray-500">JSF AI</h1>
        <a href="#" className="text-white font-semibold border-b-2 border-orange-500 pb-1">
          Text to Speech
        </a>
        <a href="#" className="text-gray-400 hover:text-white transition">
          Clone Voice
        </a>
      </div>

      {/* Right - User Avatar & Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-white focus:outline-none cursor-pointer"
        >
          <img src={user.avatar} alt="User Avatar" className="w-10 h-10 rounded-full border border-gray-700" />
          
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute right-0 mt-3 w-48 bg-gray-800 shadow-lg rounded-lg p-3 z-50">
            <p className="text-sm text-gray-300">{user.email}</p>
            <button className="mt-2 flex items-center space-x-2 text-red-400 hover:text-red-300 w-full text-left">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
