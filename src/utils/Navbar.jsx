import { useState } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  console.log(activeSection)
  const menuItems = [
    { name: "Home", id: "home" },
    { name: "Features", id: "features" },
    { name: "Pricing", id: "pricing" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <nav className="bg-white fixed w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex justify-between items-center h-16">
        
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
          onClick={() => navigate("/")}
            to="home"
            smooth={true}
            className="text-orange-500 text-4xl font-extrabold cursor-pointer"
          >
            JSF AI
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * menuItems.indexOf(item) }}
            >
              <Link
                onClick={() => navigate("/")}
                to={item.id}
                smooth={true}
                className={`cursor-pointer transition duration-300 text-lg font-medium `}
                onSetActive={() => setActiveSection(item.id)}
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right Side (Auth + Mobile Menu) */}
        <div className="flex items-center space-x-6">
          {/* Login & Register Buttons */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="hidden lg:flex">
            <Link onClick={() => navigate("/login")}>
              <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white transition duration-300 cursor-pointer">
                Login
              </button>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="hidden lg:flex">
            <Link  onClick={() => navigate("/signup")}>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300 cursor-pointer">
                Register
              </button>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX size={30} /> : <HiMenu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Framer Motion Animation) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="md:hidden bg-white py-4 space-y-4 shadow-lg px-2"
          >
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                smooth={true}
                onClick={() => {
                  setIsOpen(false);
                  setActiveSection(item.id);
                }}
                className={`block text-lg font-medium py-2 cursor-pointer border p-2 border-gray-400 rounded-lg `}
              >
                {item.name}
              </Link>
            ))}

            {/* Login & Register in Mobile Menu */}
            <div className="flex flex-col items-center space-y-3 mt-4">
              <Link onClick={() => navigate("/login")} className="w-full cursor-pointer">
                <button className="border border-orange-500 text-orange-500 px-4 py-2 rounded-md hover:bg-orange-500 hover:text-white transition duration-300 w-full cursor-pointer">
                  Login
                </button>
              </Link>
              <Link onClick={() => navigate("/signup")} className="w-full cursor-pointer">
                <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300 w-full cursor-pointer">
                  Register
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
