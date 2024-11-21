import React from 'react';
import { Button, Typography, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function EmailConfirmation() {
  return (
    <Stack spacing={3} alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
      <Typography variant="h4">Verifique seu e-mail</Typography>
      <Typography variant="body1">
        Um e-mail de validação foi enviado para o seu endereço de e-mail. Por favor, verifique sua caixa de entrada.
      </Typography>
      <Button variant="contained" component={RouterLink} to="/login">
        Fazer Login
      </Button>
    </Stack>
  );
} 