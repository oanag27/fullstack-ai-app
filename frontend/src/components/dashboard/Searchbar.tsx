import { API_URL } from "config";
import React, { useState } from "react";
interface Props {
  destination: (city: {
    name: string;
    latitude: number;
    longitude: number;
  }) => void;
}
const Searchbar: React.FC<Props> = ({ destination }) => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [seeDropdownList, setSeeDropdownList] = useState(false);

  const handleResultClick = (city: any) => {
    setInput(`${city.name}`);
    setSeeDropdownList(false);
    destination({
      name: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
    });
  };

  const fetchDestinations = async (value: string) => {
    try {
      const response = await fetch(
        `${API_URL}/cities/cities?cityName=${encodeURIComponent(value)}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setResults(data);
      setSeeDropdownList(data.length > 0);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]);
      setSeeDropdownList(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    fetchDestinations(value);
  };
  return (
    <div
      className="input-wrapper w-100"
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 0 8px #ddd",
        alignItems: "center",
        display: "flex",
        padding: "0 10px",
        height: "40px",
        position: "relative",
      }}
    >
      <button
        className="search-button"
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "5px",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ stroke: "grey" }}
        >
          <path
            fill="none"
            stroke="grey"
            strokeWidth="2"
            d="M21 21l-6-6M10 16A6 6 0 1 0 10 4a6 6 0 0 0 0 12z"
          />
        </svg>
      </button>
      <input
        placeholder="Type to search destinations..."
        style={{
          backgroundColor: "transparent",
          border: "none",
          height: "100%",
          width: "100%",
          marginLeft: "10px",
          outline: "none",
          fontSize: "1rem",
        }}
        value={input}
        onChange={handleSearch}
        onFocus={(e) => (e.target.style.border = "none")}
      />
      {seeDropdownList && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 8px #ddd",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {results.map((city, index) => (
              <li
                key={index}
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                  cursor: "pointer",
                }}
                onClick={() => handleResultClick(city)}
              >
                <strong>{city.name}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
