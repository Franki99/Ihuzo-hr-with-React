import api from "./api";

export const authService = {
  login: async (credentials) => {
    const response = await api.post("/api/auth/login", {
      email: credentials.email,
      password: credentials.password,
    });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response;
  },
  register: (userData) => api.post("/api/auth/register", userData),
  logout: () => {
    localStorage.removeItem("token");
  },
  getCurrentUser: () => api.get("/api/auth/me"),
  resetPassword: (password, { email }) => {
    console.log("Resetting password for:", email);
    return api.post("/api/auth/reset-password", {
      email,
      password,
    });
  },

  forgotPassword: (email) => {
    console.log("Sending forgot password request for:", email);
    return api.post("/api/auth/forgot-password", { email });
  },
};
