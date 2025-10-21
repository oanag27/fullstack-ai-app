import React from "react";
import Navbar from "components/navigation/Navbar";
import ChartDashboard from "./ChartDashboard";
const AdminDashboard: React.FC = () => {
  return (
    <div className="bg-black">
      <Navbar role="Admin" />
      <h1 style={{ color: "white" }}>AdminDashboard</h1>
      <ChartDashboard />
    </div>
  );
};

export default AdminDashboard;
