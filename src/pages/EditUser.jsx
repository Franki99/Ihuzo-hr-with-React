import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { userService } from "../services/user";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userService.getUserById(id);
        console.log("Response:", response);
        const user = response.data;

        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
          dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split("T")[0] : "",
        });
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await userService.updateUser(id, formData);
      navigate("/users");
    } catch (error) {
      console.error("Update error:", error);
      setError("Failed to update user");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#0A0A0A]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0A0A0A] text-white p-6"
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Edit Employee</h1>
          <p className="text-gray-400">Update employee information</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-[#121212] p-6 rounded-xl border border-gray-800"
        >
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
                required
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-800 rounded-lg
                         text-white placeholder-gray-500 focus:outline-none focus:border-orange-500
                         transition-colors disabled:opacity-50"
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
                required
                disabled={isSubmitting}
                className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-800 rounded-lg
                         text-white placeholder-gray-500 focus:outline-none focus:border-orange-500
                         transition-colors disabled:opacity-50"
              />
            </div>
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
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-800 rounded-lg
                       text-white placeholder-gray-500 focus:outline-none focus:border-orange-500
                       transition-colors disabled:opacity-50"
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
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-800 rounded-lg
                       text-white placeholder-gray-500 focus:outline-none focus:border-orange-500
                       transition-colors disabled:opacity-50"
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
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 bg-[#1a1a1a] border border-gray-800 rounded-lg
                       text-white placeholder-gray-500 focus:outline-none focus:border-orange-500
                       transition-colors disabled:opacity-50"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600
                     transition-all duration-300 transform hover:-translate-y-1 
                     hover:shadow-lg hover:shadow-orange-500/25
                     disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/users")}
              disabled={isSubmitting}
              className="px-6 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700
                     transition-all duration-300 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
