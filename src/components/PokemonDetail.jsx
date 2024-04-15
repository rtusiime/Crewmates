import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PokemonDetail.css';

const PokemonDetail = () => {
  const { name } = useParams();
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };

    if (id) {
      fetchPokemonData();
    }
  }, [id]);

  if (!pokemonData) {
    return <p>Loading pokemon details...</p>;
  }

  const getMainType = () => {
    return pokemonData.types[0].type.name;
  };

  return (
    <div className="pokemon-card">
      <section className="title-row">
        <p className="rarity">Basic Pokémon</p>
        <h1 className="name">{pokemonData.name}</h1>
        <p className="health">{pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat} HP</p>
      </section>

      <section className="character-img">
        <img
          src={pokemonData.sprites.other['official-artwork'].front_default}
          alt={pokemonData.name}
        />
      </section>

      <section className="character-stats">
        {pokemonData.stats.map((statInfo) => (
          <div className="stat" key={statInfo.stat.name}>
            <div className="stat-label">{statInfo.stat.name}</div>
            <div className="stat-bar">
              <div className="stat-fill" style={{ width: `${statInfo.base_stat}%` }}></div>
            </div>
          </div>
        ))}
      </section>

      <section className="character-description">
        <p>One of the original starters, {pokemonData.name} is loved by trainers all over the world for its bravery and loyalty.</p>
      </section>

      <section className="card-details">
        <p className="collector-card-number">ID: {pokemonData.id}</p>
      </section>
    </div>
  );
};

export default PokemonDetail;
