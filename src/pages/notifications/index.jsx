import { Container, Typography, Box, Paper, Chip, IconButton, Stack } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import MainCard from 'components/MainCard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CommentIcon from '@mui/icons-material/Comment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';

const NotificationsPage = () => {
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Sua campanha de Promoção de Verão foi enviada com sucesso.',
      time: new Date(2024, 1, 15, 15, 30),
      read: false
    },
    {
      id: 2,
      type: 'comment',
      title: 'Niko comentou em sua campanha.',
      time: new Date(2024, 1, 15, 12, 0),
      read: true
    },
    {
      id: 3,
      type: 'progress',
      title: 'Sua campanha está 80% completa',
      time: new Date(2024, 1, 15, 8, 15),
      read: false
    }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon sx={{ color: 'success.main' }} />;
      case 'comment':
        return <CommentIcon sx={{ color: 'info.main' }} />;
      case 'progress':
        return <TrendingUpIcon sx={{ color: 'warning.main' }} />;
      case 'meeting':
        return <GroupIcon sx={{ color: 'primary.main' }} />;
      default:
        return <NotificationsIcon sx={{ color: 'primary.main' }} />;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <MainCard>
        <Stack spacing={3}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <NotificationsIcon sx={{ color: 'primary.main', fontSize: 28 }} />
            <Typography variant="h4" color="white">
              Notificações
            </Typography>
          </Stack>

          <Box sx={{ 
            bgcolor: '#1a2035',
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            {notifications.map((notification, index) => (
              <Box
                key={notification.id}
                sx={{
                  p: 3,
                  borderBottom: index !== notifications.length - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 2,
                  bgcolor: notification.read ? 'transparent' : 'rgba(33, 150, 243, 0.08)',
                  transition: 'background-color 0.2s ease-in-out',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.02)'
                  }
                }}
              >
                <Box sx={{ 
                  p: 1,
                  borderRadius: 1,
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {getNotificationIcon(notification.type)}
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography 
                      color="white" 
                      variant="body1"
                      sx={{ 
                        fontWeight: notification.read ? 400 : 500,
                        mb: 0.5
                      }}
                    >
                      {notification.title}
                    </Typography>
                    {!notification.read && (
                      <Chip 
                        label="Nova" 
                        size="small"
                        color="primary"
                        sx={{ 
                          height: 24,
                          fontSize: '0.75rem',
                          fontWeight: 500
                        }}
                      />
                    )}
                  </Stack>
                  <Typography 
                    color="text.secondary" 
                    variant="caption"
                    sx={{ 
                      display: 'block',
                      fontSize: '0.75rem'
                    }}
                  >
                    {formatDistanceToNow(notification.time, { 
                      addSuffix: true,
                      locale: ptBR 
                    })}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {notifications.length === 0 && (
            <Box 
              sx={{ 
                p: 4, 
                textAlign: 'center',
                bgcolor: '#1a2035',
                borderRadius: 2,
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              <NotificationsIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography color="text.secondary">
                Nenhuma notificação encontrada
              </Typography>
            </Box>
          )}
        </Stack>
      </MainCard>
    </Container>
  );
};

export default NotificationsPage; 