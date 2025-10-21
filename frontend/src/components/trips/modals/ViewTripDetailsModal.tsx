import axios from "axios";
import { API_URL } from "config";
import { useAuth } from "pages/auth/context/AuthContext";
import React, { useState, useEffect } from "react";
interface ViewTripDetailsModalProps {
  open: boolean;
  onClose: () => void;
  tripName: string;
}
interface Trip {
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
}
const ViewTripDetailsModal: React.FC<ViewTripDetailsModalProps> = ({
  open,
  onClose,
  tripName,
}) => {
  const [tripDetails, setTripDetails] = useState<Trip>();
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
        } catch (error) {
          console.error("Error fetching trip details:", error);
        }
      };

      fetchTripDetails();
    }
  }, [open, tripName]);

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
          <h2>{tripDetails?.tripName}</h2>
          <div className="text-start">
            <p>Description: {tripDetails?.description}</p>
            <p>Start Date: {tripDetails?.startDate.slice(0, 10)}</p>
            <p>End Date: {tripDetails?.endDate.slice(0, 10)}</p>
            <p>Transportation: {tripDetails?.transportation}</p>
            <p>Destination: {tripDetails?.selectedDestination}</p>
            <p>Budget: {tripDetails?.budget}</p>
            <p>Number of People: {tripDetails?.numberOfPeople}</p>
            <p>
              Position: {tripDetails?.latitude}-{tripDetails?.longitude}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTripDetailsModal;
