import React, { createContext, useEffect, useState } from 'react';
import { getData } from '../util/helper';
import { useAuth } from '../context/AuthContext';

export const ScoresContext = createContext();

export const ScoresProvider = ({ children }) => {
  const [scores, setScores] = useState([]);
  const { idToken, localId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(localId, idToken);
        setScores(data || {}); // data or empty
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [scores]);

  return (
    <ScoresContext.Provider value={{ scores, setScores }}>
      {children}
    </ScoresContext.Provider>
  );
};
