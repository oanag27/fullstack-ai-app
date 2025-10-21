import CalendarForTrips from "components/trips/CalendarForTrips";
import Navbar from "components/navigation/Navbar";
import TripsCardsList from "components/trips/TripsCardsList";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "pages/auth/context/AuthContext";
import { API_URL } from "config";
const Trips: React.FC = () => {
  const [trips, setTrips] = useState<any[]>([]);
  const { token } = useAuth();
  useEffect(() => {
    const getAllTrips = async () => {
      if (!token) return;

      try {
        const response = await axios.get(`${API_URL}/Trip`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setTrips(response.data);
        }
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    getAllTrips();
  }, [token]);

  return (
    <div className="v-100 bg-black">
      <Navbar role="User" />
      <CalendarForTrips trips={trips} />
      <TripsCardsList trips={trips} />
    </div>
  );
};

export default Trips;
