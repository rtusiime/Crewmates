import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import './PokemonDetail.css';

const PokemonDetail = () => {
  const { name } = useParams();
  const { state } = useLocation();
  console.log('State:', state);
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonBio, setPokemonBio] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemonData(response.data);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
      }
    };

    const fetchPokemonBio = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
        setPokemonBio(response.data);
        console.log('Pokemon Bio:', response.data);
      } catch (error) {
        console.error('Error fetching Pokemon bio:', error);
      }
    };


    if (name) {
      fetchPokemonData().then(() => fetchPokemonBio());
    }
  }, [name]);

  if (!pokemonData) {
    return <p>Loading pokemon details...</p>;
  }


  const typeColorMapping = {
    'fairy': '#EE99AC',
    'dragon': '#7038F8',
    'bug': '#A8B820',
    'psychic': '#F85888',
    'flying': '#A890F0',
    'ground': '#E0C068',
    'poison': '#A040A0',
    'fight': '#C03028',
    'ice': '#98D8D8',
    'grass': '#78C850',
    'electric': '#F8D030',
    'water': '#6890F0',
    'fire': '#F08030',
    'normal': '#A8A878',
    'steel': '#B8B8D0',
    'ghost': '#705898',
    'dark': '#705848',
    'rock': '#B8A038',
  };

  const roleColors = {
    attacker: '#ff1f1f',   // Red
    defender: '#fbd743',   // Yellow
    strategist: '#5db9ff'  // Blue
  };

  return (

    <div className='pokemon-detail-container'>
            {parent !== 'CreatePost' && <img className="moreButton" alt="edit button" src={more} onClick={handleMoreClick} />}
      {/* Conditional rendering of the context menu */}
      {showMenu && (
        <div className="context-menu">
          <ul>
            <Link to={`/edit/${pokemonDetails.name}`} state={{role, url} } className='card-link'>
              <li onClick={() => console.log('Edit')}>Edit</li>
            </Link>
            <li className='delete-context-menu-item' onClick={() => {
              console.log('Delete');
              deletePokemon();
            }}>Delete</li>
          </ul>
        </div>
      )}
      <span className='pokemon-role' style={{ backgroundColor: roleColors[state] }}>
        {state}
      </span>
      <div className='detail-image'>
        <img
          src={pokemonData.sprites.other['official-artwork'].front_default}
          alt={pokemonData.name}
        />
      </div>
      <div className='detail-dashboard'>
        <div className='detail-dashboard-left'>
          <span className='pokemon-title'>
            <h1>{pokemonData.name}</h1>
            <div className='pokemon-id'>#{pokemonData.id}</div>
          </span>
          <div className="pokemon-types">
            {pokemonData.types.map((typeInfo, index) => (
              <span key={index} className="pokemon-type" style={{ background: typeColorMapping[typeInfo.type.name.toLowerCase()] }}>
                {typeInfo.type.name}
              </span>
            ))}
          </div>
          <div className='pokemon-key-attributes'>
            <div className='pokemon-height'>
              {pokemonData.height}
            </div>
            <div className='pokemon-weight'>
              {pokemonData.weight}
            </div>
          </div>
        </div>
        <div className='detail-dashboard-right'>
          <div className='pokemon-bio'>
            <p>
              {pokemonBio.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text}
            </p>
          </div>
          <section className="pokemon-stats">   {pokemonData.stats.map((statInfo) => (
            <div className="stat" key={statInfo.stat.name}>
              <div className="stat-label">{statInfo.stat.name}</div>
              <div className="stat-bar">
                <div className="stat-fill" style={{ width: `${statInfo.base_stat}%` }}></div>
              </div>
            </div>
          ))}
          </section>
        </div>
      </div>
    </div >
  );
};

export default PokemonDetail;
