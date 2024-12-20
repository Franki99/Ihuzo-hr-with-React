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

  getProfilePictureUrl: (url) => {
    if (!url) return "https://via.placeholder.com/128";
    // Since we're now storing complete Supabase URLs, just return the URL directly
    return url;
  },

  // User management methods (admin)
  getUsers: (params) => {
    console.log("Service params:", params);
    return api.get("/api/users", { params });
  },

  createUser: (data) => api.post("/api/users", data),

  updateUser: (id, data) => api.put(`/api/users/${id}`, data),

  deleteUser: (id) => api.delete(`/api/users/${id}`),

  // Additional user-related methods
  getUserById: (id) =>
    api.get(`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),

  updateUserRole: (id, role) => api.put(`/api/users/${id}/role`, { role }),

  changePassword: (data) => api.post("/api/users/change-password", data),
};
