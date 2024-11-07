import { Box, Container, Grid, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)'
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
