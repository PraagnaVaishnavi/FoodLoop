import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";
import "leaflet/dist/leaflet.css";

const ReliefCampCard = ({ camp }) => {
  const { eventType, location, startDate, resourcesNeeded, demandPrediction } =
    camp;

  // Format the start date for display
  const formattedStartDate = new Date(startDate).toLocaleString();

  return (
    <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-[420px]">
      {/* Card Header */}
      <div className="bg-gray-800 text-white p-4">
        <h3 className="text-lg font-semibold truncate">
          {eventType} Relief Camp
        </h3>
      </div>

      {/* Card Body */}
      <div className="flex-1 p-4 space-y-3 overflow-hidden">
        {/* Location */}
        <div className="flex items-center space-x-2 text-sm">
          <FaMapMarkerAlt className="text-green-500" />
          <span className="text-gray-700 truncate">
            {location.coordinates[0]}, {location.coordinates[1]}
          </span>
        </div>

        {/* Start Date */}
        <div className="text-gray-700 text-sm">
          <span className="font-semibold">Start Date: </span>
          {formattedStartDate}
        </div>

        {/* Resources Needed */}
        <div className="text-gray-700 text-sm line-clamp-2">
          <span className="font-semibold">Resources Needed: </span>
          {resourcesNeeded}
        </div>

        {/* Demand Prediction */}
        <div className="text-gray-700 text-sm">
          <span className="font-semibold">Demand Prediction: </span>
          <span>{demandPrediction}%</span>
        </div>

        {/* Map (fixed height) */}
        <div className="w-full h-32 mt-2 rounded-md overflow-hidden">
          <MapContainer
            center={location.coordinates}
            zoom={13}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={location.coordinates}>
              <Popup>{eventType} Relief Camp</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default ReliefCampCard;
