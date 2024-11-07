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