import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 transform hover:scale-105 transition-all duration-300">
        {/* Card Container */}
        <div className="bg-[#121212] rounded-2xl shadow-2xl overflow-hidden border border-gray-800/20 backdrop-blur-xl">
          {/* Card Header */}
          <div className="bg-[#151515] text-white text-center py-8 px-4 border-b border-gray-800/20">
            <div className="flex items-center justify-center space-x-3">
              <img
                src="https://i.pinimg.com/originals/3a/23/e6/3a23e6008d880405a27aa59b7072b097.jpg"
                alt="Logo"
                className="h-12 w-12 rounded-full ring-2 ring-orange-500/20 animate-pulse"
              />
              <h2 className="text-3xl font-bold text-white/90">Welcome Back</h2>
            </div>
          </div>

          {/* Card Body */}
          <div className="px-8 py-8">
            {error && (
              <div className="bg-red-900/5 border border-red-500/10 text-red-400 px-4 py-3 rounded-xl relative mb-4 animate-shake">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label
                  htmlFor="email"
                  className="block text-gray-400 text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={credentials.email}
                  onChange={handleChange}
                  className="appearance-none rounded-xl relative block w-full px-4 py-3 
                           bg-[#181818] border border-gray-800/50 placeholder-gray-500 text-white
                           focus:outline-none focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50
                           transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>

              <div className="group">
                <label
                  htmlFor="password"
                  className="block text-gray-400 text-sm font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={credentials.password}
                  onChange={handleChange}
                  className="appearance-none rounded-xl relative block w-full px-4 py-3 
                           bg-[#181818] border border-gray-800/50 placeholder-gray-500 text-white
                           focus:outline-none focus:ring-1 focus:ring-orange-500/50 focus:border-orange-500/50
                           transition-all duration-300"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-orange-500/80 hover:text-orange-500 transition-colors duration-300"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 rounded-xl text-sm font-medium text-white
                         bg-orange-500 hover:bg-orange-600
                         focus:outline-none focus:ring-2 focus:ring-offset-2 
                         focus:ring-offset-[#121212] focus:ring-orange-500
                         transition-all duration-300 transform hover:-translate-y-1 
                         hover:shadow-lg hover:shadow-orange-500/25"
              >
                Sign in
              </button>

              <div className="text-center mt-4">
                <span className="text-gray-500">
                  Don&apos;t have an account?{" "}
                </span>
                <Link
                  to="/register"
                  className="font-medium text-orange-500/80 hover:text-orange-500 transition-colors duration-300"
                >
                  Register here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
