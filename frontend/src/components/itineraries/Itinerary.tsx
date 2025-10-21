import React from "react";
import { useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

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
}

interface ItineraryProps {
  tripDetails: Trip;
  itineraryGenerated: any;
}

const DaySection = ({
  dayName,
  dayData,
}: {
  dayName: string;
  dayData: any;
}) => (
  <Card className="bg-dark text-white mb-4 shadow border border-secondary">
    <Card.Header className="bg-secondary text-white fw-bold fs-5">
      {dayName}
    </Card.Header>
    <Card.Body>
      <div className="row">
        <div className="col-md-6 mb-3">
          <h5 className="text-uppercase text-muted mb-3">Activities</h5>
          {dayData.activities.map((a: any, index: number) => (
            <Card key={index} className="bg-secondary text-white mb-3 border-0">
              <Card.Body>
                <p>
                  <strong>Name:</strong> {a.name}
                </p>
                <p>
                  <strong>Time:</strong> {a.time}
                </p>
                <p>
                  <strong>Description:</strong> {a.description}
                </p>
                <p>
                  <strong>Transportation:</strong> {a.transportation}
                </p>
                <p>
                  <strong>Ticket Price:</strong> {a.ticketPrice}
                </p>
              </Card.Body>
            </Card>
          ))}
        </div>
        <div className="col-md-6">
          <h5 className="text-uppercase text-muted mb-3">Food</h5>
          {dayData.foods.map((f: any, index: number) => (
            <Card key={index} className="bg-secondary text-white mb-3 border-0">
              <Card.Body>
                <p>
                  <strong>Type:</strong> {f.type}
                </p>
                <p>
                  <strong>Description:</strong> {f.description}
                </p>
                <p>
                  <strong>Price:</strong> {f.price}
                </p>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </Card.Body>
  </Card>
);

const Itinerary: React.FC = () => {
  const { state } = useLocation();
  const { itineraryGenerated } = state as ItineraryProps;
  const currency = itineraryGenerated.currency;
  const dayKeys = Object.keys(itineraryGenerated).filter((key) =>
    key.startsWith("day")
  );

  return (
    <div className="container py-5 bg-black text-white min-vh-100">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Trip Itinerary</h1>
        <p className="text-secondary fs-5">
          Currency: <Badge bg="secondary">{currency}</Badge>
        </p>
      </div>
      {dayKeys.map((dayKey) => (
        <DaySection
          key={dayKey}
          dayName={dayKey}
          dayData={itineraryGenerated[dayKey]}
        />
      ))}
    </div>
  );
};

export default Itinerary;
