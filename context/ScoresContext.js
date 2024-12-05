import React, { createContext, useState } from 'react';

export const ScoresContext = createContext();

export const ScoresProvider = ({ children }) => {
  const [playerData, setPlayerData] = useState([{ name: '', totalScore: 0, scoreToAdd: '' }]);

  const addScore = (updatedPlayerData) => {
    setPlayerData(updatedPlayerData);
  };

  const addPlayer = () => {
    setPlayerData(prev => [...prev, { name: '', totalScore: 0, scoreToAdd: '' }]);
  };

  const removePlayer = () => {
    if (playerData.length > 1) {
      setPlayerData(prev => prev.slice(0, -1));
    }
  };

  return (
    <ScoresContext.Provider value={{ playerData, addScore, addPlayer, removePlayer }}>
      {children}
    </ScoresContext.Provider>
  );
};
