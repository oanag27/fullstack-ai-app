import axios from "axios";
import { API_URL } from "config";
import { useAuth } from "pages/auth/context/AuthContext";
import React, { useState, useEffect } from "react";
interface UpdateTripModalProps {
  open: boolean;
  onClose: () => void;
  tripName: string;
  setTripDetail: React.Dispatch<React.SetStateAction<Trip>>;
}
interface Trip {
  id: number;
  tripName: string;
  description: string;
  startDate: string;
  endDate: string;
  transportation: string;
  selectedDestination: string;
  budget: string;
  numberOfPeople: number;
  latitude: number;
  longitude: number;
  userId: number;
  itineraryId: number;
}
const UpdateTripDetailsModal: React.FC<UpdateTripModalProps> = ({
  open,
  onClose,
  tripName,
  setTripDetail,
}) => {
  const [tripDetails, setTripDetails] = useState<Trip>();
  const [newTripName, setNewTripName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [newTransportation, setNewTransportation] = useState("");
  const [newBudget, setNewBudget] = useState("");
  const [newNumberOfPeople, setNewNumberOfPeople] = useState(1);

  const { token } = useAuth();

  useEffect(() => {
    if (open) {
      const fetchTripDetails = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/Trip/${encodeURIComponent(tripName)}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTripDetails(response.data);
          setNewTripName(response.data.tripName || "");
          setNewDescription(response.data.description || "");
          setNewStartDate(
            response.data.startDate ? response.data.startDate.slice(0, 10) : ""
          );
          setNewEndDate(
            response.data.endDate ? response.data.endDate.slice(0, 10) : ""
          );
          setNewTransportation(response.data.transportation || "");
          setNewBudget(response.data.budget || "");
          setNewNumberOfPeople(response.data.numberOfPeople || 1);
        } catch (error) {
          console.error("Error fetching trip details:", error);
        }
      };

      fetchTripDetails();
    }
  }, [open, tripName]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedTrip: Trip = {
      id: tripDetails?.id || 0,
      tripName: newTripName,
      description: newDescription,
      startDate: newStartDate,
      endDate: newEndDate,
      transportation: newTransportation,
      budget: newBudget,
      numberOfPeople: newNumberOfPeople,
      selectedDestination: tripDetails?.selectedDestination || "",
      latitude: tripDetails?.latitude || 0,
      longitude: tripDetails?.longitude || 0,
      userId: tripDetails?.userId || 0,
      itineraryId: tripDetails?.itineraryId || 0,
    };
    try {
      await axios.put(`${API_URL}/Trip/${tripDetails?.id}`, updatedTrip, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTripDetail(updatedTrip);
      onClose();
    } catch (error) {
      console.error("Error updating trip:", error);
    }
  };

  if (!open) return null;

  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal-container bg-dark rounded p-4 shadow"
      >
        <div className="content">
          <h2>Update trip details</h2>
          <form onSubmit={handleUpdate} className="container-fluid">
            <div className="mb-3 px-4 mt-3">
              <label className="form-label text-white fw-bold">Trip Name</label>
              <input
                type="text"
                className="form-control"
                value={newTripName}
                onChange={(e) => setNewTripName(e.target.value)}
              />
            </div>
            <div className="mb-3 px-4">
              <label className="form-label text-white fw-bold">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </div>

            <div className="mb-3 px-4">
              <label className="form-label text-white fw-bold">
                Start Date
              </label>
              <input
                type="date"
                className="form-control"
                value={newStartDate}
                onChange={(e) => setNewStartDate(e.target.value)}
              />
            </div>

            <div className="mb-3 px-4">
              <label className="form-label text-white fw-bold">End Date</label>
              <input
                type="date"
                className="form-control"
                value={newEndDate}
                onChange={(e) => setNewEndDate(e.target.value)}
              />
            </div>

            <div className="mb-3 px-4">
              <label className="form-label text-white fw-bold">
                Transportation
              </label>
              <select
                className="form-select"
                value={newTransportation}
                onChange={(e) => setNewTransportation(e.target.value)}
                style={{ color: "grey" }}
              >
                <option value="plane">Plane</option>
                <option value="car">Car</option>
                <option value="train">Train</option>
              </select>
            </div>

            <div className="mb-3 px-4">
              <label className="form-label text-white fw-bold">Budget</label>
              <input
                type="text"
                className="form-control"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
              />
            </div>

            <div className="mb-3 px-4">
              <label className="form-label text-white fw-bold">
                Number of People
              </label>
              <input
                type="number"
                className="form-control"
                value={newNumberOfPeople}
                onChange={(e) => setNewNumberOfPeople(Number(e.target.value))}
                min={1}
              />
            </div>
            <div className=" me-4 ms-4 d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-outline-light mt-5 rounded-3"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTripDetailsModal;
