import { alpha } from '@mui/material/styles';

export const styles = {
  mainContainer: {
    mt: 4,
    mb: 4
  },
  mainCard: {
    position: 'relative',
    backgroundColor: '#0A1929',
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
      color: '#2196f3',
      fontWeight: 600
    }
  },
  contentContainer: {
    position: 'relative',
    zIndex: 1,
    '& .MuiCard-root': {
      backgroundColor: '#0A1929',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)'
      }
    }
  },
  paymentMethodCard: {
    mb: 2,
    p: 2,
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    backgroundColor: '#0A1929',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    '&:hover': {
      backgroundColor: '#0F2942',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 20px rgba(33, 150, 243, 0.15)'
    }
  },
  selectedPaymentMethod: {
    borderColor: '#2196f3',
    backgroundColor: alpha('#2196f3', 0.08),
    boxShadow: '0 4px 20px rgba(33, 150, 243, 0.2)'
  },
  summaryCard: {
    position: 'sticky',
    top: 24,
    backgroundColor: '#0A1929',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
    '& .MuiCardContent-root': {
      p: 3
    }
  },
  priceText: {
    fontWeight: 600,
    color: '#2196f3'
  },
  actionButton: {
    mt: 3,
    py: 1.5,
    fontWeight: 600,
    backgroundColor: '#2196f3',
    '&:hover': {
      backgroundColor: '#1976d2',
      boxShadow: '0 6px 20px rgba(33, 150, 243, 0.4)'
    }
  },
  backButton: {
    mt: 1,
    color: 'rgba(255, 255, 255, 0.5)',
    '&:hover': {
      backgroundColor: '#0F2942',
      color: '#fff'
    }
  },
  input: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.1)'
      },
      '&:hover fieldset': {
        borderColor: 'rgba(255, 255, 255, 0.2)'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#2196f3'
      }
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.5)'
    },
    '& input': {
      color: 'white'
    },
    '& .MuiFormHelperText-root': {
      color: 'rgba(255, 255, 255, 0.3)'
    },
    '& .MuiFormHelperText-root.Mui-error': {
      color: '#ff5252'
    }
  },
  submitButton: {
    py: 1.5,
    mt: 2,
    backgroundColor: '#2196f3',
    '&:hover': {
      backgroundColor: '#1976d2'
    }
  },
  orderItem: {
    backgroundColor: '#0A1929',
    borderRadius: 1,
    p: 2,
    mb: 2,
    border: '1px solid rgba(255, 255, 255, 0.05)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-2px)'
    }
  },
  dialogPaper: {
    backgroundColor: '#0A1929',
    color: 'white',
    maxWidth: '400px',
    '& .MuiDialogTitle-root': {
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    }
  },
  copyButton: {
    color: '#2196f3',
    '&:hover': {
      backgroundColor: 'rgba(33, 150, 243, 0.08)'
    }
  },
  codeBox: {
    p: 1,
    bgcolor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: 1,
    border: '1px solid rgba(255, 255, 255, 0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: 1
  },
  divider: {
    borderColor: 'rgba(255, 255, 255, 0.05)'
  },
  radioButton: {
    color: 'rgba(255, 255, 255, 0.5)',
    '&.Mui-checked': {
      color: '#2196f3'
    }
  },
  methodIcon: {
    mr: 1,
    color: 'rgba(255, 255, 255, 0.5)'
  },
  methodLabel: {
    color: 'white',
    display: 'flex',
    alignItems: 'center'
  },
  collapseContent: {
    mt: 2,
    pl: 4
  },
  errorText: {
    color: '#ff5252',
    mt: 0.5,
    fontSize: '0.75rem'
  },
  successAlert: {
    backgroundColor: 'rgba(46, 125, 50, 0.05)',
    color: '#69f0ae'
  },
  errorAlert: {
    backgroundColor: 'rgba(211, 47, 47, 0.05)',
    color: '#ff5252'
  },
  downloadButton: {
    backgroundColor: '#2196f3',
    color: 'white',
    '&:hover': {
      backgroundColor: '#1976d2'
    }
  },
  dialog: {
    '& .MuiDialog-paper': {
      backgroundColor: '#0A1929',
      color: 'white',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.05)'
    }
  },
  dialogTitle: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
  },
  dialogContent: {
    backgroundColor: '#0A1929'
  },
  dialogActions: {
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    padding: '16px 24px'
  },
  qrCodeContainer: {
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '8px',
    display: 'inline-block',
    margin: '16px 0'
  },
  totalValue: {
    color: '#2196f3',
    fontWeight: 700,
    fontSize: '1.5rem'
  },
  discountValue: {
    color: '#69f0ae',
    fontWeight: 500
  },
  subtotalValue: {
    color: 'rgba(255, 255, 255, 0.7)'
  },
  paymentIcon: {
    fontSize: '1.5rem',
    color: 'rgba(255, 255, 255, 0.7)'
  },
  cardFormContainer: {
    mt: 2,
    p: 2,
    borderRadius: 1
  }
};

export default styles;