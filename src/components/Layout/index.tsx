import React, { useState } from 'react';
import NavBar from '../NavBar';
import NotificationPanel from '../NotificationPanel';
import { useTheme } from '../../components/Theme/ThemeContext';
import './Layout.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { theme } = useTheme();
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <div className={`layout ${theme}`}>
            <NavBar onNotificationClick={() => setShowNotifications((prev) => !prev)} />
            {children}
            <NotificationPanel
                open={showNotifications}
                onClose={() => setShowNotifications(false)}
            />
        </div>
    );
};

export default Layout;
