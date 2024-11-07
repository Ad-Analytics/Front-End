import { alpha } from '@mui/material/styles';

export const styles = {
  mainContainer: {
    mt: 4,
    mb: 4
  },
  mainCard: {
    '& .MuiCardContent-root': {
      p: 3
    },
    '& .MuiDivider-root': {
      borderColor: (theme) => alpha(theme.palette.primary.main, 0.1)
    }
  },
  stepperContainer: {
    width: '100%',
    mb: 4,
    '& .MuiStepLabel-label': {
      fontSize: '0.875rem'
    }
  },
  paymentMethodCard: {
    mb: 2,
    p: 2,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      bgcolor: 'action.hover',
      transform: 'translateY(-2px)'
    }
  },
  selectedPaymentMethod: {
    borderColor: 'primary.main',
    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05)
  },
  summaryCard: {
    position: 'sticky',
    top: 24,
    '& .MuiCardContent-root': {
      p: 3
    }
  },
  priceText: {
    fontWeight: 600,
    color: 'primary.main'
  },
  actionButton: {
    mt: 3,
    py: 1.5,
    fontWeight: 600
  },
  backButton: {
    mt: 1,
    color: 'text.secondary',
    '&:hover': {
      bgcolor: 'action.hover'
    }
  },
  productImage: {
    width: '100%',
    borderRadius: 1,
    aspectRatio: '1/1',
    objectFit: 'cover'
  },
  successIcon: {
    fontSize: 64,
    mb: 2,
    color: 'success.main'
  }
};