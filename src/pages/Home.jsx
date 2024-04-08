import PokemonCards from "../components/PokemonCards";
import TopBar from "../components/TopBar";
import axios from "axios";
import { useState, useEffect } from "react";
import { Grid, Container,Box,Button } from "@mui/material";
import { LogoDev } from "@mui/icons-material";

const Home = ({ searchType, searchTerm }) => {
  const [pokeData, setPokeData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
   const [pokeDex, setPokeDex] = useState();
   const [nextUrl, setNextUrl] = useState();
   const [prevUrl, setPrevUrl] = useState();
  // const [searchType, setSearchType] = useState('');
  // const [searchTerm, setSearchTerm] = useState('');

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


 
//  useEffect(() => {
//   if (searchTerm) {
//     const baseURL = 'https://pokeapi.co/api/v2/';
//     const searchURL = searchType.includes('Name')
//       ? `${baseURL}pokemon/${searchTerm.toLowerCase()}`
//       : `${baseURL}pokemon-species/${searchTerm}`;

//     axios.get(searchURL)
//       .then((response) => {
//         setPokeData(response.data);
//       })
//       .catch((error) => {
//         console.error('There was an error fetching the Pokémon data:', error);
//       });
//   }
// }, [searchType, searchTerm]);
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
