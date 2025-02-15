import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InfoAlert from "../components/InfoAlert";

const Login = () => {
    const navigate = useNavigate()
    const text = 'Login disabled for users, contact admin for more info.'
  return (
    
    <>
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    <InfoAlert message={text} />
       <motion.div
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8 }}
         className="bg-white shadow-xl rounded-2xl px-8 py-10 max-w-md w-full border border-gray-200 mt-10"
       >
         {/* Title */}
         <h2 className="text-3xl font-bold text-gray-900 text-center">
           Welcome Back
         </h2>
         <p className="text-gray-600 text-center mt-2">Log in to your account</p>
 
         {/* Form */}
         <form className="mt-6 space-y-4">
           {/* Email Input */}
           <div className="relative">
             <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
             <input
               type="email"
               placeholder="Email Address"
               className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
             />
           </div>
 
           {/* Password Input */}
           <div className="relative">
             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
             <input
               type="password"
               placeholder="Password"
               className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
             />
           </div>
 
           {/* Forgot Password */}
           <div className="text-right cursor-pointer">
             <a 
             onClick={() => navigate("/forgot_password")}
             className="text-orange-600 hover:underline text-sm">
               Forgot password?
             </a>
           </div>
 
           {/* Submit Button */}
           <motion.button
           disabled
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition duration-300 cursor-pointer disabled:bg-gray-300 disabled:cursor-auto"
           >
             Log In
           </motion.button>
 
           {/* Separator */}
           <div className="flex items-center justify-center space-x-2">
             <div className="w-1/3 h-px bg-gray-300"></div>
             <p className="text-gray-500 text-sm">or</p>
             <div className="w-1/3 h-px bg-gray-300"></div>
           </div>
 
           {/* Sign Up Link */}
           <p className="text-center text-gray-600 text-sm">
             Don't have an account?{" "}
             <a onClick={() => navigate("/signup")} className="text-orange-600 font-medium hover:underline cursor-pointer">
               Sign Up
             </a>
           </p>
         </form>
       </motion.div>
     </div>
    </>
  );
};

export default Login;
