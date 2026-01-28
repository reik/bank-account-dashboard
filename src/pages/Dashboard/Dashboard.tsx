
import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import Logout from '../../components/Logout'
import ThemeToggle from '../../components/ThemeToggle'
import { useNavigate } from 'react-router-dom'


function Dashboard(): React.ReactElement {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Dashboard</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <Logout onLogout={handleLogout} />
        </div>
      </div>
      <p>Welcome to the Bank Account Dashboard</p>
    </div>
  );
}

export default Dashboard
