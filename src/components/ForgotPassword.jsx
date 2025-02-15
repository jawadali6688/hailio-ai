import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const ForgotPassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-xl rounded-2xl px-8 py-10 max-w-md w-full border border-gray-200"
      >
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Forgot Password?
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Enter your email address to reset your password.
        </p>

        {/* Form */}
        <form className="mt-6 space-y-4">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Send Reset Link
          </motion.button>

          {/* Back to Login */}
          <p className="text-center text-gray-600 text-sm">
            Remember your password?{" "}
            <a href="#" className="text-orange-600 font-medium hover:underline">
              Log In
            </a>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
