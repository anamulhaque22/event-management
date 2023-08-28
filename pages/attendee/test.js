import React from "react";

const Event = () => {
  const event = {
    name: "Event 1",
    location: "Location 1",
    time: "10:00 AM",
    ticketPrice: "$20",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Event Details</h1>
      <div className="w-full max-w-md bg-white p-4 border rounded-lg shadow-md">
        <p className="font-semibold mb-1">{event.name}</p>
        <p className="text-sm mb-1">{event.location}</p>
        <p className="text-sm mb-1">{event.time}</p>
        <p className="text-sm">{event.ticketPrice}</p>
      </div>
    </div>
  );
};

export default Event;
