import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [showAdminLink, setShowAdminLink] = useState(false);

  useEffect(() => {
    if (user) {
      // Debug logs
      console.log("Full user object:", user);
      console.log("Roles:", user.roles);
      console.log("Type of roles:", typeof user.roles);
      console.log("Is roles array?", Array.isArray(user.roles));

      // Try to check for admin role
      const isAdmin = user.roles && user.roles.includes("ROLE_ADMIN");
      console.log("Is admin?", isAdmin);

      setShowAdminLink(isAdmin);
    }
  }, [user]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#121212] border-b border-gray-800/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://i.pinimg.com/originals/3a/23/e6/3a23e6008d880405a27aa59b7072b097.jpg"
              alt="Logo"
              className="h-10 w-10 rounded-full ring-2 ring-orange-500/20"
            />
            <span className="text-white/90 font-bold text-lg">
              Ihuzo Smart HR Tool
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dashboard Link */}
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                ${
                  isActive("/dashboard")
                    ? "bg-orange-500/10 text-orange-500"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
            >
              Dashboard
            </Link>

            {/* Employees Link */}
            {showAdminLink && (
              <Link
                to="/users"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                  ${
                    isActive("/users")
                      ? "bg-orange-500/10 text-orange-500"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
              >
                Employees
              </Link>
            )}

            {/* Debug Info - Only in development */}
            <div className="text-xs text-gray-400">
              {user?.roles
                ? `Roles: ${JSON.stringify(user.roles)}`
                : "No roles"}
            </div>
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
                src={user?.profilePicture || "https://via.placeholder.com/32"}
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
  );
}
