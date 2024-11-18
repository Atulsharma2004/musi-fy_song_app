import PropTypes from "prop-types";

const MusicPlayer = ({ track }) => {
  if (!track) return null;

  return (
    <div className="mt-8 bg-gray-800 p-4 rounded-md w-full max-w-lg">
      <h2 className="text-2xl font-bold mb-2">
        Now Playing: {track.title} by {track.artist.name}
      </h2>
      {track.preview ? (
        <audio controls src={track.preview} className="w-full">
          Your browser does not support the audio element.
        </audio>
      ) : (
        <p className="text-red-500">Preview not available</p>
      )}
    </div>
  );
};

// PropTypes definition
MusicPlayer.propTypes = {
  track: PropTypes.shape({
    title: PropTypes.string.isRequired,
    preview: PropTypes.string,
    artist: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export default MusicPlayer;
