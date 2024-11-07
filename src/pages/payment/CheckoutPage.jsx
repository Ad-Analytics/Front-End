import React, { useState } from 'react';
import {
  Box,
  Container,
  Stepper,
  Step,
  StepLabel,
  Grid,
  useTheme,
  StepConnector,
  styled
} from '@mui/material';
import MainCard from 'components/MainCard';
import { styles } from './styles';

// Ícones
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// Componentes
import ReviewStep from './components/ReviewStep';
import PaymentForm from './components/PaymentForm';
import ConfirmationStep from './components/ConfirmationStep';
import OrderSummary from './components/OrderSummary';

const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  '& .MuiStepConnector-line': {
    borderColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.12)' 
      : 'rgba(0, 0, 0, 0.12)',
    borderTopWidth: 3,
    borderRadius: 1,
  },
  '&.Mui-active': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
    },
  },
  '&.Mui-completed': {
    '& .MuiStepConnector-line': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const CustomStepIcon = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.08)' 
    : 'rgba(0, 0, 0, 0.08)',
  zIndex: 1,
  color: theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.5)' 
    : 'rgba(0, 0, 0, 0.38)',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,0.25)',
  }),
  ...(ownerState.completed && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  }),
}));

const steps = [
  {
    label: 'Revisão',
    icon: <ShoppingCartOutlinedIcon />
  },
  {
    label: 'Pagamento',
    icon: <PaymentOutlinedIcon />
  },
  {
    label: 'Confirmação',
    icon: <CheckCircleOutlineIcon />
  }
];

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
    discount: 19.90
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
      <MainCard 
        sx={styles.mainCard}
        contentSX={{ backgroundColor: '#0A1929' }}
        border={false}
      >
        <Box sx={styles.stepperContainer}>
          <Stepper 
            activeStep={activeStep} 
            alternativeLabel 
            connector={<CustomStepConnector />}
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconComponent={(props) => (
                    <CustomStepIcon {...props} ownerState={{ ...props, active: index === activeStep }}>
                      {step.icon}
                    </CustomStepIcon>
                  )}
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box sx={styles.contentContainer}>
              {getStepContent(activeStep)}
            </Box>
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