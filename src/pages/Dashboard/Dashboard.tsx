import React, { useEffect } from 'react';
import './Dashboard.css';
import { useTheme } from '../../components/Theme/ThemeContext';
import AccountSummary from '../../components/AccountSummary';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';

function Dashboard(): React.ReactElement {
    const navigate = useNavigate();
    const { theme } = useTheme();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    // For demo, get username from localStorage or fallback
    const username = localStorage.getItem('username') || 'guest';

    return (
        <Layout>
            <div className={`dashboard ${theme}`}>
                <AccountSummary username={username} />
            </div>
        </Layout>
    );
}

export default Dashboard;
