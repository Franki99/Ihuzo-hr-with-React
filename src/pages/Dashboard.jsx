import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Line, Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useAuth } from "../context/AuthContext";
import { userService } from "../services/user";

export default function Dashboard() {
  const { user, updateProfilePicture } = useAuth();
  const navigate = useNavigate();
  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setIsUploading(true);
        setUploadStatus("");

        await updateProfilePicture(file);
        setUploadStatus("success");
      } catch (error) {
        console.error("Upload error:", error);
        setUploadStatus("error");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const performanceData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Goals Achieved",
        data: [12, 19, 15, 7, 22, 13],
        fill: true,
        borderColor: "#F97316",
        backgroundColor: "rgba(249, 115, 22, 0.1)",
        tension: 0.4,
      },
    ],
  };

  const attendanceData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Daily Attendance",
        data: [95, 92, 98, 94, 96],
        backgroundColor: "#F97316",
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          borderDash: [5, 5],
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.7)",
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.firstName || "User"}!
        </h1>
        <p className="text-gray-400">
          Here&apos;s your performance overview and personal information.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Goals Achievement Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-[#121212] rounded-xl p-6 border border-gray-800"
        >
          <h2 className="text-xl font-bold mb-6">Goals Achievement</h2>
          <div className="h-[300px]">
            <Line data={performanceData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#121212] rounded-xl p-6 border border-gray-800"
        >
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <img
                src={userService.getProfilePictureUrl(user?.profilePicture)}
                alt="Profile"
                className="rounded-full w-full h-full object-cover"
              />
              <label className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full cursor-pointer hover:bg-orange-600 transition-colors">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isUploading}
                />
                {isUploading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                )}
              </label>
            </div>
            {uploadStatus === "success" && (
              <p className="text-green-500 text-sm mb-4">Upload successful!</p>
            )}
            {uploadStatus === "error" && (
              <p className="text-red-500 text-sm mb-4">
                Upload failed. Please try again.
              </p>
            )}
            {uploadStatus === "File too large" && (
              <p className="text-red-500 text-sm mb-4">
                File is too large. Please choose a smaller image.
              </p>
            )}
            <h3 className="text-xl font-bold mb-2">
              {user?.firstName} {user?.lastName}
            </h3>
            <p className="text-gray-400 mb-4">{user?.email}</p>
            <button
              onClick={() => navigate("/profile/edit")}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 
                       transition-all duration-300 transform hover:-translate-y-1"
            >
              Edit Profile
            </button>
          </div>
        </motion.div>

        {/* Attendance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-[#121212] rounded-xl p-6 border border-gray-800"
        >
          <h2 className="text-xl font-bold mb-6">Weekly Attendance</h2>
          <div className="h-[300px]">
            <Bar data={attendanceData} options={chartOptions} />
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#121212] rounded-xl p-6 border border-gray-800"
        >
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: "Profile updated", time: "2 hours ago" },
              { action: "Completed task", time: "Yesterday" },
              { action: "Submitted report", time: "3 days ago" },
            ].map((activity, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-3 border-b border-gray-800"
              >
                <span>{activity.action}</span>
                <span className="text-sm text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
