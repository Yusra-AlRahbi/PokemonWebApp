

import {Grid, Card, CardContent, Typography } from "@mui/material";
import { pokemonTypes } from "../../PokemonTypes";
import { Link } from "react-router-dom";
import { useSearch } from "../context/SearchContext";



const PokemonCards = ({ pokemon, loading }) => {
  const { searchType, query } = useSearch();
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        pokemon.filter((item) => {
            // منطق البحث
            if (searchType === "Search by Pokemon Number") {
              return item.id.toString().includes(query);
            } else if (searchType === "Search by Pokemon name") {
              return item.name.toLowerCase().includes(query.toLowerCase());
            } else {
              return true; // عرض جميع الـ Pokémon  إذا لم يتم تحديد نوع البحث
            }
          })
        .map((item) => {
          if (item.name) {
            const [{ color }] = pokemonTypes.filter(
              (type) => type?.name === item?.types[0]?.type?.name
            );
            return (
              <>
                <Grid key={item.id} item xs={10} sm={4}>
                <Link to={`/pokemon/${item.name}`} style={{textDecoration:"none"}}>
                <Card key={item.id} style={{ backgroundColor: `${color}` , cursor:"pointer"}}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {item.name}
                    </Typography>
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${item.id}.png`}
                      alt={item.name}
                      height={128}
                      width={128}
                    />
                    <h3>{item.name}</h3>
                    <p>#{item.id}</p>
                  </CardContent>
                </Card>
                </Link>
                </Grid>

      
              </>
            );
          }
        })
      )}
    </>
  );
};
export default PokemonCards;
