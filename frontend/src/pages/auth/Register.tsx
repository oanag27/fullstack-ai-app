import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { API_URL } from "config";
const Register: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        userName,
        email,
        password,
      });

      if (response.data.token) {
        login(response.data.token, response.data.email, response.data.role);
        toast.success("Registration successful!", {
          style: { color: "green" },
        });
        navigate("/login");
      } else {
        toast.error("Registration failed!", {
          style: { color: "red" },
        });
      }
    } catch (error) {
      toast.error("Error occurred during register.", {
        style: { color: "red" },
      });
    }
  };

  return (
    <div>
      <div className="vh-100 d-flex justify-content-center align-items-center bg-black">
        <div
          className="card shadow p-4"
          style={{ width: "550px", borderRadius: "12px", padding: "100px" }}
        >
          <h2 className="text-center mb-3" style={{ color: "black" }}>
            Register
          </h2>
          <form onSubmit={handleRegister}>
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
                Username
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
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
                Email
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
                Password
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
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
            <div className=" me-4 ms-4 d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary w-100"
                style={{
                  backgroundColor: "black",
                  border: "none",
                  marginTop: "10px",
                }}
              >
                Register
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <a
              href="/login"
              className="text-decoration-none fw-bold"
              style={{ color: "black" }}
            >
              Already have an account?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
