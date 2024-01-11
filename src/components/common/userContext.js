'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { parseJSON } from '@/utils/parseJson';

const UserContext = createContext();

const USER_KEY = 'user';

function fetchProfile() {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rcms-api/1/profile`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: 'include'
  })
    .then((res) => res.json())
}

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeUser = (userData) => {
    window.localStorage.setItem(USER_KEY, JSON.stringify(userData))
    setUser(userData);
  };

  useEffect(() => {
    const item = window.localStorage.getItem(USER_KEY);
    const user = item ?? parseJSON(item);

    if (user) {
      // make sure the user is still valid
      fetchProfile()
        .then((data) => {
          window.localStorage.setItem(USER_KEY, JSON.stringify(data))
          setUser(data);
        })
        .catch((err) => {
          console.warn(err);
        })
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <UserContext.Provider value={{ user, loading, storeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
