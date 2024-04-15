import {React, useState} from 'react';
import PokemonCard from './PokemonCard';
import pokeball from '../assets/pokeball.png';

const PokemonList = (props) => {
  const [isEmpty, setIsEmpty] = useState(props.list.length == 0);
  
  return (
    <div className={isEmpty? 'empty-state' : 'pokemon-list-container'}>
      {isEmpty ?
        (
          <div>
            <h2>Wow! Such Empty!</h2>
            <p>Create your pokemon crew to get started</p>
            <img src={pokeball} alt="pokemon ball representing empty state" />
          </div>
        )
        : (props.list.map((pokemon, index) => (
          <PokemonCard key={index} name={pokemon.name} url={pokemon.url} />
        )))}
    </div>
  );
};

export default PokemonList;