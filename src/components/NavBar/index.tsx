import React from 'react';
import ThemeToggle from '../Theme/ThemeToggle';
import Logout from '../Logout';
import './NavBar.css';

const NavBar: React.FC = () => {
    return (
        <nav className="navbar">
            <ThemeToggle />
            <Logout />
        </nav>
    );
};

export default NavBar;
