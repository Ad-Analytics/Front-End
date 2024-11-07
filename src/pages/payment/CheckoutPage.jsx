import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Typography,
  useTheme
} from '@mui/material';
import ReviewStep from './components/ReviewStep';
import PaymentForm from './components/PaymentForm';
import ConfirmationStep from './components/ConfirmationStep';
import OrderSummary from './components/OrderSummary';
import { styles } from './styles';

const steps = ['Revisão', 'Pagamento', 'Confirmação'];

const CheckoutPage = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [orderData, setOrderData] = useState({
    items: [
      {
        id: 1,
        name: 'Plano Premium',
        description: 'Assinatura mensal com todos os recursos',
        price: 199.90,
        quantity: 1,
        image: 'src/assets/images/auth/logo.png'
      }
    ],
    total: 199.90,
    shipping: 0,
    discount: 0
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleRemoveItem = (itemId) => {
    setOrderData(prev => {
      const updatedItems = prev.items.filter(item => item.id !== itemId);
      const newTotal = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        ...prev,
        items: updatedItems,
        total: newTotal,
        discount: prev.discount > 0 ? (newTotal * 10) / 100 : 0 // Recalcula o desconto se existir
      };
    });
  };

  const handleApplyCoupon = (discountPercentage) => {
    setOrderData(prev => {
      const discountValue = (prev.total * discountPercentage) / 100;
      return {
        ...prev,
        discount: discountValue
      };
    });
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <ReviewStep 
            items={orderData.items} 
            onNext={handleNext}
            onRemoveItem={handleRemoveItem}
            onApplyCoupon={handleApplyCoupon}
          />
        );
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
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={styles.mainCard}>
            <CardContent>
              <Stepper 
                activeStep={activeStep} 
                alternativeLabel
                sx={styles.stepperContainer}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8} sx={styles.contentContainer}>
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
    </Container>
  );
};

export default CheckoutPage;