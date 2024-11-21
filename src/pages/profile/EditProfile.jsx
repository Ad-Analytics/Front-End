import { useState } from 'react';
import {
  Box,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
  Button,
  Avatar,
  IconButton,
  Alert
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import MainCard from 'components/MainCard';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main
      }
    }
  }
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: theme.shadows[3],
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)'
  }
}));

export default function EditProfile() {
  const [formData, setFormData] = useState({
    nome: 'Lucas Costela',
    cargo: 'Assistente de Vendas',
    email: 'lucas.costela@adanalytics.com',
    telefone: '(11) 99999-9999',
    bio: 'Profissional dedicado com experiência em vendas e análise de dados.',
    linkedin: 'linkedin.com/in/lucascostela'
  });
  
  const [avatar, setAvatar] = useState('/avatarLucas.jpg');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('Perfil atualizado com sucesso!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <MainCard title="Editar Perfil">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Box position="relative">
              <StyledAvatar
                src={avatar}
              />
              <IconButton
                color="primary"
                component="label"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: 'background.paper'
                }}
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleAvatarChange}
                />
                <PhotoCamera />
              </IconButton>
            </Box>
          </Grid>

          {successMessage && (
            <Grid item xs={12}>
              <Alert severity="success">{successMessage}</Alert>
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography variant="subtitle2">Nome</Typography>
              <StyledTextField
                fullWidth
                name="nome"
                value={formData.nome}
                onChange={handleChange}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography variant="subtitle2">Cargo</Typography>
              <StyledTextField
                fullWidth
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography variant="subtitle2">Email</Typography>
              <StyledTextField
                fullWidth
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography variant="subtitle2">Telefone</Typography>
              <StyledTextField
                fullWidth
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <Typography variant="subtitle2">Biografia</Typography>
              <StyledTextField
                fullWidth
                multiline
                rows={4}
                name="bio"
                value={formData.bio}
                onChange={handleChange}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <Typography variant="subtitle2">LinkedIn</Typography>
              <StyledTextField
                fullWidth
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              type="submit"
              sx={{ minWidth: 120 }}
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
} 