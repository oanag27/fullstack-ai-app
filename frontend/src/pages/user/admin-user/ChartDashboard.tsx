import axios from "axios";
import { API_URL } from "config";
import { useAuth } from "pages/auth/context/AuthContext";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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
const ChartDashboard: React.FC = () => {
  const [trips, setTrips] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const { token } = useAuth();
  useEffect(() => {
    const getAllUsers = async () => {
      if (!token) return;
      try {
        const response = await axios.get(`${API_URL}/user/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setClients(response.data);
        }
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };
    const getAllTrips = async () => {
      if (!token) return;
      try {
        const response = await axios.get(`${API_URL}/Trip/get-all-trips`, {
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
        setRequests(data);
      } catch (error) {
        console.error(error);
      }
    };

    getAllTrips();
    getAllUsers();
    fetchRequests();
  }, [token]);
  const budgetCounts = trips.reduce(
    (acc: Record<string, number>, trip: Trip) => {
      const key = trip.budget.toLowerCase();
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {}
  );
  const tripBudgetData = [
    { name: "Expensive", value: budgetCounts["expensive"] || 0 },
    { name: "Moderate", value: budgetCounts["moderate"] || 0 },
    { name: "Cheap", value: budgetCounts["cheap"] || 0 },
  ];
  const lastTrips = trips.sort((a, b) => b.id - a.id).slice(0, 5);

  const lastDestinations = lastTrips.map((trip, index) => ({
    name: trip.selectedDestination || "Unknown",
    value: 1,
    tripId: trip.id,
    tripName: trip.tripName,
  }));

  const transportationCounts = trips.reduce(
    (acc: Record<string, number>, trip) => {
      const mode = trip.transportation || "Other";
      acc[mode] = (acc[mode] || 0) + 1;
      return acc;
    },
    {}
  );
  const transportationData = Object.entries(transportationCounts).map(
    ([name, value]) => ({ name, value })
  );

  // Duration buckets
  const getDurationDays = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
    );
    return Math.max(diff, 0);
  };

  const durationBuckets = {
    "0–3 days": 0,
    "4–7 days": 0,
    "8–14 days": 0,
    "15+ days": 0,
  };

  trips.forEach((trip) => {
    const duration = getDurationDays(trip.startDate, trip.endDate);
    if (duration <= 3) durationBuckets["0–3 days"]++;
    else if (duration <= 7) durationBuckets["4–7 days"]++;
    else if (duration <= 14) durationBuckets["8–14 days"]++;
    else durationBuckets["15+ days"]++;
  });

  const durationData = Object.entries(durationBuckets).map(([name, value]) => ({
    name,
    value,
  }));
  const tripsPerUser = trips.reduce((acc: Record<number, number>, trip) => {
    acc[trip.userId] = (acc[trip.userId] || 0) + 1;
    return acc;
  }, {});
  const topUsers = Object.entries(tripsPerUser)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([userId, value]) => ({ name: `User ${userId}`, value }));
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];
  return (
    <div
      className="container-fluid text-white vh-100 py-4 px-5"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <div className="row mb-4">
        <div className="col-md-8 mb-3">
          <div className="bg-secondary p-3 rounded shadow h-100">
            <h6>Last 5 Chosen Destinations</h6>
            <div className="mt-3">
              {lastDestinations.map((dest, index) => (
                <div
                  key={dest.tripId}
                  className="mb-2 p-2 rounded"
                  style={{ backgroundColor: "#42e7ce" }}
                >
                  <strong>{dest.name}</strong>
                  <small className="text-muted d-block">
                    Trip: {dest.tripName}
                  </small>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="bg-secondary p-3 rounded shadow h-100">
            <h6>Trip Budget Distribution</h6>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tripBudgetData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {tripBudgetData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="bg-secondary p-3 rounded shadow h-100">
            <h6>Requests</h6>
            <div className="text-muted">{requests.length}</div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="bg-secondary p-3 rounded shadow h-100">
            <h6>Trips</h6>
            <div className="text-muted">{trips.length}</div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="bg-secondary p-3 rounded shadow h-100">
            <h6>Users</h6>
            <div className="text-muted">{clients.length}</div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="bg-secondary p-3 rounded shadow h-100">
            <h6>Transportation Distribution</h6>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={transportationData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {transportationData.map((entry, index) => (
                    <Cell
                      key={`cell-transport-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="bg-secondary p-3 rounded shadow h-100">
            <h6>Trip Duration</h6>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={durationData}>
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Bar dataKey="value" fill="#a3e742" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="bg-secondary p-3 rounded shadow h-100">
            <h6>Top Users by Number of Trips</h6>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topUsers} layout="vertical">
                <XAxis type="number" stroke="#fff" />
                <YAxis dataKey="name" type="category" stroke="#fff" />
                <Tooltip />
                <Bar dataKey="value" fill="#e75f42" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartDashboard;
