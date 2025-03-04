import { useState } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useLogout from "../../utils/Logout";
import toast from "react-hot-toast";

export default function UserNav({tab, setTab}) {
  const user = useSelector(auth => auth.auth.userData)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const logout = useLogout()
  return (
    <nav className="bg-gray-900 p-4 flex justify-between items-center shadow-md">
      {/* Left - Navigation Links */}
      <div className="flex gap-6">
        <h1 
        onClick={() => navigate("/")}
        className="text-4xl font-bold text-orange-500 mr-10 cursor-pointer hover:text-gray-500">JSF AI</h1>
        <a onClick={() => setTab("text_to_speech")} href="#" className={`  ${tab === 'text_to_speech' ? 'border-orange-500 font-semibold border-b-2 text-white' : 'text-gray-400'}`}>
          Text to Speech
        </a>
        <a 
        onClick={() => setTab("voice_clone")}
        href="#" className={`  ${tab === 'voice_clone' ? 'border-orange-500 font-semibold border-b-2 text-white' : 'text-gray-400'}`}>
          Clone Voice
        </a>
      </div>

      {/* Right - User Avatar & Dropdown */}
      <div className="flex gap-4">

      <h1>
      <button onClick={logout} className="mt-2 flex items-center space-x-2 text-red-400 hover:text-red-300 w-full text-left cursor-pointer">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
      </h1>
       
          <div>
        <img src={user?.avatar} alt="User Avatar" className="w-10 h-10 rounded-full border border-gray-700" />
        </div>
          
        
      </div>
      
    </nav>
  );
}
