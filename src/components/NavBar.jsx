import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import Header from './Header-Left';
import add from '../assets/add.svg';
import home from '../assets/home.svg';
import settings from '../assets/about.svg';


const NavBar = React.memo(() => {
    return (
        <div className="nav-bar">
            <Header />
            <Link to="/" className="nav-button"> <img src={home} alt="home page" /> Home</Link>
            <Link to="/Create" className="nav-button"><img src={settings} alt="add new character page" /> Settings</Link>
            <Link to="/about" className="nav-button"><img src={add} alt="add new character page" /> Create</Link>
        </div>
    );
});

export default NavBar;
