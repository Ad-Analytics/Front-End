import React from 'react';
import { Box, Typography } from '@mui/material';

const PaymentMethods = () => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" color="white" gutterBottom>
        Métodos de Pagamento Aceitos:
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
        <img src="/visa.png" alt="Visa" height="25" />
        <img src="/mastercard.png" alt="Mastercard" height="25" />
        <img src="/elo.png" alt="Elo" height="25" />
        <img src="/pix.png" alt="PIX" height="25" />
      </Box>
    </Box>
  );
};

export default PaymentMethods;