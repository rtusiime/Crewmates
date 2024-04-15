import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import pokeball from '../assets/pokeball.png';

const PokemonList = (props) => {
  console.log('PokemonCard props__:', props);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    setPokemons(props.list);
  }, [props.list]); // Dependency on props.list to update state when props.list changes

  const deletePokemon = (pokemonName) => {
    setPokemons(currentPokemons => currentPokemons.filter(pokemon => pokemon.name !== pokemonName));
  };

  return (
    <div className={pokemons.length < 1 ? 'empty-state' : 'pokemon-list-container'}>
      {pokemons.length < 1 ?
        (
          <div>
            <h2>Wow! Such Empty!</h2>
            <p>Create your pokemon crew to get started</p>
            <img src={pokeball} alt="pokemon ball representing empty state" />
          </div>
        )
        : (pokemons.map((pokemon, index) => (
          <PokemonCard
            key={index}
            name={pokemon.name}
            url={pokemon.url}
            setPost={props.setPost}
            post={props.post}
            deletePokemon={() => deletePokemon(pokemon.name)}
            parent={props.parent}
          />
        )))}
    </div>
  );
};

export default PokemonList;
