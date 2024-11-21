import { useState } from 'react';
import {
  Box,
  Grid,
  Stack,
  TextField,
  FormControlLabel,
  Switch,
  IconButton,
  Typography,
  Paper
} from '@mui/material';
import {
  Language,
  LinkedIn,
  Twitter,
  Facebook,
  Instagram,
  ContentCopy
} from '@mui/icons-material';
import MainCard from 'components/MainCard';
import { styled } from '@mui/material/styles';

const StyledSocialBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(145deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)'
    : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(241, 245, 249, 0.9) 100%)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${theme.palette.divider}`,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10]
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(0, 0, 0, 0.2)'
      : 'rgba(255, 255, 255, 0.9)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main
      }
    }
  }
}));

const SocialIcon = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  backgroundColor: theme.palette.mode === 'dark'
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(0, 0, 0, 0.03)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    '& .MuiSvgIcon-root': {
      color: theme.palette.common.white
    }
  }
}));

export default function SocialProfile() {
  const [socialLinks, setSocialLinks] = useState({
    website: 'adanalytics.com/lucas.costela',
    linkedin: 'linkedin.com/in/lucascostela',
    twitter: 'twitter.com/lucascostela',
    facebook: 'facebook.com/lucascostela',
    instagram: 'instagram.com/lucascostela'
  });

  const [visibility, setVisibility] = useState({
    website: true,
    linkedin: true,
    twitter: false,
    facebook: false,
    instagram: true
  });

  const handleLinkChange = (network) => (event) => {
    setSocialLinks({
      ...socialLinks,
      [network]: event.target.value
    });
  };

  const handleVisibilityChange = (network) => (event) => {
    setVisibility({
      ...visibility,
      [network]: event.target.checked
    });
  };

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <MainCard title="Perfil Social">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={3}>
            {Object.entries(socialLinks).map(([network, value]) => (
              <StyledSocialBox key={network} elevation={0}>
                <Stack spacing={2}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <SocialIcon>
                      {network === 'website' && <Language color="primary" />}
                      {network === 'linkedin' && <LinkedIn color="primary" />}
                      {network === 'twitter' && <Twitter color="primary" />}
                      {network === 'facebook' && <Facebook color="primary" />}
                      {network === 'instagram' && <Instagram color="primary" />}
                    </SocialIcon>
                    <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                      {network}
                    </Typography>
                  </Stack>
                  
                  <Stack direction="row" spacing={2} alignItems="center">
                    <StyledTextField
                      fullWidth
                      size="small"
                      value={value}
                      onChange={handleLinkChange(network)}
                      InputProps={{
                        endAdornment: (
                          <IconButton 
                            size="small" 
                            onClick={() => handleCopy(value)}
                            sx={{ '&:hover': { color: 'primary.main' } }}
                          >
                            <ContentCopy fontSize="small" />
                          </IconButton>
                        )
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={visibility[network]}
                          onChange={handleVisibilityChange(network)}
                          color="primary"
                        />
                      }
                      label="Visível"
                      sx={{ minWidth: 100 }}
                    />
                  </Stack>
                </Stack>
              </StyledSocialBox>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
} 