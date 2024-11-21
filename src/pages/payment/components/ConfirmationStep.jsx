import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Divider
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ChatIcon from '@mui/icons-material/Chat';

const ConfirmationStep = ({ orderNumber }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
          <CheckCircleIcon color="success" sx={{ fontSize: 64, mb: 2 }} />
          <Typography variant="h4" gutterBottom align="center">
            Pagamento Confirmado!
          </Typography>
          
          <Stack spacing={2} sx={{ maxWidth: 500, textAlign: 'center', mb: 4 }}>
            <Typography variant="h6" color="text.secondary">
              Pedido #{orderNumber}
            </Typography>
            
            <Typography variant="subtitle2" color="success.main">
              Um e-mail de confirmação foi enviado para seu endereço cadastrado
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Você receberá em seu e-mail:
              • Comprovante de pagamento
              • Detalhes do plano contratado
              • Instruções de acesso
              • Contatos do suporte
            </Typography>

            <Typography variant="body2" color="primary">
              Verifique também sua caixa de spam
            </Typography>
          </Stack>

          <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 400, mb: 4 }}>
            Agradecemos sua compra! Você receberá um e-mail com os detalhes do pedido e instruções adicionais.
          </Typography>

          <Divider sx={{ width: '100%', my: 3 }} />

          <Box sx={{ mt: 3, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, width: '100%' }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <SupportAgentIcon />
              <Box>
                <Typography variant="subtitle1">Precisa de ajuda?</Typography>
                <Typography variant="body2" color="text.secondary">
                  Nosso suporte está disponível 24/7
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                startIcon={<ChatIcon />}
                onClick={() => navigate('/support')}
              >
                Falar com Suporte
              </Button>
            </Stack>
          </Box>

          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/dashboard')}
            >
              Voltar ao Início
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<ReceiptIcon />}
              onClick={() => navigate('/perfil/cobranca')}
            >
              Ver Pedido
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ConfirmationStep;