import { API_URL } from "config";
import { useAuth } from "pages/auth/context/AuthContext";
import React from "react";
import { toast } from "sonner";
interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  tripId: number;
}
const DeleteModal: React.FC<DeleteModalProps> = ({ open, onClose, tripId }) => {
  const { token, user } = useAuth();
  if (!open) return null;

  const handleRequestDelete = async () => {
    try {
      const response = await fetch(
        `${API_URL}/DeleteRequest/request-delete/${tripId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send delete request.");
      }
      toast.success("Trip deletion request has been sent!");
      onClose();
    } catch (error) {
      toast.error("Failed to request trip deletion.");
      console.error(error);
    }
  };

  return (
    <div onClick={onClose} className="overlay">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal-container bg-dark rounded p-4 shadow"
      >
        <div className="content">
          <h2>Delete Trip</h2>
          <p>Are you sure you want to delete the trip?</p>
          <div className="d-flex flex-row justify-content-center gap-5">
            <button
              className="btn btn-outline-light mt-5 rounded-3"
              onClick={handleRequestDelete}
            >
              Yes
            </button>
            <button
              className="btn btn-outline-light mt-5 rounded-3"
              onClick={onClose}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
