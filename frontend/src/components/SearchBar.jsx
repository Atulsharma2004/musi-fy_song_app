import { useState } from "react";
import PropTypes from "prop-types";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") return; // Avoid empty submissions
    onSearch(query);
    setQuery(""); // Clear input field after search
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for tracks..."
        className="w-full md:px-4 md:py-2 px-2 py-1 rounded-l-md text-gray-900"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 md:px-4 md:py-2 px-2 py-1 rounded-r-md text-white"
      >
        Search
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
