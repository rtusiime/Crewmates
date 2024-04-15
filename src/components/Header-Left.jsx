import React from 'react';
import './Header-Left.css';
import { Link } from 'react-router-dom';
import pokemonLogo from '../assets/pokemon-icon.svg';

const LeftHeader = () => (
  <header className='left-header'>
    <Link to="/">
      <img src={pokemonLogo} className="icon-class" alt="Logo" /><h1> Crewmates</h1>
    </Link>
  </header>
);

export default LeftHeader;
