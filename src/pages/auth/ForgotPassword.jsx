import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { authService } from "../../services/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting forgot password request...");
      const response = await authService.forgotPassword(email);
      console.log("Forgot password response:", response);
      setMessage("Password reset instructions have been sent to your email.");
      setError("");
    } catch (error) {
      console.error("Forgot password error:", error);
      setError(
        error.response?.data?.message ||
          "Failed to send reset instructions. Please try again."
      );
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#121212] rounded-2xl shadow-2xl border border-gray-800/20 backdrop-blur-xl 
                     transform hover:scale-[1.02] transition-all duration-500"
        >
          {/* Header */}
          <div className="bg-[#151515] text-white text-center py-8 px-4 border-b border-gray-800/20 rounded-t-2xl">
            <div className="flex items-center justify-center space-x-3">
              <img
                src="https://i.pinimg.com/originals/3a/23/e6/3a23e6008d880405a27aa59b7072b097.jpg"
                alt="Logo"
                className="h-12 w-12 rounded-full ring-2 ring-orange-500/20 animate-pulse"
              />
              <h2 className="text-3xl font-bold text-white/90">
                Forgot Password?
              </h2>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            {error && (
              <div
                className="bg-red-500/10 border border-red-500/10 text-red-400 px-4 py-3 
                          rounded-xl relative mb-6 animate-shake"
              >
                {error}
              </div>
            )}

            {message && (
              <div
                className="bg-green-500/10 border border-green-500/10 text-green-400 px-4 py-3 
                          rounded-xl relative mb-6"
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-gray-400 text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-gray-800/50 
                           text-white placeholder-gray-500 focus:outline-none focus:ring-1 
                           focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-sm font-medium text-white
                         bg-orange-500 hover:bg-orange-600 
                         focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-offset-[#121212] focus:ring-orange-500
                         transition-all duration-300 transform hover:-translate-y-1 
                         hover:shadow-lg hover:shadow-orange-500/25"
              >
                Send Reset Instructions
              </button>

              <div className="text-center mt-4">
                <Link
                  to="/login"
                  className="text-orange-500/80 hover:text-orange-500 transition-colors duration-300"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
