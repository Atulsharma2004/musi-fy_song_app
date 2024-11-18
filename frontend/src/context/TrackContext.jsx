// src/context/TrackContext.js
import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
// Create context for track management
const TrackContext = createContext();

// Create a custom hook to use the TrackContext
export const useTrack = () => {
  return useContext(TrackContext);
};

// Create a provider component
export const TrackProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const setTracksData = (tracksData) => {
    setTracks(tracksData);
    setCurrentTrackIndex(0); // Reset to first track when new tracks are loaded
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
  };

  return (
    <TrackContext.Provider value={{ tracks, currentTrackIndex, setTracksData, nextTrack, prevTrack }}>
      {children}
    </TrackContext.Provider>
  );
};

// PropTypes validation for children
TrackProvider.propTypes = {
    children: PropTypes.node.isRequired, // Validate the children prop as React nodes
};