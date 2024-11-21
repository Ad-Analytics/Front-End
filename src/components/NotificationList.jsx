import { useNavigate } from 'react-router-dom';

const NotificationList = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 360,
        maxHeight: '80vh',
        bgcolor: '#1a2035',
        borderRadius: 1,
        boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <Typography variant="h6" color="white">
          Notificações
        </Typography>
      </Box>
      <Box sx={{ 
        overflowY: 'auto',
        flex: 1,
        '&::-webkit-scrollbar': {
          width: '8px'
        },
        '&::-webkit-scrollbar-track': {
          bgcolor: 'rgba(255, 255, 255, 0.05)'
        },
        '&::-webkit-scrollbar-thumb': {
          bgcolor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px'
        }
      }}>
      </Box>
      <Box
        sx={{
          p: 1.5,
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Button
          fullWidth
          onClick={() => navigate('/notifications')}
          sx={{
            color: 'primary.main',
            textTransform: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
            py: 1,
            '&:hover': {
              backgroundColor: 'rgba(33, 150, 243, 0.08)'
            },
            '&:active': {
              backgroundColor: 'rgba(33, 150, 243, 0.12)'
            }
          }}
        >
          Ver Todas
        </Button>
      </Box>
    </Box>
  );
};

export default NotificationList; 