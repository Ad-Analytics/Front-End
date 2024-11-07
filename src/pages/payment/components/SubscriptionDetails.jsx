import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';

const SubscriptionDetails = () => {
  return (
    <Box sx={{ my: 2, p: 2, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1 }}>
      <Typography variant="subtitle2" color="white" gutterBottom>
        Detalhes da Assinatura:
      </Typography>
      <Stack spacing={1}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CheckCircleIcon color="success" sx={{ fontSize: 20 }} />
          <Typography variant="body2" color="white">Renovação Automática</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <InfoIcon color="info" sx={{ fontSize: 20 }} />
          <Typography variant="body2" color="white">Cancele quando quiser</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default SubscriptionDetails;