import React from 'react';

interface LogoutProps {
  onLogout: () => void;
}

const Logout: React.FC<LogoutProps> = ({ onLogout }) => {
  return (
    <button onClick={onLogout} className="logout-button">
      Logout
    </button>
  );
};

export default Logout;
