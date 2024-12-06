import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import DashboardLayout from "./components/layout/DashboardLayout";
import PrivateRoute from "./components/common/PrivateRoute";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import EditProfile from "./pages/EditProfile";
import EditUser from "./pages/EditUser"; // CORRECT
import NotFound from "./pages/NotFound";

// Wrapper component for the dashboard layout
const DashboardLayoutWrapper = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Routes with DashboardLayout */}
          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayoutWrapper />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/users/edit/:id" element={<EditUser />} />
            </Route>
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
