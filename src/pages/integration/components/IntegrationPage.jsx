import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Alert,
  Stack,
  Divider,
  Switch,
  FormControlLabel,
  IconButton,
  Tooltip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Badge,
  Collapse,
  Fade
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { 
  HelpOutline as HelpIcon,
  ContentCopy as ContentCopyIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import MainCard from 'components/MainCard';
import IntegrationGuide from './IntegrationGuide';

const IntegrationPage = () => {
  const [tokens, setTokens] = useState({
    googleAds: '',
    metaAds: ''
  });
  
  const [integrationStatus, setIntegrationStatus] = useState({
    googleAds: true,
    metaAds: false
  });

  const [tokenErrors, setTokenErrors] = useState({
    googleAds: '',
    metaAds: ''
  });

  const [alerts, setAlerts] = useState({
    success: '',
    error: ''
  });

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    platform: ''
  });

  const [connectionStatus, setConnectionStatus] = useState({
    googleAds: 'disconnected',
    metaAds: 'disconnected'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState({
    googleAds: false,
    metaAds: false
  });

  const [integrationHistory, setIntegrationHistory] = useState([]);
  const [showGuide, setShowGuide] = useState(null);
  const [copied, setCopied] = useState(false);

  const validateToken = (platform, value) => {
    if (platform === 'googleAds') {
      const googleAdsFormat = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
      return googleAdsFormat.test(value) ? '' : 'Token do Google Ads inválido. Use o formato: XXXX-XXXX-XXXX-XXXX';
    }
    if (platform === 'metaAds') {
      const metaAdsFormat = /^EAA[A-Za-z0-9]{140,200}$/;
      return metaAdsFormat.test(value) 
        ? '' 
        : 'Token do Meta Ads inválido. Deve começar com EAA e ter entre 140 e 200 caracteres';
    }
    return '';
  };

  const handleTokenChange = (platform) => (event) => {
    const value = event.target.value;
    setTokens(prev => ({
      ...prev,
      [platform]: value
    }));
    setTokenErrors(prev => ({
      ...prev,
      [platform]: validateToken(platform, value)
    }));
  };

  const handleCopyToken = async (token) => {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erro ao copiar token:', err);
    }
  };

  const handleStatusChange = (platform) => (event) => {
    if (event.target.checked === false) {
      setConfirmDialog({
        open: true,
        platform
      });
    } else {
      setIntegrationStatus(prev => ({
        ...prev,
        [platform]: true
      }));
    }
  };

  const handleDeactivateIntegration = (platform) => {
    const platformName = platform === 'googleAds' ? 'Google Ads' : 'Meta Ads';
    const now = new Date().toLocaleString();

    setIntegrationHistory(prev => [{
      platform: platformName,
      date: now,
      status: 'disconnected',
      action: 'Desativado'
    }, ...prev]);

    setIntegrationStatus(prev => ({
      ...prev,
      [platform]: false
    }));

    setConnectionStatus(prev => ({
      ...prev,
      [platform]: 'disconnected'
    }));

    setTokens(prev => ({
      ...prev,
      [platform]: ''
    }));

    setConfirmDialog({ open: false, platform: '' });

    setAlerts({
      success: `Integração com ${platformName} desativada com sucesso`,
      error: ''
    });
  };

  const handleTestConnection = async (platform) => {
    setIsTestingConnection(prev => ({ ...prev, [platform]: true }));
    try {
      // Simular teste de conexão
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const isValid = !tokenErrors[platform];
      const now = new Date().toLocaleString();
      
      setConnectionStatus(prev => ({
        ...prev,
        [platform]: isValid ? 'connected' : 'error'
      }));

      setIntegrationHistory(prev => [{
        platform: platform === 'googleAds' ? 'Google Ads' : 'Meta Ads',
        date: now,
        status: isValid ? 'success' : 'error',
        action: 'Teste de Conexão'
      }, ...prev]);

      setAlerts({
        success: isValid ? 'Conexão testada com sucesso!' : '',
        error: !isValid ? 'Falha no teste de conexão. Verifique o token.' : ''
      });
    } catch (error) {
      setAlerts({
        success: '',
        error: 'Erro ao testar conexão. Tente novamente.'
      });
    } finally {
      setIsTestingConnection(prev => ({ ...prev, [platform]: false }));
    }
  };

  const handleSaveTokens = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const now = new Date().toLocaleString();
      const newHistoryEntries = [];

      if (integrationStatus.googleAds) {
        newHistoryEntries.push({
          platform: 'Google Ads',
          date: now,
          status: tokenErrors.googleAds ? 'error' : 'success',
          action: 'Atualização'
        });
      }

      if (integrationStatus.metaAds) {
        newHistoryEntries.push({
          platform: 'Meta Ads',
          date: now,
          status: tokenErrors.metaAds ? 'error' : 'success',
          action: 'Atualização'
        });
      }

      setIntegrationHistory(prev => [...newHistoryEntries, ...prev]);
      
      setConnectionStatus(prev => ({
        googleAds: integrationStatus.googleAds 
          ? (tokenErrors.googleAds ? 'error' : 'connected') 
          : 'disconnected',
        metaAds: integrationStatus.metaAds 
          ? (tokenErrors.metaAds ? 'error' : 'connected') 
          : 'disconnected'
      }));

      setAlerts({
        success: 'Tokens salvos com sucesso!',
        error: ''
      });
    } catch (error) {
      setAlerts({
        success: '',
        error: 'Erro ao salvar os tokens. Tente novamente.'
      });
    } finally {
      setIsSaving(false);
    }
  };

  const renderIntegrationSection = (platform, title) => (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h4" gutterBottom>
            {title}
          </Typography>
          <Tooltip title="Ver guia de integração">
            <IconButton 
              size="small" 
              onClick={() => setShowGuide(platform)}
              sx={{ ml: 1 }}
            >
              <HelpIcon sx={{ color: 'primary.main' }} />
            </IconButton>
          </Tooltip>
          <Badge
            variant="dot"
            color={
              connectionStatus[platform] === 'connected' 
                ? 'success' 
                : connectionStatus[platform] === 'error' 
                  ? 'error' 
                  : 'default'
            }
            sx={{ ml: 1 }}
          />
        </Stack>
        <FormControlLabel
          control={
            <Switch
              checked={integrationStatus[platform]}
              onChange={handleStatusChange(platform)}
              color="primary"
            />
          }
          label={integrationStatus[platform] ? "Ativo" : "Inativo"}
          sx={{
            '& .MuiFormControlLabel-label': {
              color: integrationStatus[platform] ? '#fff' : 'text.secondary'
            }
          }}
        />
      </Stack>
      <Typography variant="body1" color="text.secondary" paragraph>
        Conecte sua conta do {title} para análise de campanhas
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label={`Token do ${title}`}
          value={tokens[platform]}
          onChange={handleTokenChange(platform)}
          error={!!tokenErrors[platform]}
          helperText={tokenErrors[platform]}
          variant="outlined"
          disabled={!integrationStatus[platform]}
          placeholder={platform === 'googleAds' ? 'XXXX-XXXX-XXXX-XXXX' : 'EAAxxxxxxxx...'}
          InputProps={{
            endAdornment: tokens[platform] && (
              <Tooltip title={copied ? "Copiado!" : "Copiar token"}>
                <IconButton
                  edge="end"
                  onClick={() => handleCopyToken(tokens[platform])}
                  size="small"
                >
                  {copied ? <CheckIcon color="success" /> : <ContentCopyIcon />}
                </IconButton>
              </Tooltip>
            )
          }}
        />
        <LoadingButton
          variant="contained"
          color="primary"
          size="small"
          loading={isTestingConnection[platform]}
          disabled={!integrationStatus[platform] || !!tokenErrors[platform]}
          onClick={() => handleTestConnection(platform)}
          sx={{ 
            minWidth: '120px',
            height: '40px',
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none'
            }
          }}
        >
          Testar Conexão
        </LoadingButton>
      </Stack>
    </Box>
  );

  const renderHistory = () => (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Histórico de Integrações
      </Typography>
      {integrationHistory.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Plataforma</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {integrationHistory.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.platform}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    <Chip
                      label={
                        row.status === 'success' ? 'Sucesso' : 
                        row.status === 'error' ? 'Erro' : 
                        'Desativado'
                      }
                      color={
                        row.status === 'success' ? 'success' : 
                        row.status === 'error' ? 'error' : 
                        'default'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{row.action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Fade in={true}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="textSecondary">
              Nenhuma integração salva ainda. Salve uma integração para ver o histórico.
            </Typography>
          </Paper>
        </Fade>
      )}
    </Box>
  );

  return (
    <Container>
      <Stack spacing={3}>
        <Typography variant="h2">Integração de Plataformas</Typography>
        
        <MainCard>
          <Stack spacing={4}>
            {renderIntegrationSection('googleAds', 'Google Ads')}
            <Divider />
            {renderIntegrationSection('metaAds', 'Meta Ads')}

            <Collapse in={!!alerts.success || !!alerts.error}>
              <Box sx={{ mt: 2 }}>
                {alerts.success && (
                  <Alert 
                    severity="success" 
                    onClose={() => setAlerts(prev => ({ ...prev, success: '' }))}
                  >
                    {alerts.success}
                  </Alert>
                )}
                {alerts.error && (
                  <Alert 
                    severity="error" 
                    onClose={() => setAlerts(prev => ({ ...prev, error: '' }))}
                  >
                    {alerts.error}
                  </Alert>
                )}
              </Box>
            </Collapse>

            <LoadingButton
              loading={isSaving}
              variant="contained"
              color="primary"
              size="small"
              onClick={handleSaveTokens}
              disabled={!integrationStatus.googleAds && !integrationStatus.metaAds}
              sx={{ 
                minWidth: '120px',
                height: '40px',
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none'
                }
              }}
            >
              Salvar Integrações
            </LoadingButton>

            {renderHistory()}
          </Stack>
        </MainCard>
      </Stack>

      {/* Dialog de Confirmação */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, platform: '' })}
      >
        <DialogTitle>Confirmar Desativação</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja desativar a integração com {
              confirmDialog.platform === 'googleAds' ? 'Google Ads' : 'Meta Ads'
            }? 
            Isso irá interromper a coleta de dados da plataforma.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <LoadingButton 
            onClick={() => setConfirmDialog({ open: false, platform: '' })}
            variant="contained"
            color="primary"
            size="small"
            sx={{ 
              minWidth: '120px',
              height: '40px',
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none'
              }
            }}
          >
            Cancelar
          </LoadingButton>
          <LoadingButton 
            onClick={() => handleDeactivateIntegration(confirmDialog.platform)}
            variant="contained"
            color="error"
            size="small"
            sx={{ 
              minWidth: '120px',
              height: '40px',
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none'
              }
            }}
          >
            Desativar
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {/* Dialog do Guia de Integração */}
      <Dialog
        open={!!showGuide}
        onClose={() => setShowGuide(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Guia de Integração - {showGuide === 'googleAds' ? 'Google Ads' : 'Meta Ads'}
        </DialogTitle>
        <DialogContent>
          {showGuide && <IntegrationGuide platform={showGuide} />}
        </DialogContent>
        <DialogActions>
          <LoadingButton
            onClick={() => setShowGuide(null)}
            variant="contained"
            color="primary"
            size="small"
            sx={{ 
              minWidth: '120px',
              height: '40px',
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none'
              }
            }}
          >
            Fechar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default IntegrationPage; 