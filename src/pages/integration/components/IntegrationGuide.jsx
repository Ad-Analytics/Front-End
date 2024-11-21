import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper
} from '@mui/material';

const IntegrationGuide = ({ platform }) => {
  const steps = {
    googleAds: [
      'Acesse o Console do Google Ads',
      'Vá em Configurações > API Access',
      'Crie um novo projeto',
      'Copie o token de acesso'
    ],
    metaAds: [
      'Acesse o Business Manager do Meta',
      'Vá em Configurações de Negócios > Integrações',
      'Gere um novo token de acesso',
      'Copie o token gerado'
    ]
  };

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Como obter o token do {platform === 'googleAds' ? 'Google Ads' : 'Meta Ads'}
      </Typography>
      <Stepper orientation="vertical" sx={{ mt: 2 }}>
        {steps[platform].map((step, index) => (
          <Step key={index} active={true}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Paper>
  );
};

export default IntegrationGuide; 