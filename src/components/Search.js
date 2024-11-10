// src/components/SearchBar.js
import React from "react";

const SearchBar = ({ onSearch }) => {
  const handleSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type to search..."
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
