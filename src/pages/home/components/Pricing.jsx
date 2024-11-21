import { Box, Container, Grid, Typography, Card, CardContent, Button, Stack, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import styled from '@emotion/styled';

const plans = [
  {
    title: 'Básico',
    price: 'R$ 99',
    period: '/mês',
    features: [
      'Análise básica de campanhas',
      'Relatórios mensais',
      'Suporte por email',
      'Até 3 usuários'
    ],
    buttonText: 'Começar Agora',
    buttonVariant: 'outlined'
  },
  {
    title: 'Profissional',
    price: 'R$ 199',
    period: '/mês',
    features: [
      'Análise avançada de campanhas',
      'Relatórios semanais',
      'Suporte prioritário',
      'Até 10 usuários',
      'Integração com APIs'
    ],
    buttonText: 'Começar Agora',
    buttonVariant: 'contained',
    highlighted: true
  },
  {
    title: 'Empresarial',
    price: 'R$ 499',
    period: '/mês',
    features: [
      'Análise em tempo real',
      'Relatórios personalizados',
      'Suporte 24/7',
      'Usuários ilimitados',
      'API dedicada',
      'Treinamento personalizado'
    ],
    buttonText: 'Contate Vendas',
    buttonVariant: 'outlined'
  }
];

const PricingCard = styled(Card)(({ theme, highlighted }) => ({
  height: '100%',
  background: highlighted 
    ? 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(16,185,129,0.1) 100%)'
    : 'linear-gradient(145deg, rgba(30,41,59,0.7) 0%, rgba(15,23,42,0.7) 100%)',
  backdropFilter: 'blur(10px)',
  border: highlighted 
    ? '2px solid rgba(59,130,246,0.3)'
    : '1px solid rgba(59,130,246,0.1)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: highlighted ? 'scale(1.05)' : 'scale(1.02)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
  }
}));

export default function Pricing() {
  return (
    <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom>
          Planos e Preços
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Escolha o plano ideal para o seu negócio
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {plans.map((plan) => (
            <Grid item key={plan.title} xs={12} md={4}>
              <PricingCard 
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transform: plan.highlighted ? 'scale(1.05)' : 'none',
                  border: plan.highlighted ? '2px solid primary.main' : 'none',
                  transition: 'transform 0.3s ease-in-out'
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="h4" component="div" gutterBottom>
                        {plan.title}
                      </Typography>
                      <Typography variant="h3" component="div">
                        {plan.price}
                        <Typography variant="subtitle1" component="span" color="text.secondary">
                          {plan.period}
                        </Typography>
                      </Typography>
                    </Box>

                    <List>
                      {plan.features.map((feature) => (
                        <ListItem key={feature} sx={{ px: 0 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircleIcon color="primary" />
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>

                    <Button
                      fullWidth
                      variant={plan.buttonVariant}
                      color="primary"
                      size="large"
                      href="/register"
                    >
                      {plan.buttonText}
                    </Button>
                  </Stack>
                </CardContent>
              </PricingCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
