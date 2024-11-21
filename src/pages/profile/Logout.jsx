import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        localStorage.clear();
        sessionStorage.clear();
        
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } catch (error) {
        console.error('Erro ao fazer logout:', error);
        navigate('/login');
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      gap={2}
    >
      <CircularProgress />
      <Typography variant="h6">
        Saindo...
      </Typography>
    </Box>
  );
} 