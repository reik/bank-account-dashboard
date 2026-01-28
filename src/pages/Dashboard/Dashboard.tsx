
import React, { useEffect } from 'react'
import './Dashboard.css'
import Logout from '../../components/Logout'
import { useNavigate } from 'react-router-dom'


function Dashboard(): React.ReactElement {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Dashboard</h1>
        <Logout onLogout={handleLogout} />
      </div>
      <p>Welcome to the Bank Account Dashboard</p>
    </div>
  );
}

export default Dashboard
