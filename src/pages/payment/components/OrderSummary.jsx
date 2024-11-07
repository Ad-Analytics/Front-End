import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Stack
} from '@mui/material';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';

const OrderSummary = ({ orderData, activeStep, onNext, onBack }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Resumo do Pedido
        </Typography>
        <Divider sx={{ my: 2 }} />
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
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1" color="text.secondary">
              Subtotal
            </Typography>
            <Typography variant="body1">
              {formatPrice(orderData.total)}
            </Typography>
          </Box>

          {/* Mostra o desconto apenas se for maior que 0 */}
          {orderData.discount > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body1" color="text.secondary">
                Desconto
              </Typography>
              <Typography variant="body1" color="success.main">
                - {formatPrice(orderData.discount)}
              </Typography>
            </Box>
          )}

          <Divider />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Total</Typography>
            <Typography variant="h6" color="primary">
              {formatPrice(orderData.total - (orderData.discount || 0))}
            </Typography>
          </Box>

          <Stack spacing={1} sx={{ mt: 3 }}>
            {activeStep < 2 && (
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={onNext}
                endIcon={<ShoppingCartCheckoutIcon />}
              >
                {activeStep === 0 ? 'Ir para Pagamento' : 'Finalizar Compra'}
              </Button>
            )}

            {activeStep > 0 && activeStep < 2 && (
              <Button
                fullWidth
                onClick={onBack}
                startIcon={<KeyboardBackspaceIcon />}
              >
                Voltar
              </Button>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;