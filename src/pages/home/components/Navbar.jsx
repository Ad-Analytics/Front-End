import { AppBar, Toolbar, Container, Box, Button, IconButton, Stack, Typography, Drawer, MenuItem, Divider } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useState } from 'react';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: 'calc(8px + 8px)',
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  backgroundColor: alpha(theme.palette.background.default, 0.4),
  boxShadow: theme.shadows[1],
  padding: '8px 12px',
}));

const NavButton = styled(Button)({
  color: '#94a3b8',
  fontSize: '14px',
  textTransform: 'none',
  '&:hover': {
    color: '#fff',
    background: 'transparent'
  }
});

const SignUpButton = styled(Button)({
  backgroundColor: '#2563eb',
  color: 'white',
  textTransform: 'none',
  padding: '6px 16px',
  borderRadius: '6px',
  fontSize: '14px',
  '&:hover': {
    backgroundColor: '#1d4ed8'
  }
});

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 2
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Box 
              component="img"
              src="src/assets/images/auth/logo.png"
              alt="AdAnalytics"
              sx={{ height: 24, mr: 1 }}
            />
            <Typography variant="h6" sx={{ fontSize: '16px', fontWeight: 500 }}>
              <Box component="span" sx={{ color: '#2563eb' }}>Ad</Box>
              <Box component="span" sx={{ color: '#fff' }}>Analytics</Box>
            </Typography>
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 3 }}>
              <NavButton>Recursos</NavButton>
              <NavButton>Depoimentos</NavButton>
              <NavButton>Destaques</NavButton>
              <NavButton>Preços</NavButton>
              <NavButton>Dúvidas</NavButton>
            </Box>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            <NavButton>Entrar</NavButton>
            <SignUpButton>Inscreva-se</SignUpButton>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={toggleDrawer(true)} sx={{ color: 'white' }}>
              <MenuIcon />
            </IconButton>
          </Box>
        </StyledToolbar>
      </Container>

      <Drawer
        anchor="top"
        open={open}
        onClose={toggleDrawer(false)}
      >
        <Box sx={{ p: 2, bgcolor: 'background.default' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>
          <MenuItem>Features</MenuItem>
          <MenuItem>Testimonials</MenuItem>
          <MenuItem>Highlights</MenuItem>
          <MenuItem>Pricing</MenuItem>
          <MenuItem>FAQ</MenuItem>
          <MenuItem>Blog</MenuItem>
          <Divider sx={{ my: 3 }} />
          <MenuItem>
            <Button color="primary" variant="contained" fullWidth>Sign up</Button>
          </MenuItem>
          <MenuItem>
            <Button color="primary" variant="outlined" fullWidth>Sign in</Button>
          </MenuItem>
        </Box>
      </Drawer>
    </AppBar>
  );
}
