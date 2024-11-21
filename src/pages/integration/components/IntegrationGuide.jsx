import React from 'react';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Link,
  Paper,
  Stack,
  Alert,
  Button
} from '@mui/material';
import {
  Launch as LaunchIcon,
  ContentCopy as CopyIcon,
  CheckCircle as CheckIcon
} from '@mui/icons-material';

const IntegrationGuide = ({ platform }) => {
  const guides = {
    googleAds: {
      title: 'Como obter o token do Google Ads',
      steps: [
        {
          label: 'Acesse o Google Ads',
          description: 'Faça login na sua conta do Google Ads',
          link: 'https://ads.google.com'
        },
        {
          label: 'Acesse as Configurações',
          description: 'No menu superior direito, clique em "Ferramentas e Configurações"'
        },
        {
          label: 'API e Acesso',
          description: 'Na seção "Setup", clique em "API Center"'
        },
        {
          label: 'Gere o Token de Acesso',
          description: 'Clique em "Criar Token de Acesso" e siga as instruções'
        },
        {
          label: 'Copie o Token',
          description: 'Copie o token gerado e cole no campo correspondente na plataforma'
        }
      ],
      format: 'XXXX-XXXX-XXXX-XXXX',
      tips: [
        'O token tem validade de 12 meses',
        'Mantenha seu token em segurança',
        'Não compartilhe seu token com terceiros'
      ]
    },
    metaAds: {
      title: 'Como obter o token do Meta Ads',
      steps: [
        {
          label: 'Acesse o Business Manager',
          description: 'Faça login no Meta Business Manager',
          link: 'https://business.facebook.com'
        },
        {
          label: 'Acesse as Configurações',
          description: 'No menu, clique em "Configurações de Negócios"'
        },
        {
          label: 'Usuários',
          description: 'Na seção "Usuários", clique em "Integrações de Sistema"'
        },
        {
          label: 'Gere o Token',
          description: 'Clique em "Gerar Novo Token" e defina as permissões necessárias'
        },
        {
          label: 'Copie o Token',
          description: 'Copie o token gerado e cole no campo correspondente na plataforma'
        }
      ],
      format: 'EAAxxxxxxxxxx... (140-200 caracteres)',
      tips: [
        'O token tem validade de 60 dias',
        'Certifique-se de ter as permissões necessárias',
        'Guarde o token em local seguro'
      ]
    }
  };

  const selectedGuide = guides[platform];

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {selectedGuide.title}
      </Typography>

      <Stepper orientation="vertical" sx={{ mt: 3 }}>
        {selectedGuide.steps.map((step, index) => (
          <Step key={index} active={true}>
            <StepLabel>
              <Typography variant="subtitle1">{step.label}</Typography>
            </StepLabel>
            <StepContent>
              <Stack spacing={2}>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
                {step.link && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<LaunchIcon />}
                    href={step.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ width: 'fit-content' }}
                  >
                    Acessar {platform === 'googleAds' ? 'Google Ads' : 'Meta Business'}
                  </Button>
                )}
              </Stack>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      <Paper sx={{ p: 3, mt: 4, bgcolor: 'background.neutral' }}>
        <Typography variant="subtitle2" gutterBottom>
          Formato do Token:
        </Typography>
        <Box 
          sx={{ 
            p: 1.5, 
            bgcolor: 'background.paper', 
            borderRadius: 1,
            fontFamily: 'monospace'
          }}
        >
          {selectedGuide.format}
        </Box>
      </Paper>

      <Alert 
        severity="info" 
        sx={{ mt: 3 }}
        icon={<CheckIcon />}
      >
        <Typography variant="subtitle2" gutterBottom>
          Dicas Importantes:
        </Typography>
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          {selectedGuide.tips.map((tip, index) => (
            <li key={index}>
              <Typography variant="body2">
                {tip}
              </Typography>
            </li>
          ))}
        </ul>
      </Alert>
    </Box>
  );
};

export default IntegrationGuide; 