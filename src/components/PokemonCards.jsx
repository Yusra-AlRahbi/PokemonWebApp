

import {Grid, Card, CardContent, Typography } from "@mui/material";
import { pokemonTypes } from "../../PokemonTypes";
import { Link } from "react-router-dom";



const PokemonCards = ({ pokemon, loading }) => {
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        pokemon.map((item) => {
          if (item.name) {
            const [{ color }] = pokemonTypes.filter(
              (type) => type?.name === item?.types[0]?.type?.name
            );
            return (
              <>
                <Grid item xs={10} sm={4}>
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
