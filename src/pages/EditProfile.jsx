import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function EditProfile() {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    dateOfBirth: user?.dateOfBirth || "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateUserProfile(formData);
      setStatus({ type: "success", message: "Profile updated successfully!" });
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      console.error("Profile update error:", error);
      setStatus({
        type: "error",
        message:
          error.response?.data || "Failed to update profile. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Edit Profile</h1>
          <p className="text-gray-400">Update your personal information</p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="bg-[#121212] rounded-xl p-6 border border-gray-800"
        >
          {status.message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                status.type === "success"
                  ? "bg-green-900/20 border border-green-500/20 text-green-500"
                  : "bg-red-900/20 border border-red-500/20 text-red-500"
              }`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg
                           text-white placeholder-gray-500 focus:outline-none focus:border-orange-500
                           transition-colors disabled:opacity-50"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg
                           text-white placeholder-gray-500 focus:outline-none focus:border-orange-500
                           transition-colors disabled:opacity-50"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg
                           text-white placeholder-gray-500 focus:outline-none focus:border-orange-500
                           transition-colors cursor-not-allowed opacity-70"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg
                           text-white placeholder-gray-500 focus:outline-none focus:border-orange-500
                           transition-colors disabled:opacity-50"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg
                           text-white placeholder-gray-500 focus:outline-none focus:border-orange-500
                           transition-colors disabled:opacity-50"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-6 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 
                         transition-all duration-300 transform hover:-translate-y-1
                         disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
