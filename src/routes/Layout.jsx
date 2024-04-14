import React from 'react';
import './Layout.css';
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import RightHeader from '../components/Header-Right';
const Layout = () => {
  return (
    <div className="app-layout">
      <RightHeader />
      <NavBar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
