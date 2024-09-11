import React, { useState, useEffect, useMemo } from "react";
import { pokemonTypes } from "../../PokemonTypes";
import { pokemonDetailColors } from "../../PokemonDetailColors";
import { NavLink, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from "axios";
import About from "../components/Tabs/About";
import Stats from "../components/Tabs/Stats";
import Evolution from "../components/Tabs/Evolution";
import Pokeball from "../assets/pokeball.svg";
import { Box, Tooltip } from "@mui/material";

// const useStyles = makeStyles{

// }
const PokemonDetail = () => {
  const [pokemon, setPokemonData] = useState({});
  const [pokemonSpecies, setPokemonSpecies] = useState({});
  const [nameSectionActive, setNameSectionActive] = useState("about");
  const [currentColor, setCurrentColor] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const callFetch = async () => {
      const pokemonData = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      setPokemonData(pokemonData);
    };

    const callFetchSpecies = async () => {
      const pokemonSpeciesData = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      setPokemonSpecies(pokemonSpeciesData);
    };

    callFetch().catch(console.error);
    callFetchSpecies().catch(console.error);
  }, [id]);

  useEffect(() => {
    if (pokemon.data?.types[0]?.type?.name) {
      const [{ color }] = pokemonDetailColors.filter(
        (item) => item.name === pokemon.data?.types[0]?.type?.name
      );
      setCurrentColor(color);
    }
  }, [pokemon.data?.types]);

  const screenSelected = useMemo(() => {
    switch (nameSectionActive) {
      case "about":
        return (
          <About
            pokemon={pokemon}
            pokemonSpecies={pokemonSpecies}
            currentColor={currentColor}
          />
        );
      case "stats":
        return (
          <Stats stats={pokemon.data?.stats} currentColor={currentColor} />
        );
      case "evolution":
        return <Evolution pokemon={pokemon} name={pokemon.data?.name} />;
      default:
        return <></>;
    }
  }, [nameSectionActive, currentColor, pokemon, pokemonSpecies]);

  return (
    <>
      <Box style={{ background: `${currentColor}`, overflow: "auto" }}>
        <NavLink to="/">
          <Tooltip title="Back">
            <ArrowBackIosIcon
              sx={{
                position: "fixed",
                top: "2vw",
                left: "1vw",
                zIndex: "11",
                display: "flex",
                alignItems: "center",
                color: "black",
                MozBoxAlign: "center",
              }}
              fontSize="large"
            />
          </Tooltip>
        </NavLink>
        <Box
          sx={{
            mt: "4vw",
            textAlign: "center",
            position: "relative",
            alignItems: "center",
            alignSelf: "center",
            flexDirection: "row",
            height: "100%",
          }}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.data?.id}.png`}
            alt=""
            height="200"
          />

          <Box
            sx={{
              fontWeight: "bold",
              fontSize: "30px",
              letterSpacing: "2px",
              lineHeight: "32px",
            }}>
            #{pokemon.data?.id}
          </Box>
          <Box 
          sx={{
            fontWeight: "bold",
            fontSize: "60px",
            lineHeight: "65px",
            textTransform:"capitalize"
          }}
          >{pokemon.data?.name}</Box>
          <div>
            {pokemon.data?.types.map((poke) => {
              const [{ name, color }] = pokemonTypes.filter(
                (item) => item.name === poke.type.name
              );

              const imgUrl = `/src/assets/pokemonTypes/${name}.svg`;
              return (
                <>
                  <Box style={{ backgroundColor: `${color}` }}>
                    <img
                      src={imgUrl}
                      width={16}
                      height={16}
                      alt={name}
                      color={color}
                    />
                    <span>{poke.type.name}</span>
                  </Box>
                </>
              );
            })}
          </div>
          <div className="abilities">
            {pokemon.data?.abilities.map((item) => {
              return <h2 key={item} className="group">{item.ability?.name}</h2>;
            })}
          </div>
          <Box sx={{
            display:"flex",
            WebkitBoxAlign:"center",
            alignItems:"center",
            justifyContent:"space-around",
            margin: "5vw 0px 10px"
          }}>
            {["about", "stats", "evolution"].map((nameSection) => (
              <Box
                key={nameSection}
                type="button"
                onClick={() => setNameSectionActive(nameSection)}
                active={nameSection === nameSectionActive}
                sx={{
                  position:"relative",
                  border: "none",
                  outline:"none",
                  width:"120px",
                  background:"none",
                  fontSize:"25px",
                  lineHeight:"38px",
                  color:"#fff",
                  opacity:"1",
                  textTransform: "capitalize",
                  cursor:"pointer"
                }}
                >
                {nameSection === "evolution" &&
                pokemonSpecies.data?.evolution_chain === undefined ? (
                  <></>
                ) : (
                  nameSection
                )}
                {nameSection === nameSectionActive && (
                  <img  
                  style={{
                    position:"relative",
                    top:"-9px",
                    left:"-50px",
                    right:"0px",
                    marginLeft: "auto",
                    marginRight:"auto",
                    zIndex:"0",
                    width:"50px",
                    hieght:"auto"
                  }}
                  src={Pokeball} alt="" />
                )}
              </Box>
            ))}
          </Box>
          <Box sx={{height:"100%"}}>{screenSelected}</Box>
        </Box>
      </Box>
    </>
  );
};
export default PokemonDetail;
