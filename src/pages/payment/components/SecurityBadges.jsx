import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import sslImg from '../../../assets/images/ssl/SSL.png';

const SecurityBadges = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      gap: 3, 
      alignItems: 'center', 
      justifyContent: 'center',
      py: 1
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <LockIcon color="success" sx={{ mr: 1 }} />
        <Typography color="white">
          Pagamento 100% Seguro
        </Typography>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ 
        borderColor: 'rgba(255, 255, 255, 0.1)' 
      }} />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <img 
          src={sslImg} 
          alt="SSL" 
          height="30"
          style={{ opacity: 0.8 }} 
        />
      </Box>
    </Box>
  );
};

export default SecurityBadges;