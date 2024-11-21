import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box, 
  Paper,
  Stack,
  Button,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Chip,
  Divider,
  LinearProgress,
  Menu,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert
} from '@mui/material';
import MainCard from 'components/MainCard';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import { useNavigate } from 'react-router-dom';
import campaignData from 'mock/dashboard/campaignReport.json';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import DeleteIcon from '@mui/icons-material/Delete';

const CampaignCard = ({ campaign, onStatusChange, onDeleteRequest }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action) => (event) => {
    event.stopPropagation();
    switch(action) {
      case 'activate':
        onStatusChange(campaign.id, 'Ativa', 'Campanha ativada com sucesso');
        break;
      case 'pause':
        onStatusChange(campaign.id, 'Pausada', 'Campanha pausada com sucesso');
        break;
      case 'delete':
        onDeleteRequest({ open: true, campaign });
        break;
      default:
        break;
    }
    handleClose();
  };

  return (
    <Paper
      sx={{
        p: 2.5,
        cursor: 'pointer',
        bgcolor: '#1a2035',
        height: '100%',
        minHeight: 180,
        maxHeight: 200,
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
        '&:hover': {
          bgcolor: '#1e2745',
          transform: 'translateY(-4px)'
        },
        transition: 'all 0.3s ease-in-out',
        borderRadius: 2,
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}
      onClick={() => navigate(`/campaign/${campaign.id}`)}
      elevation={0}
    >
      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" color="white">
            Campanha #{campaign.id}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip 
              label={campaign.status} 
              size="small"
              color={campaign.status === 'Ativa' ? 'success' : 'warning'}
              sx={{ height: 24 }}
            />
            <IconButton
              size="small"
              onClick={handleClick}
              sx={{ 
                color: 'text.secondary',
                '&:hover': { color: 'white' }
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={(e) => e.stopPropagation()}
          PaperProps={{
            sx: {
              bgcolor: '#1a2035',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              '& .MuiMenuItem-root': {
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.05)'
                }
              }
            }
          }}
        >
          <MenuItem onClick={handleAction('activate')} disabled={campaign.status === 'Ativa'}>
            <ListItemIcon>
              <PlayArrowIcon fontSize="small" sx={{ color: 'success.main' }} />
            </ListItemIcon>
            <ListItemText>Ativar</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleAction('pause')} disabled={campaign.status === 'Pausada'}>
            <ListItemIcon>
              <PauseIcon fontSize="small" sx={{ color: 'warning.main' }} />
            </ListItemIcon>
            <ListItemText>Pausar</ListItemText>
          </MenuItem>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />
          <MenuItem onClick={handleAction('delete')}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" sx={{ color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText>Excluir</ListItemText>
          </MenuItem>
        </Menu>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Stack spacing={0.5}>
              <Typography variant="caption" color="text.secondary">
                Cliques
              </Typography>
              <Typography variant="h6" color="primary.main">
                {campaign.clicks}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack spacing={0.5}>
              <Typography variant="caption" color="text.secondary">
                CTR
              </Typography>
              <Typography variant="h6" color="white">
                {campaign.ctr}
              </Typography>
            </Stack>
          </Grid>
          {campaign.leads && (
            <Grid item xs={4}>
              <Stack spacing={0.5}>
                <Typography variant="caption" color="text.secondary">
                  Leads
                </Typography>
                <Typography variant="h6" color="success.main">
                  {campaign.leads}
                </Typography>
              </Stack>
            </Grid>
          )}
        </Grid>

        <Box>
          <Stack direction="row" justifyContent="space-between" mb={1}>
            <Typography variant="caption" color="text.secondary">
              Progresso da Campanha
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {campaign.progress}%
            </Typography>
          </Stack>
          <LinearProgress 
            variant="determinate" 
            value={campaign.progress || 0}
            sx={{
              height: 6,
              borderRadius: 1,
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              '& .MuiLinearProgress-bar': {
                bgcolor: 'primary.main',
                borderRadius: 1
              }
            }}
          />
        </Box>
      </Stack>
    </Paper>
  );
};

