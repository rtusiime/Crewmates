import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonCard.css';
import { Link } from 'react-router-dom';

const PokemonCard = ({ name, url }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(url);
        setPokemonDetails(response.data);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };

    fetchPokemonDetails();
  }, [url]);

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Link to={`/pokemon/${pokemonDetails.id}`} className='card-link'>
    <div className="PokemonCard">
      <img
        className="sprite"
        src={pokemonDetails.sprites.front_default}
        alt={name}
      />
      <div className="pokemon-info">
        <h2 className="title">{name}</h2>
        <h3 className="sprite-number">#{pokemonDetails.id}</h3>
      </div>
      <div className="pokemon-types">
        {pokemonDetails.types.map((typeInfo, index) => (
          <span key={index} className="pokemon-type">
            {typeInfo.type.name}
          </span>
        ))}
      </div>
      </div>
    </Link>
  );
};

export default PokemonCard;