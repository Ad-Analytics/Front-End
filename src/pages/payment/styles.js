import { alpha } from '@mui/material/styles';

export const styles = {
  mainContainer: {
    mt: 4,
    mb: 4
  },
  mainCard: {
    position: 'relative',
    backgroundColor: '#0A1929', // Azul escuro principal
    '& .MuiCardContent-root': {
      p: 3
    }
  },
  stepperContainer: {
    width: '100%',
    mb: 6,
    position: 'relative',
    zIndex: 1,
    '& .MuiStepLabel-label': {
      mt: 1,
      fontSize: '0.875rem',
      fontWeight: 500,
      color: '#fff'
    },
    '& .MuiStepLabel-label.Mui-active': {
      color: '#1976d2',
      fontWeight: 600
    }
  },
  contentContainer: {
    position: 'relative',
    zIndex: 1,
    '& .MuiCard-root': {
      backgroundColor: '#0A1929', // Mesmo azul escuro
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)'
      }
    }
  },
  paymentMethodCard: {
    mb: 2,
    p: 2,
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    backgroundColor: '#0A1929', // Mesmo azul escuro
    border: '1px solid rgba(255, 255, 255, 0.1)',
    '&:hover': {
      backgroundColor: '#0d2137', // Azul escuro um pouco mais claro no hover
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 20px rgba(25, 118, 210, 0.15)'
    }
  },
  selectedPaymentMethod: {
    borderColor: '#1976d2',
    backgroundColor: alpha('#1976d2', 0.1),
    boxShadow: '0 4px 20px rgba(25, 118, 210, 0.2)'
  },
  summaryCard: {
    position: 'sticky',
    top: 24,
    backgroundColor: '#0A1929', // Mesmo azul escuro
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    '& .MuiCardContent-root': {
      p: 3
    }
  },
  priceText: {
    fontWeight: 600,
    color: '#1976d2'
  },
  actionButton: {
    mt: 3,
    py: 1.5,
    fontWeight: 600,
    backgroundColor: '#1976d2',
    '&:hover': {
      backgroundColor: '#1565c0',
      boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)'
    }
  },
  backButton: {
    mt: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover': {
      backgroundColor: '#0d2137',
      color: '#fff'
    }
  }
};