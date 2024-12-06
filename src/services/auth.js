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
  forgotPassword: (email) => api.post("/api/forgot-password", { email }),
  resetPassword: (token, password) =>
    api.post("/api/reset-password", { token, password }),
};
