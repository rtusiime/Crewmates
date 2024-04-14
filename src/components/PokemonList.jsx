import React from 'react';
import PokemonCard from './PokemonCard';

const PokemonList = ( props ) => {
  console.log("pokemons:", props.list);
  return (
    <div className="pokemon-list-container">
      {props.list.map((pokemon, index) => (
        <PokemonCard key={index} name={pokemon.name} url={pokemon.url} />
      ))}
    </div>
  );
};

export default PokemonList;