import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PokemonCard.css';
import { Link } from 'react-router-dom';
import more from '../assets/more.png';

const PokemonCard = ({ name, url, role }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Function to handle mouse enter
  const handleMouseEnter = () => setIsHovering(true);

  // Function to handle mouse leave
  const handleMouseLeave = () => setIsHovering(false);

  // Function to handle click on the more button
  const handleMoreClick = (event) => {
    event.preventDefault();
    setShowMenu(!showMenu); // Toggle the visibility of the menu
  };

  const getCardStyle = () => {
    if (!isHovering) return {};
    switch (role) {
      case 'guardian':
        return { backgroundColor: 'rgba(93, 185, 255, 0.29)' }; // 5db9ff with 29% opacity
      case 'supporter':
        return { backgroundColor: 'rgba(255, 255, 0, 0.29)' }; // yellow with 29% opacity
      case 'attacker':
        return { backgroundColor: 'rgba(255, 0, 0, 0.29)' }; // red with 29% opacity
      default:
        return { backgroundColor: 'rgba(25, 25, 25, 0.1)' };
    }
  };

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


  return (
    <div className="PokemonCard"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={getCardStyle()}>
      <Link to={`/pokemon/${pokemonDetails.id}`} className='card-link'>
        <img
          className="sprite"
          src={pokemonDetails.sprites.front_default}
          alt={name}
        />
      </Link>
      <div className="pokemon-info">
        <h2 className="title">{name}</h2>
        <h3 className="sprite-number">#{pokemonDetails.id}</h3>
      </div>
      <div className="pokemon-types">
        {pokemonDetails.types.map((typeInfo, index) => (
          <span key={index} className="pokemon-type" style={{ background: typeColorMapping[typeInfo.type.name.toLowerCase()] }}>
            {typeInfo.type.name}
          </span>
        ))}
      </div>
      <img className="moreButton" alt="edit button" src={more} onClick={handleMoreClick} />
      {/* Conditional rendering of the context menu */}
      {showMenu && (
        <div className="context-menu">
          <ul>
            <Link to={`/pokemon/edit/${pokemonDetails.id}`} className='card-link'>
              <li onClick={() => console.log('Edit')}>Edit</li>
            </Link>
            <li className='delete-context-menu-item' onClick={() => console.log('Delete')}>Delete</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PokemonCard;