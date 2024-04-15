import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import pokeball from '../assets/pokeball.png';
import supabase from '../client';

const PokemonList = (props) => {
  console.log('PokemonCard props__:', props);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    setPokemons(props.list);
  }, [props.list]); // Dependency on props.list to update state when props.list changes

  const deletePokemon = async (pokemonName) => {
    // setPokemons(currentPokemons => currentPokemons.filter(pokemon => pokemon.name !== pokemonName));
    const { data, error } = await supabase
        .from('Pokemons')
        .delete()
        .eq('name', pokemonName);
    if (error) {
        console.log(error);
    }
    else {
        console.log('Post deleted successfully ', data);
    }
    console.log(data)
    window.location = '/';
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
            role = {pokemon.role}
          />
        )))}
    </div>
  );
};

export default PokemonList;