const NewCampaignDialog = ({ open, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    name: '',
    platform: '',
    budget: '',
    startDate: '',
    endDate: '',
    objective: '',
    description: '',
    audience: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpa o erro do campo quando ele é alterado
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.platform) newErrors.platform = 'Plataforma é obrigatória';
    if (!formData.budget.trim()) newErrors.budget = 'Orçamento é obrigatório';
    if (!formData.startDate) newErrors.startDate = 'Data de início é obrigatória';
    if (!formData.endDate) newErrors.endDate = 'Data de término é obrigatória';
    if (!formData.objective) newErrors.objective = 'Objetivo é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onCreate(formData);
      setFormData({
        name: '',
        platform: '',
        budget: '',
        startDate: '',
        endDate: '',
        objective: '',
        description: '',
        audience: ''
      });
      onClose();
    }
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      bgcolor: 'rgba(255, 255, 255, 0.05)',
      '&:hover': {
        '& > fieldset': {
          borderColor: 'primary.main'
        }
      }
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.7)',
      '&.Mui-focused': {
        color: 'primary.main'
      }
    },
    '& .MuiOutlinedInput-input': {
      color: 'white'
    },
    '& .MuiInputAdornment-root': {
      color: 'rgba(255, 255, 255, 0.7)'
    },
    '& .MuiFormLabel-root': {
      background: 'transparent'
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#1a2035',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))'
        }
      }}
    >
      <DialogTitle sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <AddIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h4" color="white">Nova Campanha</Typography>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ bgcolor: '#1a2035', p: 3 }}>
        <Grid container spacing={3} sx={{ mt: 0 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nome da Campanha"
              name="name"
              value={formData.name}
              onChange={handleChange}
              sx={inputStyles}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Plataforma
              </InputLabel>
              <Select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                label="Plataforma"
                sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main'
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'white'
                  }
                }}
              >
                <MenuItem value="google">Google Ads</MenuItem>
                <MenuItem value="meta">Meta Ads</MenuItem>
                <MenuItem value="linkedin">LinkedIn Ads</MenuItem>
                <MenuItem value="tiktok">TikTok Ads</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Orçamento"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
              }}
              sx={inputStyles}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Data de Início"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={inputStyles}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Data de Término"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              sx={inputStyles}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Objetivo
              </InputLabel>
              <Select
                name="objective"
                value={formData.objective}
                onChange={handleChange}
                label="Objetivo"
                sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main'
                  },
                  '& .MuiSvgIcon-root': {
                    color: 'white'
                  }
                }}
              >
                <MenuItem value="awareness">Reconhecimento de Marca</MenuItem>
                <MenuItem value="traffic">Tráfego</MenuItem>
                <MenuItem value="engagement">Engajamento</MenuItem>
                <MenuItem value="leads">Geração de Leads</MenuItem>
                <MenuItem value="sales">Vendas</MenuItem>
                <MenuItem value="app">Instalação de App</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descrição da Campanha"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              sx={inputStyles}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Público-alvo"
              name="audience"
              value={formData.audience}
              onChange={handleChange}
              multiline
              rows={2}
              sx={inputStyles}
            />
          </Grid>

          {Object.keys(errors).length > 0 && (
            <Grid item xs={12}>
              <Alert severity="error" sx={{ mt: 2 }}>
                Por favor, preencha todos os campos obrigatórios
              </Alert>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <DialogActions 
        sx={{ 
          bgcolor: '#1a2035', 
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          p: 3,
          gap: 2
        }}
      >
        <Button 
          onClick={onClose}
          variant="outlined"
          sx={{
            minWidth: '120px',
            height: '42px',
            color: 'text.secondary',
            borderColor: 'rgba(255, 255, 255, 0.15)',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            textTransform: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.25)',
              color: 'white'
            },
            '&:active': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
            transition: 'all 0.2s ease-in-out',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none'
            }
          }}
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            minWidth: '120px',
            height: '42px',
            bgcolor: 'primary.main',
            textTransform: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
            boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
            '&:hover': {
              bgcolor: 'primary.dark',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            },
            '&:active': {
              transform: 'translateY(1px)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }
          }}
        >
          Criar Campanha
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState(campaignData.recentCampaigns);
  const [searchTerm, setSearchTerm] = useState('');
  const [openNewCampaign, setOpenNewCampaign] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, campaign: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleStatusChange = (campaignId, newStatus, message) => {
    setCampaigns(prevCampaigns =>
      prevCampaigns.map(campaign =>
        campaign.id === campaignId ? { ...campaign, status: newStatus } : campaign
      )
    );
    setSnackbar({ open: true, message, severity: 'success' });
  };

  const handleDelete = (campaignId) => {
    setCampaigns(prevCampaigns =>
      prevCampaigns.filter(campaign => campaign.id !== campaignId)
    );
    setDeleteDialog({ open: false, campaign: null });
    setSnackbar({
      open: true,
      message: 'Campanha excluída com sucesso',
      severity: 'success'
    });
  };

  const handleCreateCampaign = (newCampaign) => {
    const campaignToAdd = {
      id: String(Math.floor(Math.random() * 1000000)).padStart(6, '0'),
      status: 'Ativa',
      clicks: '0',
      ctr: '0%',
      leads: '0',
      progress: 0,
      ...newCampaign
    };

    setCampaigns(prevCampaigns => [campaignToAdd, ...prevCampaigns]);
    setOpenNewCampaign(false);
    setSnackbar({
      open: true,
      message: 'Campanha criada com sucesso!',
      severity: 'success'
    });
  };

  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.id.toString().includes(searchTerm)
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <MainCard>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              justifyContent="space-between" 
              alignItems={{ xs: 'stretch', sm: 'center' }}
              spacing={2}
            >
              <Typography variant="h4">
                Campanhas
              </Typography>
              <Stack 
                direction={{
                  xs: 'column',
                  sm: 'row'
                }}
                spacing={2}
              >
                <TextField
                  variant="outlined"
                  placeholder="Pesquisar campanha..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => setOpenNewCampaign(true)}
                >
                  Nova Campanha
                </Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {filteredCampaigns.map((campaign) => (
                <Grid item xs={12} sm={6} md={4} key={campaign.id}>
                  <CampaignCard 
                    campaign={campaign} 
                    onStatusChange={handleStatusChange}
                    onDeleteRequest={setDeleteDialog}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
      <NewCampaignDialog 
        open={openNewCampaign} 
        onClose={() => setOpenNewCampaign(false)}
        onCreate={handleCreateCampaign}
      />
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, campaign: null })}
        PaperProps={{
          sx: {
            bgcolor: '#1a2035',
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))'
          }
        }}
      >
        <DialogTitle color="white">Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'text.secondary' }}>
            Tem certeza que deseja excluir a Campanha #{deleteDialog.campaign?.id}? 
            Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setDeleteDialog({ open: false, campaign: null })}
            color="primary"
          >
            Cancelar
          </Button>
          <Button 
            onClick={() => handleDelete(deleteDialog.campaign?.id)}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          severity={snackbar.severity === 'success' ? 'info' : snackbar.severity}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{
            '&.MuiAlert-standardInfo, &.MuiAlert-filledInfo': {
              bgcolor: 'primary.main'
            }
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CampaignsPage; 