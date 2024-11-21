import { Card, CardContent, Typography, Stack, Avatar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)'
    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(241, 245, 249, 0.9) 100%)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease-in-out',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10]
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `linear-gradient(45deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
    clipPath: 'circle(60% at 100% 0%)'
  }
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 110,
  height: 110,
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)'
  }
}));

export default function ProfileCard({ user }) {
  return (
    <StyledCard>
      <CardContent>
        <Stack spacing={2} alignItems="center">
          <StyledAvatar
            src={user.avatar}
            alt={user.nome}
          />
          <Box textAlign="center">
            <Typography variant="h5" gutterBottom>
              {user.nome}
            </Typography>
            <Typography 
              variant="subtitle2" 
              sx={{
                color: 'text.secondary',
                backgroundColor: (theme) => theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(0, 0, 0, 0.1)',
                padding: '4px 12px',
                borderRadius: '16px',
                display: 'inline-block'
              }}
            >
              {user.cargo}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </StyledCard>
  );
} 