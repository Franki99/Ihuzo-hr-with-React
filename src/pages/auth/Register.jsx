import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    dateOfBirth: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate("/login");
    } catch (error) {
      setError(error.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div
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
                Create Account
              </h2>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            {error && (
              <div
                className="bg-red-900/5 border border-red-500/10 text-red-400 px-4 py-3 
                            rounded-xl relative mb-6 animate-shake"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Form Fields */}
                <div className="space-y-2">
                  <label className="text-gray-400 text-sm font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-gray-800/50 
                             text-white placeholder-gray-500 focus:outline-none focus:ring-1 
                             focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-400 text-sm font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-gray-800/50 
                             text-white placeholder-gray-500 focus:outline-none focus:ring-1 
                             focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-400 text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-gray-800/50 
                             text-white placeholder-gray-500 focus:outline-none focus:ring-1 
                             focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-400 text-sm font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-gray-800/50 
                             text-white placeholder-gray-500 focus:outline-none focus:ring-1 
                             focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-400 text-sm font-medium">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-gray-800/50 
                             text-white placeholder-gray-500 focus:outline-none focus:ring-1 
                             focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-gray-400 text-sm font-medium">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#181818] border border-gray-800/50 
                             text-white placeholder-gray-500 focus:outline-none focus:ring-1 
                             focus:ring-orange-500/50 focus:border-orange-500/50 transition-all duration-300"
                    required
                  />
                </div>
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
                Create Account
              </button>

              <div className="text-center mt-4">
                <span className="text-gray-500">Already have an account? </span>
                <Link
                  to="/login"
                  className="font-medium text-orange-500/80 hover:text-orange-500 transition-colors duration-300"
                >
                  Login here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
