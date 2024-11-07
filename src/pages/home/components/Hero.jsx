import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import GradientText from '../../../components/common/GradientText';
import AnimatedButton from '../../../components/common/AnimatedButton';

const GradientBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(45deg, #1a237e 30%, #0d47a1 90%)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(8, 0),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
  }
}));

export default function Hero() {
  return (
    <GradientBox>
      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center" textAlign="center">
          <GradientText variant="h1" fontSize={{ xs: '2.5rem', md: '4rem' }} fontWeight="bold">
            Transforme seus Dados em Resultados
          </GradientText>
          
          <Typography variant="h5" color="grey.300" maxWidth="800px">
            Potencialize suas campanhas de marketing com análises avançadas e insights em tempo real
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <AnimatedButton
              variant="contained"
              size="large"
              href="/register"
            >
              Comece Gratuitamente
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