import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/auth";
import { userService } from "../services/user";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await userService.getCurrentUser();
          console.log("Current user data:", response.data);
          setUser(response.data);
        } catch (error) {
          console.error("Error fetching user:", error);
          localStorage.removeItem("token");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      console.log("Login response:", response.data);

      if (response.data) {
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        return response.data.user;
      }
    } catch (error) {
      console.error("Login error:", error);
      throw new Error(error.response?.data || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const updateProfilePicture = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      console.log("Uploading profile picture...");
      const response = await userService.uploadProfilePicture(formData);
      console.log("Upload response:", response);

      if (response.data && response.data.profilePicture) {
        setUser((prev) => ({
          ...prev,
          profilePicture: response.data.profilePicture,
        }));
        return response.data.profilePicture;
      }
      throw new Error("Failed to update profile picture");
    } catch (error) {
      console.error("Profile picture upload error:", error);
      // Don't logout on upload error
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const updateUserProfile = async (data) => {
    try {
      const response = await userService.updateProfile(data);
      if (response.data) {
        // Immediately update the user state with the new data
        setUser((prev) => ({
          ...prev,
          ...response.data,
        }));
        return response.data;
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      console.log("Registration response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error(error.response?.data || "Registration failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        updateProfilePicture,
        updateUserProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
