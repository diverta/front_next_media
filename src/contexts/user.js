'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import getProfile from '@/fetch/getProfile';

const UserContext = createContext();

const USER_MEMBER_ID_KEY = 'member_id';

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeUser = (userData) => {
    if (!userData?.member_id) {
      window.localStorage.setItem(USER_MEMBER_ID_KEY, null);
      setUser(null);
      return;
    }
    window.localStorage.setItem(USER_MEMBER_ID_KEY, userData.member_id);
    setUser(userData);
  };

  useEffect(() => {
    const memberId = window.localStorage.getItem(USER_MEMBER_ID_KEY);

    if (!memberId || isNaN(memberId)) {
      setLoading(false);
      return;
    }

    // make sure the user is still valid
    getProfile()
      .then((data) => {
        window.localStorage.setItem(USER_MEMBER_ID_KEY, data.member_id);
        setUser(data);
      })
      .catch(console.warn)
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
