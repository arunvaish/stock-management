import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/error.css';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-code">403</h1>
        <h2 className="error-title">Access Denied</h2>
        <p className="error-message">You don't have permission to access this page.</p>
        <button onClick={() => navigate('/dashboard')} className="error-button">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
