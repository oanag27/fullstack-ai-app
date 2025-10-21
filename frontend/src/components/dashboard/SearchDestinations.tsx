import React from "react";
import Searchbar from "./Searchbar";
interface Props {
  destination: (city: {
    name: string;
    latitude: number;
    longitude: number;
  }) => void;
}
const SearchDestinations: React.FC<Props> = ({ destination }) => {
  return (
    <div>
      <div className="p-3 pt-0 pb-5 bg-black rounded">
        <img
          src="images/dashboard-page/planedashboard.jpg"
          alt="dashboard"
          className="img-fluid w-100"
          style={{ height: "88vh", objectFit: "cover", borderRadius: "20px" }}
        />
      </div>
      <div className="position-absolute bottom-50 start-50 translate-middle">
        <h1 className="text-white text-center" style={{ fontSize: "4rem" }}>
          Discover your next wonderful destination
        </h1>
      </div>
      <div className="position-absolute top-50 start-50 translate-middle w-50">
        <Searchbar destination={destination} />
      </div>
    </div>
  );
};

export default SearchDestinations;
