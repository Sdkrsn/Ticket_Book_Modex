// frontend/src/context/ShowContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import api from '../api';

type Show = {
  id: number;
  name: string;
  start_time: string;
  total_seats: number;
};

type ShowContextValue = {
  shows: Show[];
  loading: boolean;
  fetchShows: () => Promise<void>;
};

const ShowContext = createContext<ShowContextValue | undefined>(undefined);

export function ShowProvider({ children }: { children: ReactNode }) {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(false);

  async function fetchShows() {
    try {
      setLoading(true);
      const res = await api.get('/shows');
      setShows(res.data || []);
    } catch (e) {
      console.error('fetchShows error', e);
      setShows([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchShows();
  }, []);

  const value: ShowContextValue = { shows, loading, fetchShows };

  return <ShowContext.Provider value={value}>{children}</ShowContext.Provider>;
}

export function useShows() {
  const ctx = useContext(ShowContext);
  if (!ctx) {
    // helpful runtime message if provider is missing
    throw new Error('useShows must be used within a ShowProvider. Wrap your app with <ShowProvider>.');
  }
  return ctx;
}
