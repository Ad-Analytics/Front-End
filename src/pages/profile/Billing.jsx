import { useState } from 'react';
import {
  Grid,
  Stack,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Paper,
  Box,
  Modal,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  IconButton,
  Divider
} from '@mui/material';
import { Receipt, CreditCard, AccountBalance, Download, Close } from '@mui/icons-material';
import MainCard from 'components/MainCard';
import { styled } from '@mui/material/styles';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)'
    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(241, 245, 249, 0.95) 100%)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10]
  }
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  '& .MuiTableHead-root': {
    '& .MuiTableCell-root': {
      backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(0, 0, 0, 0.2)'
        : 'rgba(0, 0, 0, 0.03)',
      fontWeight: 600
    }
  },
  '& .MuiTableBody-root': {
    '& .MuiTableRow-root': {
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        backgroundColor: theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.05)'
          : 'rgba(0, 0, 0, 0.02)'
      }
    }
  }
}));

const IconBox = styled(Box)(({ theme }) => ({
  width: 45,
  height: 45,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.main,
  marginRight: theme.spacing(2)
}));

const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const ModalContent = styled(Paper)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: 500,
  padding: theme.spacing(4),
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.98) 0%, rgba(15, 23, 42, 0.98) 100%)'
    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(241, 245, 249, 0.98) 100%)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius * 2
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(255, 255, 255, 0.8)',
    borderRadius: '12px',
    transition: 'all 0.3s ease-in-out',
    '& fieldset': {
      borderColor: theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.15)'
        : 'rgba(0, 0, 0, 0.15)',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.25)'
        : 'rgba(0, 0, 0, 0.25)',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: '1px',
    }
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.7)'
      : 'rgba(0, 0, 0, 0.7)',
  },
  '& .MuiInputBase-input': {
    color: theme.palette.mode === 'dark'
      ? theme.palette.common.white
      : theme.palette.common.black,
  }
}));

const PaymentMethodCard = styled(Box)(({ theme, selected }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `2px solid ${selected ? theme.palette.primary.main : theme.palette.divider}`,
  backgroundColor: theme.palette.mode === 'dark'
    ? 'rgba(0, 0, 0, 0.2)'
    : 'rgba(0, 0, 0, 0.03)',
  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-2px)'
  }
}));

