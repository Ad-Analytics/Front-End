import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Grid,
  useTheme
} from '@mui/material';
import MainCard from 'components/MainCard';
import { styles } from './styles';

// Componentes
import ReviewStep from './components/ReviewStep';
import PaymentForm from './components/PaymentForm';
import ConfirmationStep from './components/ConfirmationStep';
import OrderSummary from './components/OrderSummary';

const steps = ['Revisão', 'Pagamento', 'Confirmação'];

const CheckoutPage = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [orderData, setOrderData] = useState({
    items: [
      {
        id: 1,
        name: 'Plano Premium',
        price: 199.90,
        quantity: 1,
        image: '/path/to/image.jpg'
      }
    ],
    total: 199.90,
    shipping: 0,
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ReviewStep items={orderData.items} onNext={handleNext} />;
      case 1:
        return <PaymentForm onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <ConfirmationStep orderNumber="123456" />;
      default:
        return 'Passo desconhecido';
    }
  };

  return (
    <Container maxWidth="lg" sx={styles.mainContainer}>
      <MainCard sx={styles.mainCard}>
        <Box sx={styles.stepperContainer}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {getStepContent(activeStep)}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <OrderSummary 
              orderData={orderData}
              activeStep={activeStep}
              onNext={handleNext}
              onBack={handleBack}
            />
          </Grid>
        </Grid>
      </MainCard>
    </Container>
  );
};

export default CheckoutPage;