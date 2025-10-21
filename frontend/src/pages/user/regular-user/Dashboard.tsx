import React, { useState, useRef, useEffect } from "react";
import Navbar from "components/navigation/Navbar";
import SearchDestinations from "components/dashboard/SearchDestinations";
import PopularDestinations from "components/dashboard/PopularDestinations";
import CreateNewTrip from "components/dashboard/CreateNewTrip";
const Dashboard: React.FC = () => {
  const createTripRef = useRef<HTMLDivElement>(null);
  const [selectedDestination, setSelectedDestination] = useState<{
    name: string;
    latitude: number;
    longitude: number;
  }>({
    name: "",
    latitude: 0,
    longitude: 0,
  });
  const scrollToCreateTrip = () => {
    createTripRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleSelectedDestination = (city: {
    name: string;
    latitude: number;
    longitude: number;
  }) => {
    setSelectedDestination(city);
  };
  useEffect(() => {
    if (selectedDestination.name) {
      scrollToCreateTrip();
    }
  }, [selectedDestination]);

  return (
    <div className="bg-black">
      <Navbar role="User" />
      <SearchDestinations destination={handleSelectedDestination} />
      <PopularDestinations destination={selectedDestination.name} />
      <div ref={createTripRef}>
        <CreateNewTrip
          destination={selectedDestination.name}
          latitude={selectedDestination.latitude}
          longitude={selectedDestination.longitude}
        />
      </div>
    </div>
  );
};

export default Dashboard;
