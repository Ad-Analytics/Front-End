import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';

const ConfirmationStep = ({ orderNumber }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 4
          }}
        >
          <CheckCircleIcon
            color="success"
            sx={{ fontSize: 64, mb: 2 }}
          />
          <Typography variant="h4" gutterBottom align="center">
            Pagamento Confirmado!
          </Typography>
          
          <Typography variant="h6" color="text.secondary" align="center" gutterBottom>
            Pedido #{orderNumber}
          </Typography>
          
          <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 400, mb: 4 }}>
            Agradecemos sua compra! Você receberá um e-mail com os detalhes do pedido e instruções adicionais.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/dashboard')}
            >
              Voltar ao Início
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<ReceiptIcon />}
              onClick={() => navigate(`/orders/${orderNumber}`)}
            >
              Ver Pedido
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ConfirmationStep;