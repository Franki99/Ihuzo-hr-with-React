import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const email = searchParams.get("email");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.password !== passwords.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // This will be replaced with actual API call
      console.log("Reset password for:", email);
      navigate("/login", {
        state: { message: "Password has been reset successfully!" },
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
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
                <h2 className="text-2xl font-bold">Reset Your Password</h2>
              </div>
            </div>

            <div className="p-8">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={passwords.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter new password"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2c5282] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#234669] transition-all duration-300"
                >
                  Reset Password
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
