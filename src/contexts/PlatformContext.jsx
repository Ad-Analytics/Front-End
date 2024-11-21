import { createContext, useContext, useState } from 'react';

const PlatformContext = createContext();

export function PlatformProvider({ children }) {
  const [platform, setPlatform] = useState('google');

  return (
    <PlatformContext.Provider value={{ platform, setPlatform }}>
      {children}
    </PlatformContext.Provider>
  );
}

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform deve ser usado dentro de um PlatformProvider');
  }
  return context;
}; 