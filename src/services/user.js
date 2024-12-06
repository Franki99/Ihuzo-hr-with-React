import api from "./api";

export const userService = {
  // User profile methods
  getCurrentUser: () => api.get("/api/auth/me"),
  updateProfile: (data) => api.put("/api/users/profile", data),
  uploadProfilePicture: (formData) =>
    api.post("/api/users/profile-picture", formData, {
      headers: {
        Accept: "application/json",
      },
    }),
  getProfilePictureUrl: (path) => {
    if (!path) return "https://via.placeholder.com/128";
    // Just use the filename directly since that's what we're storing now
    return `${
      import.meta.env.VITE_API_URL
    }/api/users/profile-picture/${encodeURIComponent(path)}`;
  },

  // User management methods (admin)
  getUsers: (params) => {
    console.log("Service params:", params); // Add this log
    return api.get("/api/users", { params });
  },
  createUser: (data) => api.post("/api/users", data),
  updateUser: (id, data) => api.put(`/api/users/${id}`, data),
  deleteUser: (id) => api.delete(`/api/users/${id}`),

  // Additional user-related methods
  // userService.js
  getUserById: (id) =>
    api.get(`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),
  updateUserRole: (id, role) => api.put(`/api/users/${id}/role`, { role }),
  changePassword: (data) => api.post("/api/users/change-password", data),
};
