import React, { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void; // Callback function to handle search
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  // State to hold the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search query change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // Call the onSearch callback with the query
  };

  return (
    <input
      type="text"
      placeholder="Search by name or department..."
      value={searchQuery}
      onChange={handleSearchChange}
      className="form-control mb-3"
    />
  );
};

export default Search;
