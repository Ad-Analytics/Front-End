import { Box, Container, Grid, Typography, Link, Stack, IconButton, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import styled from '@emotion/styled';

const FooterLink = styled(Link)({
  textDecoration: 'none',
  color: 'text.secondary',
  '&:hover': {
    color: 'primary.main',
    transition: 'color 0.2s ease-in-out'
  }
});

export default function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 8,
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  AdAnalytics
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Transformando dados em resultados para seu negócio com análises avançadas e insights em tempo real.
                </Typography>
              </Box>
              
              <Stack direction="row" spacing={2}>
                <IconButton color="inherit" size="small">
                  <GitHubIcon />
                </IconButton>
                <IconButton color="inherit" size="small">
                  <TwitterIcon />
                </IconButton>
                <IconButton color="inherit" size="small">
                  <LinkedInIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              <Grid item xs={6} sm={4}>
                <Stack spacing={3}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Produto
                  </Typography>
                  <Stack spacing={2}>
                    <FooterLink href="#">Recursos</FooterLink>
                    <FooterLink href="#">Preços</FooterLink>
                    <FooterLink href="#">Cases</FooterLink>
                    <FooterLink href="#">API</FooterLink>
                  </Stack>
                </Stack>
              </Grid>

              <Grid item xs={6} sm={4}>
                <Stack spacing={3}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Empresa
                  </Typography>
                  <Stack spacing={2}>
                    <FooterLink href="#">Sobre nós</FooterLink>
                    <FooterLink href="#">Blog</FooterLink>
                    <FooterLink href="#">Carreiras</FooterLink>
                    <FooterLink href="#">Contato</FooterLink>
                  </Stack>
                </Stack>
              </Grid>

              <Grid item xs={6} sm={4}>
                <Stack spacing={3}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Suporte
                  </Typography>
                  <Stack spacing={2}>
                    <FooterLink href="#">Documentação</FooterLink>
                    <FooterLink href="#">Guias</FooterLink>
                    <FooterLink href="#">Status</FooterLink>
                    <FooterLink href="#">FAQ</FooterLink>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6 }} />

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2
        }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 AdAnalytics. Todos os direitos reservados.
          </Typography>
          <Stack direction="row" spacing={3}>
            <FooterLink href="#" variant="body2">Privacidade</FooterLink>
            <FooterLink href="#" variant="body2">Termos</FooterLink>
            <FooterLink href="#" variant="body2">Cookies</FooterLink>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
