// material-ui
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// ==============================|| FOOTER - AUTHENTICATION ||============================== //

export default function AuthFooter() {
  return (
    <Container maxWidth="xl">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'center', sm: 'space-between' }}
        spacing={2}
        textAlign={{ xs: 'center', sm: 'inherit' }}
      >
        <Typography variant="subtitle2" color="secondary">
          Este site é protegido pela{' '}
          <Typography component={Link} variant="subtitle2" href="#AdAnalytics-privacy" target="_blank" underline="hover">
            Política de Privacidade
          </Typography>
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 3 }} textAlign={{ xs: 'center', sm: 'inherit' }}>
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href="http://localhost:3000/termos-e-condicoes"
            target="_blank"
            underline="hover"
          >
            Termos e Condições
          </Typography>
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href="http://localhost:3000/politica-de-privacidade"
            target="_blank"
            underline="hover"
          >
            Política de Privacidade
          </Typography>
          <Typography
            variant="subtitle2"
            color="secondary"
            component={Link}
            href="http://localhost:3000/aviso-de-privacidade-da-ca"
            target="_blank"
            underline="hover"
          >
            Aviso de Privacidade da CA
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}
