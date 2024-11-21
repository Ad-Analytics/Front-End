import React from 'react';
import { 
  Box, 
  Typography, 
  Stack, 
  Paper,
  Avatar,
  LinearProgress
} from '@mui/material';
import CampaignIcon from '@mui/icons-material/Campaign';
import { useNavigate } from 'react-router-dom';

const InteractionHistory = () => {
  const navigate = useNavigate();

  const handleCampaignClick = (campaignId) => {
    console.log('Clicou na campanha:', campaignId);
    navigate(`/campaign/${campaignId.replace('#', '')}`);
  };

  const interactions = [
    {
      campaign: '#002434',
      timestamp: 'Hoje, 2:00 AM',
      metric: 'Cliques',
      value: '1430',
      percentage: 78
    },
    {
      campaign: '#984947',
      timestamp: '5 de Agosto, 1:45 PM',
      metric: 'Leads',
      value: '302',
      percentage: 8
    },
    {
      campaign: '#988784',
      timestamp: '7 horas atrás',
      metric: 'Cliques',
      value: '850',
      percentage: 45
    }
  ];

  return (
    <Paper 
      sx={{ 
        bgcolor: '#0A0E17',
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
        <Typography variant="h6" color="white">
          Histórico de Interações
        </Typography>
      </Box>

      {interactions.map((interaction, index) => (
        <Box
          key={index}
          onClick={() => handleCampaignClick(interaction.campaign)}
          role="button"
          tabIndex={0}
          sx={{
            p: 2,
            cursor: 'pointer',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.02)',
            },
            transition: 'all 0.2s ease-in-out',
            '&:active': {
              transform: 'scale(0.99)'
            },
            userSelect: 'none',
            outline: 'none',
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleCampaignClick(interaction.campaign);
            }
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              sx={{
                bgcolor: 'primary.dark',
                width: 40,
                height: 40
              }}
            >
              <CampaignIcon />
            </Avatar>

            <Box sx={{ flexGrow: 1 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" color="white">
                  Campanha {interaction.campaign}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: interaction.metric === 'Leads' ? 'success.main' : 'primary.main',
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1 
                  }}
                >
                  + {interaction.value} {interaction.metric}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Typography variant="caption" color="text.secondary">
                  {interaction.timestamp}
                </Typography>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">
                    {interaction.percentage}%
                  </Typography>
                </Box>
              </Stack>

              <LinearProgress 
                variant="determinate" 
                value={interaction.percentage} 
                sx={{
                  mt: 1,
                  height: 6,
                  borderRadius: 1,
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: interaction.metric === 'Leads' ? 'success.main' : 'primary.main',
                    borderRadius: 1
                  }
                }}
              />
            </Box>
          </Stack>
        </Box>
      ))}
    </Paper>
  );
};

export default InteractionHistory; 