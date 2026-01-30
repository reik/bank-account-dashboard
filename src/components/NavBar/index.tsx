import React from 'react';
import ThemeToggle from '../Theme/ThemeToggle';
import Logout from '../Logout';
import './NavBar.css';
import icon from '../../assets/images/icon.svg';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Grid container className="navbar">
            <Grid size={9}>
                <div className="navbar-name" onClick={() => navigate('/dashboard')}>
                    <img src={icon} alt="Piggy Bank Icon" width="48px" />
                    Piggy Bank
                </div>
            </Grid>
            <Grid size={3} className="navbar-cta">
                <ThemeToggle />
                <Logout />
            </Grid>
        </Grid>
    );
};

export default NavBar;
