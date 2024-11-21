import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.7) 100%)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(59, 130, 246, 0.1)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    '& .icon': {
      transform: 'scale(1.1)',
      color: theme.palette.primary.main
    }
  },
  '& .icon': {
    transition: 'all 0.3s ease-in-out',
    fontSize: 48,
    color: theme.palette.grey[400]
  }
}));

const features = [
  {
    icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
    title: 'Análise em Tempo Real',
    description: 'Monitore o desempenho das suas campanhas com atualizações instantâneas'
  },
  {
    icon: <TimelineIcon sx={{ fontSize: 40 }} />,
    title: 'Relatórios Detalhados',
    description: 'Visualize métricas importantes e tome decisões baseadas em dados'
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    title: 'Otimização Automática',
    description: 'Melhore seus resultados com recomendações baseadas em IA'
  },
  {
    icon: <AutoGraphIcon sx={{ fontSize: 40 }} />,
    title: 'Integração Multi-plataforma',
    description: 'Conecte-se com todas as suas plataformas de marketing em um só lugar'
  }
];

export default function Features() {
  return (
    <Box sx={{ py: 10, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          align="center" 
          gutterBottom
          sx={{ mb: 8 }}
        >
          Recursos Principais
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard elevation={0}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
