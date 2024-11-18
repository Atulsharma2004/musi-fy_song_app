// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TrackProvider } from "./context/TrackContext";  // Import the TrackProvider
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TrackProvider>
      <App />
    </TrackProvider>
  </React.StrictMode>
);
