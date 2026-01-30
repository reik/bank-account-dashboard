import React from 'react';
import NavBar from '../NavBar';
import { useTheme } from '../../components/Theme/ThemeContext';
import './Layout.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { theme } = useTheme();

    return (
        <div className={`layout ${theme}`}>
            <NavBar />
            <main className="main">{children}</main>
        </div>
    );
};

export default Layout;
