import PokemonCards from "../components/PokemonCards";
import TopBar from "../components/TopBar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Grid, Container,Box,Button } from "@mui/material";


const Home = ()=> {
  const [pokeData, setPokeData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
   const [pokeDex, setPokeDex] = useState();
   const [nextUrl, setNextUrl] = useState();
   const [prevUrl, setPrevUrl] = useState();

  const pokeFun = async () => {
    if (pokeData.length > 0) {
        setPokeData([]);
     }
     setLoading(true);
       const res = await axios.get(url);
      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);
     getPokemon(res.data.results);
     setLoading(false);
  };

   const getPokemon = async (res) => {
      res.map(async (item) => {
       const result = await axios.get(item.url);
      setPokeData((state) => {
   state = [...state, result.data];
        return state;
     });
    });
   };

   useEffect(() => {
      pokeFun();
 }, [url]);

  return (
    <>
      <TopBar  />
      <Box sx={{display:"flex",justifyContent:"center" }}>
            {prevUrl && (
              <Button
                onClick={() => {
                  setPokeData([]);
                  setUrl(prevUrl);
                }}
              >
                Previous
              </Button>
            )}
            {nextUrl && (
              <Button
                onClick={() => {
                  setPokeData([]);
                  setUrl(nextUrl);
                }}
              >
                Next
              </Button>
            )}
          </Box>
      <Container maxWidth="sm"sx={{padding:"10px"}}>
        <Grid container spacing={2}>
          <PokemonCards 
          key={pokeData.id}
          pokemon={pokeData}
          loading={loading}
          PokemonDetails={(poke) => setPokeDex(poke)}
          />
        </Grid>
      </Container>
    </>
  );
};

export default Home;
