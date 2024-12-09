import React, { createContext, useEffect, useState } from 'react';
import { getData } from '../util/helper';

export const ScoresContext = createContext();

export const ScoresProvider = ({ children }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setScores(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScoresContext.Provider value={{ scores }}>
      {children}
    </ScoresContext.Provider>
  );
};
