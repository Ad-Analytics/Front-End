import { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profileData, setProfileData] = useState({
    nome: 'Lucas Costela',
    cargo: 'Assistente de Vendas',
    email: 'lucas.costela@adanalytics.com',
    telefone: '(11) 99999-9999',
    bio: 'Profissional dedicado com experiência em vendas e análise de dados.',
    linkedin: 'linkedin.com/in/lucascostela',
    avatar: '/avatarLucas.jpg'
  });

  const updateProfile = (newData) => {
    setProfileData(prev => ({
      ...prev,
      ...newData
    }));
  };

  return (
    <ProfileContext.Provider value={{ profileData, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext); 