
import React from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={theme === 'dark'}
          onChange={toggleTheme}
          color="primary"
          inputProps={{ 'aria-label': 'Toggle dark/light mode' }}
        />
      }
      label={theme === 'dark' ? 'Dark' : 'Light'}
    />
  );
};

export default ThemeToggle;
