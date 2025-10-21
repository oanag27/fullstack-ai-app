import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Navbar from "components/navigation/Navbar";
import { API_URL } from "config";
import { useAuth } from "pages/auth/context/AuthContext";
type Trip = {
  id: number;
  tripName: string;
  selectedDestination: string;
  latitude: number;
  longitude: number;
};

const Map: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const { token } = useAuth();
  useEffect(() => {
    fetch(`${API_URL}/Trip`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch trips, status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setTrips(data);
      })
      .catch((err) => console.error("Error fetching trips:", err));
  }, []);

  const Icon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [20, 20],
  });
  return (
    <div style={{ width: "100%", height: "900px", backgroundColor: "black" }}>
      <Navbar role="User" />
      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%", backgroundColor: "black" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {trips.map((trip) => (
          <Marker
            key={trip.id}
            position={[trip.latitude, trip.longitude]}
            icon={Icon}
          >
            <Popup>
              {trip.tripName} - {trip.selectedDestination}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
