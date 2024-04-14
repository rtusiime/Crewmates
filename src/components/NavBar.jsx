import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import Header from './Header-Left';

const NavBar = React.memo(() => {
    return (
        <div className="nav-bar">
            <Header />
            <Link to="/" className="nav-button">🏠 Home</Link>
            <Link to="/about" className="nav-button">ℹ️ About</Link>
        </div>
    );
});

export default NavBar;
