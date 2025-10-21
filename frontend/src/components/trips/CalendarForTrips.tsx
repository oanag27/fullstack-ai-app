import React, { useEffect, useState } from "react";
interface Trip {
  tripName: string;
  description: string;
  startDate: string;
  endDate: string;
  transportation: string;
  selectedDestination: string;
}

interface Props {
  trips: Trip[];
}

const CalendarForTrips: React.FC<Props> = ({ trips = [] }) => {
  const [calendarDays, setCalendarDays] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDayData, setSelectedDayData] = useState<string | null>("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);

  const weekdayArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const getDateWithoutTime = (date: string) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0); //midnight
    return d;
  };

  const handlePreviousMonth = () => {
    const previousMonth = new Date(currentDate);
    previousMonth.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(previousMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(nextMonth);
  };

  const formattedDate = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  function getDaysInAMonth(year: any, month: any) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getStartDayOfWeek(year: any, month: any) {
    const firstDayOfMonth = new Date(year, month, 1);
    const startDayOfWeek = firstDayOfMonth.getDay();
    return weekdayArray[startDayOfWeek];
  }

  function generateCalendar(newDaysOfWeek: string[]) {
    const daysInAMonth = getDaysInAMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    const selectedDayStart = getStartDayOfWeek(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    const dayStartingIndex = newDaysOfWeek.indexOf(selectedDayStart);
    let days: string[] = [];
    for (let i = 0; i < dayStartingIndex; i++) {
      days.push("space");
    }
    for (let day = 1; day <= daysInAMonth; day++) {
      const date = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
      days.push(date);
    }
    setCalendarDays(days);
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setSelectedDate(date);
    if (date !== "") {
      const newDate = new Date(date);
      setCurrentDate(newDate);
    }
  };

  useEffect(() => {
    generateCalendar(weekdayArray);
  }, [currentDate]);

  return (
    <div style={{ padding: "0 50px" }}>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "3px 3px 20px rgba(5, 5, 5, 0.15)",
          padding: "30px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            gap: "10px",
            borderBottom: "1px solid black",
            paddingBottom: "10px",
          }}
        >
          <div style={{ fontSize: "25px", color: "black", textAlign: "left" }}>
            Calendar
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr auto",
            gap: "30px",
            height: "501px",
          }}
        >
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                marginBottom: "10px",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "20px",
                  border: "1px solid black",
                  width: "250px",
                  height: "30px",
                  color: "black",
                  position: "relative",
                }}
              >
                <button
                  onClick={handlePreviousMonth}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    position: "absolute",
                    left: "10px",
                  }}
                >
                  {"<"}
                </button>
                {formattedDate}
                <button
                  onClick={handleNextMonth}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    position: "absolute",
                    right: "10px",
                  }}
                >
                  {">"}
                </button>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <div style={{ marginRight: "10px" }}>Jump To Date</div>
                  <input
                    type="date"
                    value={selectedDate || ""}
                    onChange={handleDateChange}
                    style={{
                      border: "1px solid black",
                      borderRadius: "8px",
                      height: "40px",
                      width: "170px",
                      padding: "0 10px",
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                textAlign: "center",
                border: "1px solid black",
                borderRadius: "8px",
                height: "40px",
                paddingTop: "5px",
                color: "black",
              }}
            >
              {daysOfWeek.map((day, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight:
                      day === "Sunday" || day === "Saturday"
                        ? "bold"
                        : "normal",
                  }}
                >
                  {day.toUpperCase()}
                </span>
              ))}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              {calendarDays.map((day, index) => {
                const isSelected = day === selectedDate;
                const eventsForDay = trips.filter(
                  (trip) =>
                    getDateWithoutTime(trip.startDate) <=
                      getDateWithoutTime(day) &&
                    getDateWithoutTime(trip.endDate) >= getDateWithoutTime(day)
                );
                return day === "space" ? (
                  <div key={index}></div>
                ) : (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      height: "60px",
                      padding: "3px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      border: "1px solid black",
                      position: "relative",
                      backgroundColor: isSelected
                        ? "rgba(113, 112, 111, 0.15)"
                        : "transparent",
                    }}
                    onClick={() => setSelectedDayData(day)}
                  >
                    {new Date(day).getDate()}
                    {eventsForDay.map((trip, tripIndex) => {
                      const eventColor = "grey";
                      const verticalOffset = tripIndex * 25;
                      return (
                        <div
                          key={trip.tripName}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "15px",
                            backgroundColor: eventColor,
                            border: "1px solid black",
                            borderRadius: "5px",
                            width: "100%",
                            position: "absolute",
                            top: verticalOffset,
                            left: 0,
                            padding: "2px",
                            height: "20px",
                          }}
                        >
                          {trip.tripName}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarForTrips;
