import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  IconButton,
  TextField,
  Button,
  Alert,
  Collapse,
  Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { styles } from '../styles';

const ReviewStep = ({ items, onRemoveItem, onApplyCoupon }) => {
  const [coupon, setCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleApplyCoupon = async () => {
    if (!coupon.trim()) {
      setCouponError('Digite um cupom válido');
      return;
    }

    setIsApplying(true);
    setCouponError('');
    setCouponSuccess('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (coupon.toUpperCase() === 'DESCONTO10') {
        setCouponSuccess('Cupom aplicado com sucesso!');
        onApplyCoupon?.(10);
        setCoupon('');
      } else {
        setCouponError('Cupom inválido ou expirado');
      }
    } catch (error) {
      setCouponError('Erro ao aplicar cupom. Tente novamente.');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <Card sx={{ backgroundColor: '#132F4C' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom color="white">
          Revisão do Pedido
        </Typography>
        <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Plano selecionado */}
        {items.map((item) => (
          <Box key={item.id} sx={styles.orderItem}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3} sm={2}>
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={{
                    width: '100%',
                    borderRadius: 1,
                    aspectRatio: '1/1',
                    objectFit: 'cover'
                  }}
                />
              </Grid>
              
              <Grid item xs={6} sm={7}>
                <Stack spacing={1}>
                  <Typography variant="h6" color="white">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                    {item.description}
                  </Typography>
                  <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                    Quantidade: {item.quantity}
                  </Typography>
                </Stack>
              </Grid>
              
              <Grid item xs={2} sm={2}>
                <Typography variant="h6" align="right" color="#FFFFFF">
                  {formatPrice(item.price * item.quantity)}
                </Typography>
              </Grid>
              
              <Grid item xs={1} sm={1}>
                <IconButton 
                  onClick={() => onRemoveItem?.(item.id)}
                  size="small"
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                      color: '#f44336',
                      backgroundColor: 'rgba(244, 67, 54, 0.08)'
                    }
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        ))}

        {/* Seção de Cupom de Desconto */}
        <Box sx={{ mt: 3, mb: 2 }}>
          <Typography 
            variant="subtitle1" 
            color="white" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 2 
            }}
          >
            <LocalOfferOutlinedIcon sx={{ mr: 1 }} />
            Cupom de Desconto
          </Typography>
          
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                value={coupon}
                onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                placeholder="Digite seu cupom"
                variant="outlined"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)'
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.2)'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2'
                    }
                  },
                  '& input': {
                    color: 'white'
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleApplyCoupon}
                disabled={isApplying}
                sx={{
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  '&:hover': {
                    borderColor: '#1976d2',
                    backgroundColor: 'rgba(25, 118, 210, 0.08)'
                  }
                }}
              >
                {isApplying ? 'Aplicando...' : 'Aplicar Cupom'}
              </Button>
            </Grid>
          </Grid>

          {/* Mensagens de erro/sucesso */}
          <Collapse in={!!couponError || !!couponSuccess}>
            <Box sx={{ mt: 1 }}>
              {couponError && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    backgroundColor: 'rgba(211, 47, 47, 0.1)',
                    color: '#ff5252'
                  }}
                >
                  {couponError}
                </Alert>
              )}
              {couponSuccess && (
                <Alert 
                  severity="success"
                  sx={{ 
                    backgroundColor: 'rgba(46, 125, 50, 0.1)',
                    color: '#69f0ae'
                  }}
                >
                  {couponSuccess}
                </Alert>
              )}
            </Box>
          </Collapse>

          {/* Dica de cupom */}
          <Typography 
            variant="caption" 
            color="rgba(255, 255, 255, 0.5)"
            sx={{ display: 'block', mt: 1 }}
          >
            Dica: Use o cupom DESCONTO10 para ganhar 10% de desconto
          </Typography>
        </Box>

        <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
      </CardContent>
    </Card>
  );
};

export default ReviewStep;