import React from 'react';
import ThemeToggle from '../Theme/ThemeToggle';
import Logout from '../Logout';
import './NavBar.css';
import icon from '../../assets/images/icon.svg';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface NavBarProps {
    onNotificationClick?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onNotificationClick }) => {
    const navigate = useNavigate();

    return (
        <Grid container className="navbar" alignItems="center">
            <Grid size={6}>
                <div className="navbar-name" onClick={() => navigate('/dashboard')}>
                    <img src={icon} alt="Piggy Bank Icon" width="48px" />
                    Piggy Bank
                </div>
            </Grid>
            <Grid
                size={6}
                gap={2}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <IconButton
                    color="inherit"
                    onClick={onNotificationClick}
                    aria-label="notifications"
                >
                    <NotificationsIcon />
                </IconButton>
                <ThemeToggle />
                <Logout />
            </Grid>
        </Grid>
    );
};

export default NavBar;
