import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  IconButton,
  Stack
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ReviewStep = ({ items, onRemoveItem }) => {
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
          Revisão do Pedido
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Stack spacing={2}>
          {items.map((item) => (
            <Box key={item.id}>
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
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantidade: {item.quantity}
                  </Typography>
                  {item.description && (
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  )}
                </Grid>
                
                <Grid item xs={2} sm={2}>
                  <Typography variant="h6" align="right">
                    {formatPrice(item.price * item.quantity)}
                  </Typography>
                </Grid>
                
                <Grid item xs={1} sm={1}>
                  <IconButton 
                    color="error" 
                    onClick={() => onRemoveItem?.(item.id)}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}
        </Stack>

        {items.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography variant="body1" color="text.secondary">
              Nenhum item no carrinho
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ReviewStep;