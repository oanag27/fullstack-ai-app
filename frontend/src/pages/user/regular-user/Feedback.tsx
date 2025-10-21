import React, { useState } from "react";
import Navbar from "components/navigation/Navbar";
import { toast } from "sonner";
import axios from "axios";
import { API_URL } from "config";
const Feedback: React.FC = () => {
  const [category, setCategory] = useState("general");
  const [inputText, setInputText] = useState("");
  const categories = [
    { value: "general", label: "General Feedback" },
    { value: "planning", label: "Trip Planning" },
    { value: "itinerary", label: "Intinerary generation" },
    { value: "bug", label: "Bug Report" },
    { value: "feature", label: "Feature Request" },
  ];
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) {
      toast.error("Please enter your feedback before submitting.");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/send-email`, {
        subject: "Feedback received",
        body: `
                Category: ${category}\n 
                Feedback: ${inputText}\n
                `,
      });
      toast.success("Thank you for your feedback!", {
        style: { color: "green" },
      });
      setInputText("");
      setCategory("general");
    } catch (error) {
      toast.error(
        "There was an error submitting your feedback. Please try again later."
      );
    }
  };
  return (
    <div className="bg-black vh-100">
      <Navbar role="User" />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <div
          className="card shadow p-4"
          style={{
            maxWidth: "650px",
            width: "100%",
            borderRadius: "12px",
          }}
        >
          <h1 className="text-center mb-3" style={{ color: "black" }}>
            We would love to hear your feedback
          </h1>
          <h5 className="text-center mb-3" style={{ color: "grey" }}>
            Help us improve your trip planning experience
          </h5>
          <form onSubmit={handleSubmit} className="container-fluid">
            <div className="mb-4">
              <label
                className="form-label"
                style={{
                  textAlign: "left",
                  display: "block",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                What's the category of your feedback?
              </label>
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ color: "grey" }}
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                className="form-label"
                style={{
                  textAlign: "left",
                  display: "block",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Your Feedback
              </label>
              <textarea
                className="form-control"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={"Share your feedback with us..."}
                rows={10}
                style={{ minHeight: "150px" }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-50"
              style={{
                backgroundColor: "black",
                border: "none",
                marginTop: "10px",
              }}
            >
              Submit feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
