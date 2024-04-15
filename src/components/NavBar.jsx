import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import Header from './Header-Left';
import add from '../assets/add.svg';
import home from '../assets/home.svg';
import settings from '../assets/about.svg';
import { NavLink } from 'react-router-dom';



const NavBar = React.memo(() => {
    return (
        <div className="nav-bar">
            <Header />
            <NavLink exact to="/" activeClassName="active" className="nav-button">
                <img src={home} alt="home page" /> Home
            </NavLink>
            <NavLink to="/about" activeClassName="active" className="nav-button">
                <img src={settings} alt="settings page" /> Settings
            </NavLink>
            <NavLink to="/create" activeClassName="active" className="nav-button">
                <img src={add} alt="create new character page" /> Create
            </NavLink>
        </div>
    );
});


export default NavBar;
