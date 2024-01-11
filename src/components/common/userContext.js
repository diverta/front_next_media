'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

const USER_MEMBER_ID_KEY = 'member_id';

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
    if (!userData?.member_id) {
      console.warn('No member_id found in user data');
      return;
    }
    window.localStorage.setItem(USER_MEMBER_ID_KEY, userData.member_id)
    setUser(userData);
  };

  useEffect(() => {
    const memberId = window.localStorage.getItem(USER_MEMBER_ID_KEY);

    if (!memberId || isNaN(memberId)) {
      setLoading(false);
      return;
    }

    // make sure the user is still valid
    fetchProfile()
      .then((data) => {
        window.localStorage.setItem(USER_MEMBER_ID_KEY, data.member_id)
        setUser(data);
      })
      .catch((err) => {
        console.warn(err);
      })
      .finally(() => setLoading(false));
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
