import { Box, Container, Grid, Typography, Link, Stack } from '@mui/material';

export default function Footer() {
  return (
    <Box sx={{ py: 6, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              AdAnalytics
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Transformando dados em resultados para seu negócio
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4}>
                <Stack spacing={2}>
                  <Typography variant="subtitle1">Produto</Typography>
                  <Link href="#" color="text.secondary">Recursos</Link>
                  <Link href="#" color="text.secondary">Preços</Link>
                  <Link href="#" color="text.secondary">Cases</Link>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack spacing={2}>
                  <Typography variant="subtitle1">Empresa</Typography>
                  <Link href="#" color="text.secondary">Sobre nós</Link>
                  <Link href="#" color="text.secondary">Blog</Link>
                  <Link href="#" color="text.secondary">Carreiras</Link>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Stack spacing={2}>
                  <Typography variant="subtitle1">Suporte</Typography>
                  <Link href="#" color="text.secondary">Ajuda</Link>
                  <Link href="#" color="text.secondary">Contato</Link>
                  <Link href="#" color="text.secondary">Status</Link>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ mt: 8, pt: 4, borderTop: 1, borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 AdAnalytics. Todos os direitos reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
