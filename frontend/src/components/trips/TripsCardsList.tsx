import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  PDFDownloadLink,
} from "@react-pdf/renderer";

import TripCard from "./TripCard";
interface Trip {
  tripName: string;
  description: string;
  startDate: string;
  endDate: string;
  transportation: string;
  selectedDestination: string;
  budget: string;
  numberOfPeople: number;
}

interface Props {
  trips: Trip[];
}
const transformDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
const TripsDocument = ({ trips }: { trips: Trip[] }) => (
  <Document>
    <Page>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>My Trips</Text>
        {trips.map((trip, index) => (
          <View key={index} style={{ marginBottom: 15 }}>
            <Text
              style={{
                fontSize: 16,
                marginBottom: 5,
                fontStyle: "italic",
              }}
            >
              {trip.tripName}
            </Text>
            <Text>Destination: {trip.selectedDestination}</Text>
            <Text>Description: {trip.description}</Text>
            <Text>Start Date: {transformDate(trip.startDate)}</Text>
            <Text>End Date: {transformDate(trip.endDate)}</Text>
            <Text>Budget: {trip.budget}</Text>
            <Text>Number of People: {trip.numberOfPeople}</Text>
            <Text>Transport: {trip.transportation}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);
const TripsCardsList: React.FC<Props> = ({ trips }) => {
  return (
    <div className="container mx-auto p-4 bg-black">
      <PDFDownloadLink
        document={<TripsDocument trips={trips} />}
        fileName="trips.pdf"
        className="btn btn-outline-light mt-3 mb-5 px-5 py-3 rounded-3"
      >
        Download Trips Information
      </PDFDownloadLink>
      <div className="d-flex flex-column gap-5">
        {trips.map((trip: any, index: number) => (
          <TripCard key={index} trip={trip} />
        ))}
      </div>
    </div>
  );
};
export default TripsCardsList;
