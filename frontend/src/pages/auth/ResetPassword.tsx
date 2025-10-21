import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { API_URL } from "config";
const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const email = query.get("email");
  const token = decodeURIComponent(query.get("token") || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      await axios.post(`${API_URL}/auth/resetPassword`, {
        email,
        token,
        password,
        passwordConfirmation: confirmPassword,
      });

      toast.success("Password reset successful. Please login.", {
        style: { color: "green" },
      });
      navigate("/login");
    } catch (err) {
      toast.error("Error resetting password.", {
        style: { color: "red" },
      });
    }
  };
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-black">
      <div
        className="card shadow p-4"
        style={{
          maxWidth: "550px",
          width: "100%",
          borderRadius: "12px",
        }}
      >
        <h2 className="text-center mb-3" style={{ color: "black" }}>
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="container-fluid">
          <div className="mb-3 px-4">
            <label
              className="form-label"
              style={{
                textAlign: "left",
                display: "block",
                color: "black",
                fontWeight: "bold",
              }}
            >
              New Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="input-group-text bg-white">
                <i
                  className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{ cursor: "pointer" }}
                ></i>
              </span>
            </div>
          </div>
          <div className="mb-3 px-4">
            <label
              className="form-label"
              style={{
                textAlign: "left",
                display: "block",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Confirm New Password
            </label>
            <div className="input-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span className="input-group-text bg-white">
                <i
                  className={`bi ${
                    showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                  }`}
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  style={{ cursor: "pointer" }}
                ></i>
              </span>
            </div>
          </div>
          <div className="me-4 ms-4 d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary w-100 bg-black border-0 mt-2"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
