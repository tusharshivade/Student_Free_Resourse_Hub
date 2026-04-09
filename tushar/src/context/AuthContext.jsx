import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);

  // Load from local storage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const storedActiveUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    
    setUsers(storedUsers);
    setCurrentUser(storedActiveUser);
  }, []);

  const signup = (name, email, password, accountType = 'student') => {
    return new Promise((resolve, reject) => {
      // Basic check to see if email already exists
      const userExists = users.some(u => u.email === email);
      if (userExists) {
        reject(new Error("User with this email already exists"));
        return;
      }
      
      const newUser = { id: Date.now(), name, email, password, accountType, joinDate: new Date().toISOString() };
      const updatedUsers = [...users, newUser];
      
      setUsers(updatedUsers);
      setCurrentUser(newUser); // Automatically log them in

      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      resolve(newUser);
    });
  };

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error("Invalid email or password"));
      }
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
