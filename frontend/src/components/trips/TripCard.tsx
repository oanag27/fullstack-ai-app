import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ViewTripDetailsModal from "./modals/ViewTripDetailsModal";
import UpdateTripDetailsModal from "./modals/UpdateModal";
import DeleteModal from "./modals/DeleteModal";
import { useAuth } from "pages/auth/context/AuthContext";
import { toast } from "sonner";
import { API_URL } from "config";
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
interface Props {
  trip: Trip;
}

const TripCard: React.FC<Props> = ({ trip }) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [updateTripModal, setUpdateTripModal] = useState(false);
  const [deleteTripModal, setDeleteTripModal] = useState(false);
  const [tripDetails, setTripDetails] = useState(trip);
  const [itineraryGenerated, setItineraryGenerated] = useState(null);
  const transformDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const displayTransportation = (transport: string) => {
    if (transport === "car") {
      return <i className="bi bi-car-front-fill"></i>;
    } else if (transport === "plane") {
      return <i className="bi bi-airplane-fill"></i>;
    } else if (transport === "train") {
      return <i className="bi bi-train-freight-front-fill"></i>;
    }
  };

  const handleCreateItinerary = async () => {
    try {
      const prompt = {
        destination: trip.selectedDestination,
        startDate: trip.startDate,
        endDate: trip.endDate,
        budget: trip.budget,
        numberOfPeople: trip.numberOfPeople,
        Itinerary: {
          dayFormat: "day{n}",
          activityFields: [
            "name",
            "description",
            "time(morning, afternoon, evening)",
            "transportation",
            'ticketPrice(verify to be the exact price on the official websites)(must be a JSON string, e.g., "12.00" or "free")',
          ],
          foodFields: [
            "type(breakfast, lunch, dinner)",
            "description",
            "price",
          ],
          currencyField: "currency",
        },
      };
      const promptString = `
      Generate a travel itinerary in raw JSON only. No markdown, no comments, no extra text.
      You have this trip details to use and MUST NOT BE INCLUDED in the response:
      destination: ${prompt.destination},
      dates: ${prompt.startDate} to ${prompt.endDate},
      budget: ${prompt.budget},
      number of people: ${prompt.numberOfPeople}.

      Include currency used for the itinerary(USD, EUR, etc.)
      - '${prompt.Itinerary.currencyField}'.
      Include the day, formatted as '${
        prompt.Itinerary.dayFormat
      }', for each day, not a list of days.

      For each day of the itinerary, suggestions must include:
      - A list of activities with fields: ${prompt.Itinerary.activityFields.join(
        "\n  - "
      )}.
      - A list of food recommendations with fields: ${prompt.Itinerary.foodFields.join(
        "\n  - "
      )}.
      For the last day mention in the description that the itinerary may depend on the departure time(but still add suggestion based on time of the day).
      Do not include accommodation. Do not leave any day empty!
      `;

      const response = await fetch(`${API_URL}/Ollama/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promptString),
      });
      const { response: rawItinerary } = await response.json();
      const generatedItinerary = JSON.parse(rawItinerary);

      setItineraryGenerated(generatedItinerary);

      const saveItineraryResponse = await fetch(
        `${API_URL}/Itinerary?tripName=${encodeURIComponent(trip.tripName)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(generatedItinerary),
        }
      );

      if (!saveItineraryResponse.ok) {
        throw new Error("Failed to save itinerary.");
      }
      const { itineraryId } = await saveItineraryResponse.json();
      setTripDetails((prev) => ({
        ...prev,
        itineraryId: itineraryId,
      }));
    } catch (error) {
      console.error("Cannot generate itinerary!", error);
    }
  };
  const handleItineraryGenerated = async () => {
    const response = await fetch(
      `${API_URL}/Itinerary?itineraryId=${tripDetails.itineraryId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch itinerary.");
    }
    const responseItinerary = await response.json();
    setItineraryGenerated(responseItinerary);
    navigate(`/itinerary/${encodeURIComponent(trip.tripName)}`, {
      state: {
        itineraryGenerated: responseItinerary,
      },
    });
  };
  return (
    <div className="trip-card bg-dark text-light p-4 rounded-4 shadow-lg w-100 h-100 d-flex flex-column align-items-center">
      <h2 className="d-flex align-items-center text-white">
        {tripDetails.tripName}{" "}
        {displayTransportation(tripDetails.transportation)}
      </h2>
      <div className="d-flex flex-column text-center">
        <p className="mb-1 text-secondary fs-5">
          {tripDetails.selectedDestination}
        </p>
        <p className="fw-bold text-white">
          {transformDate(tripDetails.startDate)} -{" "}
          {transformDate(tripDetails.endDate)}
        </p>
      </div>

      <div className="d-flex gap-3 mt-3">
        <button
          className="btn btn-outline-light mt-3 px-5 py-3 rounded-3"
          onClick={() => setViewDetailsModal(true)}
        >
          View Details
        </button>
        <button
          className="btn btn-outline-light mt-3 px-5 py-3 rounded-3"
          onClick={() => setUpdateTripModal(true)}
        >
          Update
        </button>
        <button
          className="btn btn-outline-light mt-3 px-5 py-3 rounded-3"
          onClick={() => setDeleteTripModal(true)}
        >
          Request Delete
        </button>

        {tripDetails.itineraryId > 0 ? (
          <button
            className="btn btn-outline-light mt-3 px-5 py-3 rounded-3"
            onClick={handleItineraryGenerated}
          >
            View Itinerary
          </button>
        ) : (
          <button
            className="btn btn-outline-light mt-3 px-5 py-3 rounded-3"
            onClick={handleCreateItinerary}
          >
            Create Itinerary
          </button>
        )}
      </div>

      <ViewTripDetailsModal
        open={viewDetailsModal}
        onClose={() => setViewDetailsModal(false)}
        tripName={tripDetails.tripName}
      />
      <UpdateTripDetailsModal
        open={updateTripModal}
        onClose={() => setUpdateTripModal(false)}
        tripName={tripDetails.tripName}
        setTripDetail={setTripDetails}
      />
      <DeleteModal
        open={deleteTripModal}
        onClose={() => setDeleteTripModal(false)}
        tripId={tripDetails.id}
      />
    </div>
  );
};

export default TripCard;
