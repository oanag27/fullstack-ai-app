import Navbar from "components/navigation/Navbar";
import React, { useState, useEffect } from "react";
import { useAuth } from "pages/auth/context/AuthContext";
import { toast } from "sonner";
import { API_URL } from "config";

interface DeleteRequest {
  id: number;
  tripId: number;
  isDeleted: boolean | null;
  requestedAt: string;
  userName: string;
}

const Requests: React.FC = () => {
  const { token } = useAuth();
  const [requests, setRequests] = useState<DeleteRequest[]>([]);
  const fetchRequests = async () => {
    try {
      const response = await fetch(
        `${API_URL}/DeleteRequest/get-all-delete-requests`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch requests.");
      const data = await response.json();
      for (let request of data) {
        if (request.isDeleted === null) {
          const userName = await fetchUserName(request.tripId);
          request.userName = userName || "Unknown User";
        }
      }
      setRequests(data);
    } catch (error) {
      toast.error("Could not load delete requests.");
      console.error(error);
    }
  };
  const fetchUserName = async (tripId: number) => {
    try {
      const response = await fetch(
        `${API_URL}/Trip/get-user-email-by-trip-id/${tripId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch trip name.");
      const userName = await response.text();
      return userName;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (requestId: number) => {
    try {
      const response = await fetch(
        `${API_URL}/DeleteRequest/approve-delete/${requestId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error();
      toast.success("Trip deletion approved.");
      fetchRequests();
    } catch {
      toast.error("Approval failed.");
    }
  };

  const handleDeny = async (requestId: number) => {
    try {
      const response = await fetch(
        `${API_URL}/DeleteRequest/deny-delete/${requestId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error();
      toast.success("Request denied.");
      fetchRequests();
    } catch {
      toast.error("Denial failed.");
    }
  };

  return (
    <div className="vh-100 bg-black text-white">
      <Navbar role="Admin" />
      <div className="container py-4">
        <h1 className="mb-4">Pending Deletion Requests</h1>
        {requests.length === 0 ? (
          <p>No pending requests.</p>
        ) : (
          requests
            .filter((r) => r.isDeleted === null)
            .map((request) => (
              <div
                key={request.id}
                className="bg-dark rounded-3 shadow-lg p-4 mb-3 d-flex justify-content-between align-items-center"
              >
                <div>
                  <p>
                    <strong>Trip:</strong> {request.userName}
                  </p>
                  <p>
                    <strong>Requested At:</strong>{" "}
                    {new Date(request.requestedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-light mt-3 px-5 py-3 rounded-3"
                    onClick={() => handleApprove(request.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-outline-light mt-3 px-5 py-3 rounded-3"
                    onClick={() => handleDeny(request.id)}
                  >
                    Disapprove
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Requests;
