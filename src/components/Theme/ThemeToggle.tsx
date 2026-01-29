import React from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTheme } from './ThemeContext';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <FormControlLabel
            control={<Switch checked={theme === 'dark'} onChange={toggleTheme} color="primary" />}
            label={theme === 'dark' ? 'Dark' : 'Light'}
        />
    );
};

export default ThemeToggle;
