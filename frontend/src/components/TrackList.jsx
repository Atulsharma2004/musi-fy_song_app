// import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useTrack } from "../context/TrackContext"; // Import your context hook

const TrackList = () => {
  const { tracks } = useTrack(); // Access tracks from context
  const navigate = useNavigate();

  const handleTrackClick = (track) => {
    // Navigate to the player page with the selected track's details
    navigate(`/player/${track.id}`, { state: { track, tracks } });
  };


  if (!Array.isArray(tracks)) {
    return <div>No tracks available</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {tracks.map((track) => (
        <div
          key={track.id}
          onClick={() => handleTrackClick(track)}
          className="bg-gray-800 p-4 rounded-md cursor-pointer hover:bg-gray-700"
        >
          <img
            src={track.album.cover_small} // Ensure this matches the prop type definition (or change prop type to cover_small)
            alt={track.title}
            className="w-full h-40 object-cover rounded-md mb-2"
          />
          <p className="text-lg font-bold">{track.title}</p>
          <p className="text-sm text-gray-400">By {track.artist.name}</p>
        </div>
      ))}
    </div>
  );
};

// TrackList.propTypes = {
//   tracks: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       title: PropTypes.string.isRequired,
//       album: PropTypes.shape({
//         cover_small: PropTypes.string.isRequired, // Ensure this matches the JSX
//       }).isRequired,
//       artist: PropTypes.shape({
//         name: PropTypes.string.isRequired,
//       }).isRequired,
//     })
//   ).isRequired,
// };

export default TrackList;
