import {React, useState} from 'react';
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import RightHeader from '../components/Header-Right';
import SearchContext from '../context/SearchContext'; // Import the context
const Layout = () => {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      <RightHeader />
      <NavBar />
      <Outlet />
    </SearchContext.Provider>
  );
};

export default Layout;
