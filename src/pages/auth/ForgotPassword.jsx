import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // This will be replaced with actual API call
      console.log("Reset password for:", email);
      setMessage("Password reset instructions have been sent to your email.");
      setError("");
    } catch (error) {
      // Changed from err to error
      setError(
        error.response?.data?.message ||
          "Failed to send reset instructions. Please try again."
      );
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#2c5282] to-[#4299e1] flex items-center justify-center">
      <div className="container px-4 mx-auto">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="bg-[#2c5282] text-white text-center py-6">
              <div className="flex items-center justify-center space-x-3">
                <img
                  src="https://pbs.twimg.com/profile_images/1788231088302653440/5xKfAdI8_200x200.jpg"
                  alt="Logo"
                  className="w-10 h-10 rounded-full"
                />
                <h2 className="text-2xl font-bold">Forgot Password?</h2>
              </div>
            </div>

            <div className="p-8">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              {message && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2c5282] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#234669] transition-all duration-300"
                >
                  Submit
                </button>

                <div className="mt-6 text-center">
                  <Link
                    to="/login"
                    className="text-[#2c5282] hover:text-[#234669] transition-colors duration-300"
                  >
                    Back to Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
