import React, { useEffect } from 'react';
import './Dashboard.css';
import { useTheme } from '../../components/Theme/ThemeContext';
import AccountSummary from '../../components/AccountSummary';

import Layout from '../../components/Layout';

function Dashboard(): React.ReactElement {
    const { theme } = useTheme();

    return (
        <Layout>
            <div className={`dashboard ${theme}`}>
                <AccountSummary />
            </div>
        </Layout>
    );
}

export default Dashboard;
