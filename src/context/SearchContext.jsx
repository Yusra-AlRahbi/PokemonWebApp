import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchType, setSearchType] = useState("");
  const [query, setQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchType, query, setSearchType, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);