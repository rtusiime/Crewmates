import React from 'react';
import './Header-Right.css';
import searchIcon from '../assets/search.svg';

const RightHeader = ({ handleSearchChange }) => (
    <header className="right-header">
        <div className='search-bar'>
            <div className='search-bottom-border'>
            <img src={searchIcon} alt="search icon" />
            <input
                type="text"
                placeholder="Search for pokemon..."
                onChange={handleSearchChange}
            />
            </div>

        </div>
        <img src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png" alt="Profile image" className='profile-image' />
    </header>
);

export default RightHeader;
