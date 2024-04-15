import { React, useContext } from 'react';
import './Header-Right.css';
import searchIcon from '../assets/search.svg';
import profileIcon from '../assets/profile.svg';
import SearchContext from '../context/SearchContext';

const RightHeader = () => {
    const { searchTerm, setSearchTerm } = useContext(SearchContext);
    return (
        <header className="right-header">
            <div className='search-bar'>
                <div className='search-bottom-border'>
                    <img src={searchIcon} alt="search icon" />
                    <input
                        type="text"
                        placeholder="Search for pokemon..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <img src={profileIcon} alt="Profile image" className='profile-image' />
        </header>
    )
};

    export default RightHeader;
