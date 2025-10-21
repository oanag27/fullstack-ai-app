import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "pages/auth/context/AuthContext";
import { API_URL } from "config";
interface Props {
  destination: string;
  latitude: number;
  longitude: number;
}

const CreateNewTrip: React.FC<Props> = ({
  destination,
  latitude,
  longitude,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [transport, setTransport] = useState("plane");
  const [budget, setBudget] = useState("cheap");
  const [numOfPeople, setNumOfPeople] = useState(1);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { token } = useAuth();

  const handleCreateNewTrip = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !startDate || !endDate) {
      setError("All fields are required.");
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      setError("End date cannot be before start date.");
      return;
    }
    setError("");
    const newTrip = {
      tripName: name,
      description,
      startDate,
      endDate,
      transportation: transport,
      selectedDestination: destination,
      budget: budget,
      numberOfPeople: numOfPeople,
      latitude: latitude,
      longitude: longitude,
    };

    try {
      if (!token) {
        setError("User is not authenticated.");
        return;
      }
      const response = await axios.post(`${API_URL}/Trip`, newTrip, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        navigate("/trips");
      }
    } catch (error) {
      console.error("Error creating trip:", error);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div
        className="card shadow p-4"
        style={{ width: "550px", borderRadius: "12px", padding: "100px" }}
      >
        <h2 className="text-center mb-4">Create a New Trip</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <form onSubmit={handleCreateNewTrip} className="container-fluid">
          <div className="mb-3">
            <label
              className="form-label"
              style={{
                textAlign: "left",
                display: "block",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Trip Name
            </label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Trip name"
              style={{ color: "grey" }}
            />
          </div>
          <div className="mb-3">
            <label
              className="form-label"
              style={{
                textAlign: "left",
                display: "block",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Description
            </label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Trip description"
              style={{ color: "grey" }}
            />
          </div>
          <div className="mb-3">
            <label
              className="form-label"
              style={{
                textAlign: "left",
                display: "block",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Start Date
            </label>
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ color: "grey" }}
            />
          </div>
          <div className="mb-3">
            <label
              className="form-label"
              style={{
                textAlign: "left",
                display: "block",
                color: "black",
                fontWeight: "bold",
              }}
            >
              End Date
            </label>
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ color: "grey" }}
            />
          </div>
          <div className="mb-3">
            <label
              className="form-label"
              style={{
                textAlign: "left",
                display: "block",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Transportation
            </label>
            <select
              className="form-select"
              value={transport}
              onChange={(e) => setTransport(e.target.value)}
              style={{ color: "grey" }}
            >
              <option value="plane">Plane</option>
              <option value="car">Car</option>
              <option value="train">Train</option>
            </select>
          </div>
          <div className="mb-3">
            <label
              className="form-label"
              style={{
                textAlign: "left",
                display: "block",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Selected City
            </label>
            <input
              type="text"
              className="form-control"
              readOnly
              value={destination}
              style={{ color: "grey" }}
            />
          </div>
          <div className="mb-3">
            <label
              className="form-label"
              style={{
                textAlign: "left",
                display: "block",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Budget
            </label>
            <select
              className="form-select"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              style={{ color: "grey" }}
            >
              <option value="cheap">cheap</option>
              <option value="moderate">moderate</option>
              <option value="expensive">expensive</option>
            </select>
          </div>
          <div className="mb-3">
            <label
              className="form-label"
              style={{
                textAlign: "left",
                display: "block",
                color: "black",
                fontWeight: "bold",
              }}
            >
              Number of People
            </label>
            <input
              type="number"
              className="form-control"
              value={numOfPeople}
              onChange={(e) =>
                setNumOfPeople(Math.max(1, parseInt(e.target.value)))
              }
              min="1"
              max="100"
              style={{ color: "grey" }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100 bg-black"
            style={{
              border: "none",
              marginTop: "10px",
            }}
          >
            Add Trip
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNewTrip;