export default function Billing() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('credit');
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  const invoices = [
    {
      id: '#INV-001',
      date: '01/03/2024',
      amount: 'R$ 199,90',
      status: 'Pago',
      plan: 'Plano Premium'
    },
    {
      id: '#INV-002',
      date: '01/02/2024',
      amount: 'R$ 199,90',
      status: 'Pago',
      plan: 'Plano Premium'
    }
  ];

  const paymentMethod = {
    type: 'Cartão de Crédito',
    number: '**** **** **** 1234',
    expiry: '12/25',
    brand: 'Mastercard'
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  const handleFormChange = (event) => {
    setPaymentForm({
      ...paymentForm,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implementar lógica de processamento do pagamento
    console.log('Form submitted:', paymentForm);
    handleCloseModal();
  };

  const generatePDF = (invoice) => {
    const doc = new jsPDF();
    
    // Configurações iniciais
    doc.setFont('helvetica');
    
    // Cabeçalho
    doc.setFontSize(20);
    doc.text('AD Analytics', 105, 20, { align: 'center' });
    
    doc.setFontSize(16);
    doc.text('Fatura', 105, 30, { align: 'center' });
    
    // Informações da fatura
    doc.setFontSize(12);
    doc.text(`Fatura Nº: ${invoice.id}`, 20, 50);
    doc.text(`Data: ${invoice.date}`, 20, 60);
    doc.text(`Plano: ${invoice.plan}`, 20, 70);
    
    // Informações do cliente
    doc.text('Cliente:', 20, 90);
    doc.text('Lucas Costela', 20, 100);
    doc.text('lucas.costela@adanalytics.com', 20, 110);
    
    // Detalhes do pagamento
    doc.setFontSize(14);
    doc.text('Detalhes do Pagamento', 20, 130);
    
    doc.autoTable({
      startY: 140,
      head: [['Descrição', 'Valor']],
      body: [
        [invoice.plan, invoice.amount],
        ['Taxa de Serviço', 'R$ 0,00'],
        ['Total', invoice.amount]
      ],
      styles: {
        fontSize: 12,
        cellPadding: 5
      },
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: 255
      }
    });
    
    // Rodapé
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(10);
    doc.text('AD Analytics - Análise de Dados e Marketing Digital', 105, pageHeight - 20, { align: 'center' });
    doc.text('Obrigado pela preferência!', 105, pageHeight - 15, { align: 'center' });
    
    // Download do arquivo
    doc.save(`fatura-${invoice.id.toLowerCase()}.pdf`);
  };

  return (
    <MainCard title="Cobrança">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledPaper sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Stack direction="row" alignItems="center">
                <IconBox>
                  <CreditCard />
                </IconBox>
                <Stack spacing={0}>
                  <Typography variant="h6">
                    Método de Pagamento Atual
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Atualizado em 01/03/2024
                  </Typography>
                </Stack>
              </Stack>
              
              <Box sx={{ 
                p: 2, 
                borderRadius: 2, 
                bgcolor: (theme) => theme.palette.mode === 'dark' 
                  ? 'rgba(0, 0, 0, 0.2)' 
                  : 'rgba(0, 0, 0, 0.03)'
              }}>
                <Stack spacing={1}>
                  <Typography variant="subtitle1">{paymentMethod.type}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {paymentMethod.number} • Expira em {paymentMethod.expiry}
                  </Typography>
                  <Stack direction="row" spacing={1} mt={1}>
                    <Button 
                      variant="contained" 
                      size="small"
                      startIcon={<AccountBalance />}
                      onClick={handleOpenModal}
                    >
                      Alterar Método
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </StyledPaper>
        </Grid>

        <Grid item xs={12}>
          <StyledPaper sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Stack direction="row" alignItems="center">
                <IconBox>
                  <Receipt />
                </IconBox>
                <Stack spacing={0}>
                  <Typography variant="h6">
                    Histórico de Faturas
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Visualize e baixe suas faturas
                  </Typography>
                </Stack>
              </Stack>

              <StyledTableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Fatura</TableCell>
                      <TableCell>Data</TableCell>
                      <TableCell>Plano</TableCell>
                      <TableCell>Valor</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>
                          <Typography variant="subtitle2">{invoice.id}</Typography>
                        </TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.plan}</TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" color="primary">
                            {invoice.amount}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={invoice.status}
                            color="success"
                            size="small"
                            sx={{
                              borderRadius: '6px',
                              fontWeight: 500
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="outlined"
                            startIcon={<Download />}
                            size="small"
                            onClick={() => generatePDF(invoice)}
                            sx={{
                              borderRadius: '8px',
                              '&:hover': {
                                backgroundColor: 'primary.main',
                                color: 'common.white'
                              }
                            }}
                          >
                            PDF
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </StyledTableContainer>
            </Stack>
          </StyledPaper>
        </Grid>
      </Grid>

      <StyledModal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="payment-modal-title"
      >
        <ModalContent>
          <IconButton
            sx={{
              position: 'absolute',
              right: 8,
              top: 8
            }}
            onClick={handleCloseModal}
          >
            <Close />
          </IconButton>

          <Stack spacing={3}>
            <Typography variant="h5" id="payment-modal-title">
              Alterar Método de Pagamento
            </Typography>

            <FormControl>
              <RadioGroup
                value={selectedMethod}
                onChange={handleMethodChange}
              >
                <Stack spacing={2}>
                  <PaymentMethodCard selected={selectedMethod === 'credit'}>
                    <FormControlLabel
                      value="credit"
                      control={<Radio />}
                      label={
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <CreditCard color="primary" />
                          <Typography>Cartão de Crédito</Typography>
                        </Stack>
                      }
                    />
                  </PaymentMethodCard>

                  <PaymentMethodCard selected={selectedMethod === 'debit'}>
                    <FormControlLabel
                      value="debit"
                      control={<Radio />}
                      label={
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <AccountBalance color="primary" />
                          <Typography>Débito em Conta</Typography>
                        </Stack>
                      }
                    />
                  </PaymentMethodCard>
                </Stack>
              </RadioGroup>
            </FormControl>

            <Divider />

            {selectedMethod === 'credit' && (
              <form onSubmit={handleSubmit}>
                <Stack spacing={2.5}>
                  <StyledTextField
                    fullWidth
                    label="Número do Cartão"
                    name="cardNumber"
                    value={paymentForm.cardNumber}
                    onChange={handleFormChange}
                    placeholder="0000 0000 0000 0000"
                  />
                  
                  <StyledTextField
                    fullWidth
                    label="Nome no Cartão"
                    name="cardName"
                    value={paymentForm.cardName}
                    onChange={handleFormChange}
                  />
                  
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <StyledTextField
                      label="Validade"
                      name="expiry"
                      value={paymentForm.expiry}
                      onChange={handleFormChange}
                      placeholder="MM/AA"
                      sx={{ flex: 1 }}
                    />
                    <StyledTextField
                      label="CVV"
                      name="cvv"
                      value={paymentForm.cvv}
                      onChange={handleFormChange}
                      type="password"
                      inputProps={{ maxLength: 4 }}
                      sx={{ flex: 1 }}
                    />
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    type="submit"
                    sx={{
                      mt: 1,
                      height: 48,
                      borderRadius: '12px'
                    }}
                  >
                    Salvar Alterações
                  </Button>
                </Stack>
              </form>
            )}

            {selectedMethod === 'debit' && (
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <StyledTextField
                    fullWidth
                    label="Banco"
                    name="bank"
                    select
                    SelectProps={{
                      native: true
                    }}
                  >
                    <option value="">Selecione seu banco</option>
                    <option value="001">Banco do Brasil</option>
                    <option value="341">Itaú</option>
                    <option value="033">Santander</option>
                    <option value="104">Caixa Econômica</option>
                  </StyledTextField>

                  <StyledTextField
                    fullWidth
                    label="Agência"
                    name="agency"
                    placeholder="0000"
                  />

                  <StyledTextField
                    fullWidth
                    label="Conta"
                    name="account"
                    placeholder="00000-0"
                  />

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    type="submit"
                    sx={{
                      mt: 1,
                      height: 48,
                      borderRadius: '12px'
                    }}
                  >
                    Salvar Alterações
                  </Button>
                </Stack>
              </form>
            )}
          </Stack>
        </ModalContent>
      </StyledModal>
    </MainCard>
  );
}
