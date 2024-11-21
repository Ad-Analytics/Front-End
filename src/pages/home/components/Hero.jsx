import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import GradientText from '../../../components/common/GradientText';
import AnimatedButton from '../../../components/common/AnimatedButton';

const GradientBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
  padding: theme.spacing(20, 0, 12, 0),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle at center, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0) 50%)',
    animation: 'rotate 30s linear infinite'
  },
  '@keyframes rotate': {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' }
  }
}));

const AnimatedGradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(90deg, #3B82F6 0%, #10B981 100%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  animation: 'gradientMove 8s ease infinite',
  '@keyframes gradientMove': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' }
  }
}));

export default function Hero() {
  return (
    <GradientBox>
      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center" textAlign="center">
          <AnimatedGradientText variant="h1" fontSize={{ xs: '2.5rem', md: '4rem' }} fontWeight="bold">
            Transforme seus Dados em Resultados
          </AnimatedGradientText>
          
          <Typography variant="h5" color="grey.300" maxWidth="800px">
            Potencialize suas campanhas de marketing com análises avançadas e insights em tempo real
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <AnimatedButton
              variant="contained"
              size="large"
              href="/register"
              sx={{ borderRadius: '6px' }}
            >
              Teste Gratuitamente
            </AnimatedButton>
            
            <Button
              variant="outlined"
              size="large"
              color="inherit"
              href="/login"
            >
              Fazer Login
            </Button>
          </Stack>
        </Stack>
      </Container>
    </GradientBox>
  );
}