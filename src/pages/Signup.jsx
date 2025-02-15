import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useState } from "react";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-xl rounded-2xl px-8 py-10 max-w-md w-full border border-gray-200 mt-24"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Create an Account
        </h2>
        <p className="text-gray-600 text-center mt-2">Join us today!</p>

        {/* Form */}
        <form className="mt-6 space-y-4">
          {/* Name Input */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" size={20} />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Password Input with Eye Toggle */}
          <div className="relative ">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff  size={20} /> : <Eye  size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition duration-300 cursor-pointer"
          >
            Sign Up
          </motion.button>

          {/* Separator */}
          <div className="flex items-center justify-center space-x-2">
            <div className="w-1/3 h-px bg-gray-300"></div>
            <p className="text-gray-500 text-sm">or</p>
            <div className="w-1/3 h-px bg-gray-300"></div>
          </div>

          {/* Google Sign Up */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center space-x-2 border border-gray-300 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300"
          >
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
            <span>Sign up with Google</span>
          </motion.button>

          {/* Login Link */}
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <a href="#" className="text-orange-600 font-medium hover:underline">
              Log In
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
