import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { API_URL } from "config";
import { CLIENT_URL } from "config";
const ForgotPassword: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/Auth/forgot-password`, {
        email: email,
        clientUrlLink: `${CLIENT_URL}/resetPassword`,
      });
      toast.success("Email for reset password has been sent!", {
        style: { color: "green" },
      });
      navigate("/login");
    } catch (error) {
      toast.error("Error occurred during sending the email", {
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
          Forgot Password
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
              Please enter your email address to reset your password
            </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className=" me-4 ms-4 d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary w-100 bg-black"
              style={{
                border: "none",
                marginTop: "10px",
              }}
            >
              Send Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
