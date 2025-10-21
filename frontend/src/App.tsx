import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import LandingPage from "./pages/LandingPage";
import { AuthProvider } from "./pages/auth/context/AuthContext";
import { useAuth } from "./pages/auth/context/AuthContext";
import Dashboard from "./pages/user/regular-user/Dashboard";
import ForgotPassword from "pages/auth/ForgotPassword";
import Trips from "pages/user/regular-user/Trips";
import AdminDashboard from "pages/user/admin-user/AdminDashboard";
import Itinerary from "components/itineraries/Itinerary";
import Map from "pages/user/regular-user/Map";
import { Toaster } from "sonner";
import Requests from "pages/user/admin-user/Requests";
import ResetPassword from "pages/auth/ResetPassword";
import Feedback from "pages/user/regular-user/Feedback";
interface Props {
  children: React.ReactNode;
  userRole?: string;
}

const PrivateRoute: React.FC<Props> = ({ children, userRole }) => {
  const { token, role } = useAuth();
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (userRole && role !== userRole) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <div className="App" style={{ backgroundColor: "black" }}>
      <AuthProvider>
        <Router>
          <Toaster position="bottom-right" richColors />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route
              path="/adminDashboard"
              element={
                <PrivateRoute userRole="Admin">
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/requests"
              element={
                <PrivateRoute userRole="Admin">
                  <Requests />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute userRole="User">
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/trips"
              element={
                <PrivateRoute userRole="User">
                  <Trips />
                </PrivateRoute>
              }
            />
            <Route
              path="/worldMap"
              element={
                <PrivateRoute userRole="User">
                  <Map />
                </PrivateRoute>
              }
            />
            <Route
              path="/feedback"
              element={
                <PrivateRoute userRole="User">
                  <Feedback />
                </PrivateRoute>
              }
            />
            <Route
              path="/itinerary/:tripName"
              element={
                <PrivateRoute userRole="User">
                  <Itinerary />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
