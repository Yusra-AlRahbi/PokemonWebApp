import { Box, AppBar, Typography,Stack } from "@mui/material";
import SearchBar from "./SearchBar";
import TypesBar from "./TypesBar";
import { pokemonTypes } from "../../PokemonTypes";
import axios from "axios";
import { useState } from "react";
import { useSearch } from "../context/SearchContext";

const TopBar = () => {
  const [filtered, setFiltered] = useState(false);
  // const [pokeData, setPokeData] = useState([]);
  const { selectedType } = useSearch();

  const fetchFilter = async (value) => {
    if (value) {
      try {
        const result = await axios.get(
          `https://pokeapi.co/api/v2/type/${value}`
        );
        setFiltered(true);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <Box>
      <AppBar position="static">
        <Box
          sx={{
            m: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Typography variant="h2">PokèDex</Typography>
          <SearchBar />
          <Stack direction={"row"} spacing={1}  useFlexGap flexWrap="wrap">
          {pokemonTypes.map(({ name }) => {
              return (
                <TypesBar key={name} type={name} fetchFilter={fetchFilter} />
              );
          })}

          </Stack>
        </Box>
      </AppBar>
    </Box>
  );
};

export default TopBar;
