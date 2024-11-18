// src/App.js
// import { useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import TrackList from "./components/TrackList";
import PlayerPage from "./components/PlayerPage"; // PlayerPage component
import { useTrack } from "./context/TrackContext"; // Import useTrack hook

const App = () => {
  const { setTracksData } = useTrack(); // Get the setTracksData function from context

  const handleSearch = async (query) => {
    if (!query) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/search?q=${query}&index=0`);
      const data = await response.json();
      // console.log("data:", data)

      if (data.tracks && data.tracks.data.length > 0) {
        setTracksData(data.tracks.data); // Set the tracks using the context function
      } else {
        setTracksData([]); // Clear tracks if none are found
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setTracksData([]); // Clear tracks in case of error
    }
  };

  return (
    <Router>
      <div className="p-6 bg-gray-900 text-white min-h-screen ">
        <h1 className="md:text-3xl text-xl font-bold mb-6">Musi-FY</h1>
        <SearchBar onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<TrackList/>} />
          <Route path="/player/:id" element={<PlayerPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
