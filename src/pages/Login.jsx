import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import InfoAlert from "../components/InfoAlert";
import { useForm } from "react-hook-form";
import API from "../../urls";
import { useEffect, useState } from "react";
import { loginUser } from "../../store/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";


const Login = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const text = 'Login to your account to access your dashboard'
  const user = useSelector((auth) => auth.auth.userData);

    // React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  // API Call for Login
  const onSubmit = async (userData) => {
    try {
      setLoading(true)
      const { data } = await API.post("auth/login", userData);
      console.log("Login successful:", data);
      dispatch(loginUser(data?.data));

      // Redirect to dashboard after successful login
      navigate("/user_dashboard");
      toast.success(data?.message)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.success(error.response?.data?.message)
      console.error("Login error:", error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.accountType === "user" || user?.accountType === "test") {
      navigate("/user_dashboard")
    }
    else {
      navigate("/login")
    }
  }, [])




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
         <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* Email Input */}
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="email"
          placeholder="Email Address"
          {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      {/* Password Input */}
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters required" } })}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      

      {/* Forgot Password */}
      <div className="text-right cursor-pointer">
        <a onClick={() => navigate("/forgot_password")} className="text-orange-600 hover:underline text-sm">
          Forgot password?
        </a>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition duration-300 cursor-pointer disabled:bg-gray-300 disabled:cursor-auto"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Log In"}
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
