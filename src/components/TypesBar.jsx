import { Link } from "react-router-dom";
import { pokemonTypes } from "../../PokemonTypes";
import {Box,Button} from "@mui/material";

const TypesBar = ({fetchFilter, type}) => {
  const [{ name, color }] = pokemonTypes.filter((item) => item.name === type);

  const imgUrl = `/src/assets/pokemonTypes/${name}.svg`;

  return (
    <>
    <Button
      sx={{color:"black"}}
      onClick={() => {
        fetchFilter(`${name}`);
      }}
      style={{ backgroundColor: `${color}` }}
    >
      <img src={imgUrl} width={16} height={16} alt={name} color={color} />
      {name}
    </Button>

    </>
  );
};

export default TypesBar