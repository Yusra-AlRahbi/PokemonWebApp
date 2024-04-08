import { Box, AppBar, Typography,Stack } from "@mui/material";
import SearchBar from "./SearchBar";
import TypesBar from "./TypesBar";
import { pokemonTypes } from "../../PokemonTypes";
import axios from "axios";
import { useState } from "react";

const TopBar = () => {
  const [filtered, setFiltered] = useState(false);
  const [pokeData, setPokeData] = useState([]);
  const fetchFilter = async (value) => {
    if (value) {
      try {
        const result = await axios.get(
          `https://pokeapi.co/api/v2/type/${value}`
        );
        const filteredPokemon = result.data.pokemon;
        filteredPokemon.map(async (item) => {
          // slice out alternate forms and megas
          if (
            item.pokemon.url
              .slice("-6")
              .replace(/\D/g, "")
              .replaceAll("/", "") < 10000
          ) {
            setPokeData([]);
            const result = await axios.get(item.pokemon.url);
            setPokeData((state) => {
              state = [...state, result.data];
              return state;
            });
          }
        });
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
                  <TypesBar fetchFilter={fetchFilter} type={name}/>
              );


          })}

          </Stack>
        </Box>
      </AppBar>
    </Box>
  );
};

export default TopBar;
