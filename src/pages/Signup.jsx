import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useState } from "react";
import InfoAlert from "../components/InfoAlert";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import API from "../../urls";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  // Register user
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await API.post("auth/register", data);
      console.log("Signup successful:", response.data);

      // Redirect to dashboard after successful signup
      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error.response?.data?.message || "Something went wrong!");
      setErrorMessage(error.response?.data?.message || "Error during signup.");
    } finally {
      setLoading(false);
    }
  };


  const text = 'Hey folks, register your account and enjoy voice generation'
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-2">
      <InfoAlert message={text} />
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
        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name Input */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Full Name"
              {...register("fullName", { required: "Full Name is required" })}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

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

          {/* Password Input with Eye Toggle */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Minimum 6 characters required" } })}
              className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Error Message */}
          {errorMessage && <p className="text-red-500 text-center text-sm">{errorMessage}</p>}

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition duration-300 cursor-pointer disabled:bg-gray-300 disabled:cursor-auto"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </motion.button>

          {/* Separator */}
          <div className="flex items-center justify-center space-x-2">
            <div className="w-1/3 h-px bg-gray-300"></div>
            <p className="text-gray-500 text-sm">or</p>
            <div className="w-1/3 h-px bg-gray-300"></div>
          </div>

          {/* Google Sign Up */}
          <motion.button
            disabled
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center space-x-2 border border-gray-300 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition disabled:bg-gray-200 disabled:text-white duration-300 cursor-pointer"
          >
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
            <span>Sign up with Google</span>
          </motion.button>

          {/* Login Link */}
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <a onClick={() => navigate("/login")} className="text-orange-600 font-medium hover:underline cursor-pointer">
              Log In
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
