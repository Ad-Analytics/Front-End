import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputAdornment,
  FormHelperText
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';

// Ícones
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PixIcon from '@mui/icons-material/QrCode2';
import BarcodeIcon from '@mui/icons-material/Receipt';

const validationSchema = Yup.object({
  paymentMethod: Yup.string().required('Selecione uma forma de pagamento'),
  cardNumber: Yup.string().when('paymentMethod', {
    is: 'credit',
    then: () => Yup.string()
      .required('Número do cartão é obrigatório')
      .matches(/^[0-9]{16}$/, 'Número do cartão inválido')
  }),
  cardName: Yup.string().when('paymentMethod', {
    is: 'credit',
    then: () => Yup.string()
      .required('Nome no cartão é obrigatório')
      .min(3, 'Nome muito curto')
  }),
  expiryDate: Yup.string().when('paymentMethod', {
    is: 'credit',
    then: () => Yup.string()
      .required('Data de validade é obrigatória')
      .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Data inválida')
  }),
  cvv: Yup.string().when('paymentMethod', {
    is: 'credit',
    then: () => Yup.string()
      .required('CVV é obrigatório')
      .matches(/^[0-9]{3,4}$/, 'CVV inválido')
  })
});

const PaymentForm = ({ onNext, onBack }) => {
  const formik = useFormik({
    initialValues: {
      paymentMethod: 'credit',
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: ''
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Dados do pagamento:', values);
      onNext();
    }
  });

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Forma de Pagamento
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <FormControl 
            component="fieldset" 
            sx={{ width: '100%', mt: 2 }}
            error={formik.touched.paymentMethod && Boolean(formik.errors.paymentMethod)}
          >
            <RadioGroup
              name="paymentMethod"
              value={formik.values.paymentMethod}
              onChange={formik.handleChange}
            >
              <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
                <FormControlLabel
                  value="credit"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CreditCardIcon sx={{ mr: 1 }} />
                      <Typography>Cartão de Crédito</Typography>
                    </Box>
                  }
                />
                
                {formik.values.paymentMethod === 'credit' && (
                  <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <InputMask
                          mask="9999 9999 9999 9999"
                          value={formik.values.cardNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          {(inputProps) => (
                            <TextField
                              {...inputProps}
                              fullWidth
                              name="cardNumber"
                              label="Número do Cartão"
                              variant="outlined"
                              error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
                              helperText={formik.touched.cardNumber && formik.errors.cardNumber}
                            />
                          )}
                        </InputMask>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="cardName"
                          label="Nome no Cartão"
                          variant="outlined"
                          value={formik.values.cardName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.cardName && Boolean(formik.errors.cardName)}
                          helperText={formik.touched.cardName && formik.errors.cardName}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <InputMask
                          mask="99/99"
                          value={formik.values.expiryDate}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          {(inputProps) => (
                            <TextField
                              {...inputProps}
                              fullWidth
                              name="expiryDate"
                              label="Validade"
                              variant="outlined"
                              error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
                              helperText={formik.touched.expiryDate && formik.errors.expiryDate}
                            />
                          )}
                        </InputMask>
                      </Grid>

                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          name="cvv"
                          label="CVV"
                          variant="outlined"
                          type="password"
                          inputProps={{ maxLength: 4 }}
                          value={formik.values.cvv}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.cvv && Boolean(formik.errors.cvv)}
                          helperText={formik.touched.cvv && formik.errors.cvv}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Card>

              <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
                <FormControlLabel
                  value="pix"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PixIcon sx={{ mr: 1 }} />
                      <Typography>PIX</Typography>
                    </Box>
                  }
                />
              </Card>

              <Card variant="outlined" sx={{ p: 2 }}>
                <FormControlLabel
                  value="boleto"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <BarcodeIcon sx={{ mr: 1 }} />
                      <Typography>Boleto Bancário</Typography>
                    </Box>
                  }
                />
              </Card>
            </RadioGroup>
          </FormControl>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;