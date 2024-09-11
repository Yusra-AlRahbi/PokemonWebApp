import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchType, setSearchType] = useState("");
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState(null);

  return (
    <SearchContext.Provider value={{ searchType, query, setSearchType, setQuery, selectedType, setSelectedType }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);