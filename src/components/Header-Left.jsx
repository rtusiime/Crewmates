import React from 'react';
import './Header-Left.css';
import { Link } from 'react-router-dom';

const LeftHeader = () => (
    <header className='left-header'>
        <Link to="/">
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfxm471x8bJotovPM79W2BjKbvIy1-hv6bqIgxIkkgUg&s' className="icon-class" alt="Logo"/><h1> Crewmates</h1>
        </Link>
    </header>
);

export default LeftHeader;
