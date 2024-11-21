import { Grid, Stack, Typography, Box, Link, Divider, Paper } from '@mui/material';
import { Email, Phone, LinkedIn } from '@mui/icons-material';
import MainCard from 'components/MainCard';
import ProfileCard from './components/ProfileCard';
import { styled } from '@mui/material/styles';

const StyledInfoBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[50],
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[100],
    transform: 'translateY(-2px)'
  }
}));

export default function ViewProfile() {
  const profileData = {
    nome: 'Lucas Costela',
    cargo: 'Assistente de Vendas',
    email: 'lucas.costela@adanalytics.com',
    telefone: '(11) 99999-9999',
    bio: 'Profissional dedicado com experiência em vendas e análise de dados.',
    linkedin: 'linkedin.com/in/lucascostela',
    avatar: '/avatarLucas.jpg'
  };

  return (
    <MainCard title="Perfil">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ProfileCard user={profileData} />
          <Paper sx={{ mt: 3, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Biografia
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {profileData.bio}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <StyledInfoBox>
              <Stack spacing={2}>
                <Typography variant="h6">Informações de Contato</Typography>
                <Divider />
                <Box display="flex" alignItems="center" gap={1}>
                  <Email color="primary" />
                  <Stack>
                    <Typography variant="subtitle2">Email</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {profileData.email}
                    </Typography>
                  </Stack>
                </Box>
                
                <Box display="flex" alignItems="center" gap={1}>
                  <Phone color="primary" />
                  <Stack>
                    <Typography variant="subtitle2">Telefone</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {profileData.telefone}
                    </Typography>
                  </Stack>
                </Box>
                
                <Box display="flex" alignItems="center" gap={1}>
                  <LinkedIn color="primary" />
                  <Stack>
                    <Typography variant="subtitle2">LinkedIn</Typography>
                    <Link 
                      href={`https://${profileData.linkedin}`} 
                      target="_blank"
                      sx={{ 
                        color: 'text.secondary',
                        '&:hover': { color: 'primary.main' }
                      }}
                    >
                      {profileData.linkedin}
                    </Link>
                  </Stack>
                </Box>
              </Stack>
            </StyledInfoBox>
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
} 