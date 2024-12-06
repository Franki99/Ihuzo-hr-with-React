import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { userService } from "../../services/user";

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth(); // Added logout back
  const location = useLocation();

  useEffect(() => {
    if (user) {
      console.log("DashboardLayout - Current user:", user);
      console.log("DashboardLayout - User roles:", user?.roles);
      console.log("Admin check:", user?.roles?.[0] === "ROLE_ADMIN");
    }
  }, [user]);

  // Simplified admin check
  const isAdmin = user?.roles?.includes("ROLE_ADMIN");

  return (
    <div className="min-h-screen bg-background-dark">
      {/* Navbar */}
      <nav className="bg-[#121212] border-b border-gray-800/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img
                  src="https://i.pinimg.com/originals/3a/23/e6/3a23e6008d880405a27aa59b7072b097.jpg"
                  alt="Logo"
                  className="h-10 w-10 rounded-full ring-2 ring-orange-500/20"
                />
                <span className="ml-2 text-white font-bold text-lg">
                  Ihuzo Smart HR Tool
                </span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                  ${
                    location.pathname === "/dashboard"
                      ? "bg-orange-500/10 text-orange-500"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                Dashboard
              </Link>

              {/* Show Employees link for admin */}
              {isAdmin && (
                <Link
                  to="/users"
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                    ${
                      location.pathname === "/users"
                        ? "bg-orange-500/10 text-orange-500"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                  Employees
                </Link>
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl text-sm font-medium text-gray-400 
                         hover:text-white hover:bg-white/5 transition-all duration-300"
              >
                Logout
              </button>

              <Link
                to="/profile/edit"
                className="flex items-center space-x-2 bg-[#181818] rounded-xl p-2 
                         border border-gray-800/20 hover:border-orange-500/20 transition-all duration-300"
              >
                <img
                  src={userService.getProfilePictureUrl(user?.profilePicture)}
                  alt="Profile"
                  className="h-8 w-8 rounded-lg"
                />
                <span className="text-sm font-medium text-gray-400 hover:text-white">
                  {user?.firstName || "User"}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}

// PropTypes validation
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
