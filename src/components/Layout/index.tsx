import React, { useEffect, useState } from 'react';
import NavBar from '../NavBar';
import NotificationPanel from '../NotificationPanel';
import { useTheme } from '../../components/Theme/ThemeContext';
import './Layout.css';
import { useNavigate } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();

    const { theme } = useTheme();
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    return (
        <div className={`layout ${theme}`}>
            <NavBar onNotificationClick={() => setShowNotifications((prev) => !prev)} />
            <div className="layout-content">{children}</div>
            <NotificationPanel
                open={showNotifications}
                onClose={() => setShowNotifications(false)}
            />
        </div>
    );
};

export default Layout;
