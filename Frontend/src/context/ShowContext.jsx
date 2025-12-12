// Migrated to TypeScript. Use src/context/ShowContext.tsx instead.
import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api';

const ShowContext = createContext();

export function ShowProvider({ children }) {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchShows() {
    try {
      setLoading(true);
      const res = await api.get('/shows');
      setShows(res.data);
    } catch (e) {
      console.error('fetchShows error:', e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchShows();
  }, []);

  return (
    <ShowContext.Provider value={{ shows, fetchShows, loading }}>
      {children}
    </ShowContext.Provider>
  );
}

export function useShows() {
  return useContext(ShowContext);
}
