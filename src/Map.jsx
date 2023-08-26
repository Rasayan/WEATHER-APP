import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import './Map.css'; // Import your custom CSS

const API_KEY = '1837eecd2816ddf7cd33d2d9f9315d7f'; // Replace with your API key

const Map = () => {
  useEffect(() => {
    const map = L.map('map').setView([21.505, -0.01], 19); // Set initial coordinates and zoom level

    // Add OpenStreetMap tile layer
    L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`).addTo(map);

    // Add OpenWeatherMap layer (replace 'clouds' with the desired layer)
    L.tileLayer(
      `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${API_KEY}`
    ).addTo(map);
  }, []);

  return <div id="map" className="MapContainer"></div>;
};
//This map component will be pushed on a later date

export default Map;
