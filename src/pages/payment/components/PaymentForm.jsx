import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Collapse,
  Stack,
  Divider,
  InputAdornment,
  FormHelperText
} from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PixIcon from '@mui/icons-material/QrCode2';
import BarcodeIcon from '@mui/icons-material/Receipt';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import { styles } from '../styles';
import visaImg from '../../../assets/images/payments/visa.png';
import mastercardImg from '../../../assets/images/payments/mastercard.png';
import eloImg from '../../../assets/images/payments/elo.png';
import pixImg from '../../../assets/images/payments/pix.png';
import boletoImg from '../../../assets/images/payments/boleto.png';

const validationSchema = Yup.object({
  cardNumber: Yup.string()
    .required('Número do cartão é obrigatório')
    .min(19, 'Número do cartão inválido'),
  cardName: Yup.string()
    .required('Nome no cartão é obrigatório')
    .min(3, 'Nome muito curto'),
  expiryDate: Yup.string()
    .required('Data de validade é obrigatória')
    .min(5, 'Data inválida'),
  cvv: Yup.string()
    .required('CVV é obrigatório')
    .min(3, 'CVV inválido')
});

const PaymentForm = ({ onNext, onBack }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [pixCode, setPixCode] = useState('');
  const [boletoCode, setBoletoCode] = useState('');
  const [showPixDialog, setShowPixDialog] = useState(false);
  const [showBoletoDialog, setShowBoletoDialog] = useState(false);

  const formik = useFormik({
    initialValues: {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        onNext();
      } catch (error) {
        console.error('Erro ao processar pagamento:', error);
      } finally {
        setLoading(false);
      }
    }
  });

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleGeneratePix = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setPixCode('00020126580014BR.GOV.BCB.PIX0136123e4567-e12b-12d1-a456-426655440000');
      setShowPixDialog(true);
    } catch (error) {
      console.error('Erro ao gerar PIX:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateBoleto = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setBoletoCode('34191.79001 01043.510047 91020.150008 9 87820026600');
      setShowBoletoDialog(true);
    } catch (error) {
      console.error('Erro ao gerar boleto:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <Card sx={{ backgroundColor: '#132F4C' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom color="white">
          Forma de Pagamento
        </Typography>
        <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="white" gutterBottom>
            Métodos de Pagamento Aceitos:
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <img src={visaImg} alt="Visa" height="25" />
            <img src={mastercardImg} alt="Mastercard" height="25" />
            <img src={eloImg} alt="Elo" height="25" />
            <img src={pixImg} alt="Pix" height="25" />
            <img src={boletoImg} alt="Boleto" height="25" />
          </Box>
        </Box>
        <FormControl component="fieldset" fullWidth>
          <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange}>
            {/* Cartão de Crédito */}
            <Card 
              variant="outlined" 
              sx={{
                ...styles.paymentMethodCard,
                ...(paymentMethod === 'credit' && styles.selectedPaymentMethod)
              }}
            >
              <FormControlLabel
                value="credit"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CreditCardIcon sx={{ mr: 1 }} />
                    <Typography color="white">Cartão de Crédito</Typography>
                  </Box>
                }
              />
              <Collapse in={paymentMethod === 'credit'}>
                <Box sx={{ mt: 2, pl: 4 }}>
                  <form onSubmit={formik.handleSubmit}>
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
                              error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
                              helperText={formik.touched.cardNumber && formik.errors.cardNumber}
                              sx={styles.input}
                            />
                          )}
                        </InputMask>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="cardName"
                          label="Nome no Cartão"
                          value={formik.values.cardName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.cardName && Boolean(formik.errors.cardName)}
                          helperText={formik.touched.cardName && formik.errors.cardName}
                          sx={styles.input}
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
                              error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
                              helperText={formik.touched.expiryDate && formik.errors.expiryDate}
                              sx={styles.input}
                            />
                          )}
                        </InputMask>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          name="cvv"
                          label="CVV"
                          value={formik.values.cvv}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.cvv && Boolean(formik.errors.cvv)}
                          helperText={formik.touched.cvv && formik.errors.cvv}
                          sx={styles.input}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          disabled={loading}
                          sx={styles.submitButton}
                        >
                          {loading ? (
                            <CircularProgress size={24} color="inherit" />
                          ) : (
                            'Finalizar Pagamento'
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Box>
              </Collapse>
            </Card>

            {/* PIX */}
            <Card 
              variant="outlined" 
              sx={{
                ...styles.paymentMethodCard,
                ...(paymentMethod === 'pix' && styles.selectedPaymentMethod)
              }}
            >
              <FormControlLabel
                value="pix"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PixIcon sx={{ mr: 1 }} />
                    <Typography color="white">PIX</Typography>
                  </Box>
                }
              />
              <Collapse in={paymentMethod === 'pix'}>
                <Box sx={{ mt: 2, pl: 4 }}>
                  <Button
                    variant="contained"
                    onClick={handleGeneratePix}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                  >
                    {loading ? 'Gerando...' : 'Gerar QR Code PIX'}
                  </Button>
                </Box>
              </Collapse>
            </Card>

            {/* Boleto */}
            <Card 
              variant="outlined" 
              sx={{
                ...styles.paymentMethodCard,
                ...(paymentMethod === 'boleto' && styles.selectedPaymentMethod)
              }}
            >
              <FormControlLabel
                value="boleto"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <BarcodeIcon sx={{ mr: 1 }} />
                    <Typography color="white">Boleto Bancário</Typography>
                  </Box>
                }
              />
              <Collapse in={paymentMethod === 'boleto'}>
                <Box sx={{ mt: 2, pl: 4 }}>
                  <Button
                    variant="contained"
                    onClick={handleGenerateBoleto}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                  >
                    {loading ? 'Gerando...' : 'Gerar Boleto'}
                  </Button>
                </Box>
              </Collapse>
            </Card>
          </RadioGroup>
        </FormControl>

        {/* Dialog PIX */}
        <Dialog 
          open={showPixDialog} 
          onClose={() => setShowPixDialog(false)}
          PaperProps={{
            sx: {
              backgroundColor: '#132F4C',
              color: 'white',
              maxWidth: '400px'
            }
          }}
        >
          <DialogTitle>QR Code PIX</DialogTitle>
          <DialogContent>
            <Stack spacing={3} alignItems="center">
              <QRCodeSVG value={pixCode} size={200} level="H" />
              <Box sx={{ width: '100%' }}>
                <Typography variant="subtitle2" color="rgba(255, 255, 255, 0.7)" gutterBottom>
                  Código PIX:
                </Typography>
                <Box sx={{ 
                  p: 1, 
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      flex: 1,
                      wordBreak: 'break-all',
                      color: 'rgba(255, 255, 255, 0.9)'
                    }}
                  >
                    {pixCode}
                  </Typography>
                  <Button
                    size="small"
                    startIcon={<ContentCopyIcon />}
                    onClick={() => handleCopyCode(pixCode)}
                    sx={{ color: 'primary.main' }}
                  >
                    Copiar
                  </Button>
                </Box>
              </Box>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowPixDialog(false)} sx={{ color: 'white' }}>
              Fechar
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog Boleto */}
        <Dialog 
          open={showBoletoDialog} 
          onClose={() => setShowBoletoDialog(false)}
          PaperProps={{
            sx: {
              backgroundColor: '#132F4C',
              color: 'white',
              maxWidth: '400px'
            }
          }}
        >
          <DialogTitle>Boleto Gerado</DialogTitle>
          <DialogContent>
            <Stack spacing={3}>
              <Typography variant="subtitle2" color="rgba(255, 255, 255, 0.7)" gutterBottom>
                Código do Boleto:
              </Typography>
              <Box sx={{ 
                p: 1, 
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    flex: 1,
                    wordBreak: 'break-all',
                    color: 'rgba(255, 255, 255, 0.9)'
                  }}
                >
                  {boletoCode}
                </Typography>
                <Button
                  size="small"
                  startIcon={<ContentCopyIcon />}
                  onClick={() => handleCopyCode(boletoCode)}
                  sx={{ color: 'primary.main' }}
                >
                  Copiar
                </Button>
              </Box>
              <Button
                variant="contained"
                fullWidth
                onClick={() => window.open('#', '_blank')}
              >
                Baixar PDF
              </Button>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowBoletoDialog(false)} sx={{ color: 'white' }}>
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;