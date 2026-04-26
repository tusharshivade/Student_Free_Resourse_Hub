import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const API_URL = '/api/auth';

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount and verify with backend
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser && storedUser.id) {
      // Verify with backend
      fetch(`${API_URL}/me`, {
        headers: { 'x-user-id': storedUser.id }
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Session invalid');
      })
      .then(user => {
        setCurrentUser(user);
      })
      .catch(() => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
      })
      .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const signup = async (name, email, password, accountType = 'student') => {
    const res = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, accountType })
    });
    
    let data;
    try {
      data = await res.json();
    } catch (e) {
      data = {};
    }
    
    if (!res.ok) {
      throw new Error(data.error || 'Failed to create account');
    }
    
    setCurrentUser(data);
    localStorage.setItem('currentUser', JSON.stringify(data));
    return data;
  };

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    let data;
    try {
      data = await res.json();
    } catch (e) {
      data = {};
    }
    
    if (!res.ok) {
      throw new Error(data.error || 'Invalid email or password');
    }
    
    setCurrentUser(data);
    localStorage.setItem('currentUser', JSON.stringify(data));
    return data;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};