// src/components/Profile.jsx

import React, { useEffect, useState, useCallback } from 'react';
import { account } from '../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const navigate = useNavigate();
  const { checkAuthStatus } = useAuth();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const isLogin = useCallback(async () => {
    try {
      let person = await account.get('current');
      setEmail(person.email);
      setName(person.name);
    } catch (e) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    isLogin();
  }, [isLogin]);

  const logout = async () => {
    try {
      await account.deleteSession('current');
      console.log('Logout successful');
      checkAuthStatus(); // Update auth status after logging out
      navigate('/login');
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  return (
    <div className="dashboard-container">
      {email && name ? (
        <>
          <h1>Welcome: {name}</h1>
          <p>Email: {email}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <h1>Loading....</h1>
      )}
    </div>
  );
}

export default Profile;
