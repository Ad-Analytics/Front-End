import React from 'react';
import { Button, Typography, Stack, Box, Card, CardContent } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AuthWrapper from './AuthWrapper';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function EmailConfirmation() {
  return (
    <AuthWrapper>
      <Card sx={{ 
        minWidth: 350,
        maxWidth: 600,
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        borderRadius: 2,
        animation: `${fadeIn} 0.6s ease-out`
      }}>
        <CardContent>
          <Stack spacing={4} alignItems="center" justifyContent="center" sx={{ py: 4, px: 2 }}>
            <MarkEmailReadIcon sx={{ 
              fontSize: 80, 
              color: 'primary.main',
              backgroundColor: 'primary.lighter',
              padding: 2,
              borderRadius: '50%'
            }} />
            
            <Stack spacing={2} alignItems="center">
              <Typography variant="h3" align="center" gutterBottom>
                Verifique seu e-mail
              </Typography>
              
              <Typography variant="body1" align="center" color="text.secondary" sx={{ maxWidth: 400 }}>
                Um e-mail de validação foi enviado para o seu endereço de e-mail cadastrado.
              </Typography>
              
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" align="center" color="text.secondary">
                  Não recebeu o e-mail? Verifique sua caixa de spam ou
                </Typography>
                <Button 
                  variant="text"
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 600,
                    display: 'block',
                    margin: '0 auto',
                    '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' }
                  }}
                >
                  Clique aqui para reenviar
                </Button>
              </Box>
            </Stack>

            <Button 
              variant="contained" 
              component={RouterLink} 
              to="/login"
              size="large"
              sx={{ 
                minWidth: 200,
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '1rem',
                py: 1,
                mt: 2
              }}
            >
              Ir para Login
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </AuthWrapper>
  );
} 