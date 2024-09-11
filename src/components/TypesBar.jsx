import { pokemonTypes } from "../../PokemonTypes";
import { Button } from "@mui/material";
import { useSearch } from '../context/SearchContext';

const TypesBar = ({fetchFilter, type}) => {
  const [{ name, color }] = pokemonTypes.filter((item) => item.name === type);
  const imgUrl = `/src/assets/pokemonTypes/${name}.svg`;
  const { setSelectedType } = useSearch(); 
  return (
    <>
      <Button
      sx={{color:"black"}}   
     onClick={() => {
         setSelectedType(name);
          fetchFilter(name);
        }}
        style={{ backgroundColor: `${color}` }}
      >
        <img src={imgUrl} width={16} height={16} alt={name} color={color} />
        {name}
      </Button>
    </>
  );
};

export default TypesBar;