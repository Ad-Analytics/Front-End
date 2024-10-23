import React, { useState, useRef, useEffect } from 'react';
import { TextField, Typography, Paper, Grid, IconButton, Box, Fade, Zoom, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Avatar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import logoImage from 'assets/images/auth/logo.png';

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const DarkPaper = styled(Paper)({
  backgroundColor: '#000000',
  color: '#a9b1d6',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
});

const Logo = styled('div')({
  width: '50px',
  height: '54px',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '1rem auto',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
  '& img': {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
    filter: 'brightness(0) saturate(100%) invert(67%) sepia(29%) saturate(1080%) hue-rotate(189deg) brightness(100%) contrast(96%)'
  }
});

const SuggestionBox = styled(Paper)({
  backgroundColor: '#24283b',
  color: '#a9b1d6',
  padding: '1rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#414868',
    transform: 'translateY(-2px)',
  },
});

const InputContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 'auto',
  padding: '1rem',
  position: 'sticky',
  bottom: 0,
  zIndex: 1,
});

const MessageContainer = styled(Box)({
  display: 'flex',
  padding: '0.5rem 1rem',
  marginBottom: '0.5rem',
});

const MessageContent = styled(Typography)(({ isUser }) => ({
  maxWidth: '80%',
  padding: '0.75rem 1rem',
  borderRadius: '1rem',
  backgroundColor: isUser ? '#7aa2f7' : '#24283b',
  color: isUser ? '#1a1b26' : '#a9b1d6',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
}));

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#414868',
    },
    '&:hover fieldset': {
      borderColor: '#7aa2f7',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#7aa2f7',
    },
  },
});

const SideMenu = styled(Drawer)({
  '& .MuiDrawer-paper': {
    backgroundColor: '#1f2335',
    color: '#a9b1d6',
    width: 260,
    padding: '1rem 0',
    display: 'flex',
    flexDirection: 'column',
  },
});

const MenuHeader = styled(Typography)({
  padding: '1rem',
  fontWeight: 'bold',
  borderBottom: '1px solid #414868',
  color: '#7aa2f7',
});

const StyledListItem = styled(ListItem)({
  margin: '0.5rem 0',
  borderRadius: '0.5rem',
  '&:hover': {
    backgroundColor: '#292e42',
  },
});

const MenuFooter = styled(Box)({
  marginTop: 'auto',
  borderTop: '1px solid #414868',
  padding: '1rem',
});

const UserInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '0.5rem',
  borderRadius: '0.5rem',
  backgroundColor: '#292e42',
});

export default function AdAnalyticsDashboard() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [leftMenuOpen, setLeftMenuOpen] = useState(false);
  const [rightMenuOpen, setRightMenuOpen] = useState(false);
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestions = [
    { title: 'Análise de gráficos de vendas', subtitle: 'Tendências dos últimos 6 meses' },
    { title: 'Dashboard de desempenho', subtitle: 'KPIs principais da empresa' },
    { title: 'Métricas de engajamento', subtitle: 'Análise de interações nas redes sociais' },
    { title: 'Previsão de receita', subtitle: 'Projeções para o próximo trimestre' },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    setMessages(prev => [...prev, { text: input, isUser: true }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('https://api.lucascossitt.site/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: input,
          context: messages.map(msg => ({
            role: msg.isUser ? 'user' : 'assistant',
            content: msg.text
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Erro na comunicação com o servidor');
      }

      const data = await response.json();
      
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        text: data.response || data.message,
        isUser: false 
      }]);

    } catch (error) {
      console.error('Erro:', error);
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.',
        isUser: false 
      }]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const toggleLeftMenu = () => {
    setLeftMenuOpen(!leftMenuOpen);
  };

  const toggleRightMenu = () => {
    setRightMenuOpen(!rightMenuOpen);
  };

  const handleInfoClick = () => {
    setInfoDialogOpen(true);
  };

  const handleInfoClose = () => {
    setInfoDialogOpen(false);
  };

  return (
    <DarkPaper>
      <Box display="flex" justifyContent="space-between" alignItems="center" padding="1rem">
        <IconButton onClick={toggleLeftMenu} style={{ color: '#7aa2f7' }}>
        </IconButton>
        <Typography variant="h5" style={{ color: '#7aa2f7' }}>
          Ad Analytics
        </Typography>
        <IconButton onClick={toggleRightMenu} style={{ color: '#7aa2f7' }}>
        </IconButton>
      </Box>
      <Logo>
        <img src={logoImage} alt="Logo" />
      </Logo>
      {messages.length === 0 ? (
        <Grid container spacing={2} style={{ padding: '1rem', marginBottom: '5rem' }}>
          {suggestions.map((suggestion, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                <SuggestionBox onClick={() => handleSuggestionClick(suggestion.title)}>
                  <Typography variant="subtitle1" style={{ color: '#7aa2f7' }}>{suggestion.title}</Typography>
                  <Typography variant="body2" style={{ color: '#787c99' }}>{suggestion.subtitle}</Typography>
                </SuggestionBox>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box style={{ marginBottom: '5rem', overflowY: 'auto', padding: '0 1rem' }}>
          {messages.map((message, index) => (
            <Fade in={true} key={index}>
              <MessageContainer style={{ justifyContent: message.isUser ? 'flex-end' : 'flex-start' }}>
                {!message.isUser && (
                  <ChatBubbleOutlineIcon style={{ marginRight: '0.5rem', color: '#7aa2f7' }} />
                )}
                <MessageContent variant="body1" isUser={message.isUser}>
                  {message.text}
                </MessageContent>
                {message.isUser && (
                  <PersonOutlineIcon style={{ marginLeft: '0.5rem', color: '#7aa2f7' }} />
                )}
              </MessageContainer>
            </Fade>
          ))}
          {isTyping && (
            <Fade in={true}>
              <MessageContainer>
                <ChatBubbleOutlineIcon style={{ marginRight: '0.5rem', color: '#7aa2f7' }} />
                <MessageContent variant="body1" isUser={false} style={{ animation: `${pulseAnimation} 1s infinite` }}>
                  Ad Analytics está processando...
                </MessageContent>
              </MessageContainer>
            </Fade>
          )}
          <div ref={messagesEndRef} />
        </Box>
      )}
      <InputContainer>
        <StyledTextField
          fullWidth
          variant="outlined"
          placeholder="Faça uma pergunta sobre os dados da sua empresa"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          InputProps={{
            style: { color: '#a9b1d6', backgroundColor: '#24283b' },
            endAdornment: (
              <IconButton onClick={handleSendMessage} style={{ color: '#7aa2f7' }}>
                <SendIcon />
              </IconButton>
            ),
          }}
        />
        <IconButton 
          onClick={scrollToTop} 
          style={{ 
            color: '#7aa2f7', 
            position: 'absolute', 
            right: '2rem', 
            bottom: '5rem',
            backgroundColor: '#24283b',
            '&:hover': {
              backgroundColor: '#414868',
            },
          }}
        >
          <ArrowUpwardIcon />
        </IconButton>
      </InputContainer>

      {/* Menu Lateral Esquerdo */}
      <SideMenu
        anchor="left"
        open={leftMenuOpen}
        onClose={toggleLeftMenu}
      >
        <MenuHeader variant="h6">Ad Analytics</MenuHeader>
        <List>
          <StyledListItem button onClick={() => {setMessages([]); toggleLeftMenu();}}>
            <ListItemIcon><AddIcon style={{ color: '#7aa2f7' }} /></ListItemIcon>
            <ListItemText primary="Nova análise" />
          </StyledListItem>
          <Divider style={{ backgroundColor: '#414868', margin: '0.5rem 0' }} />
          <StyledListItem button>
            <ListItemIcon><HistoryIcon style={{ color: '#7aa2f7' }} /></ListItemIcon>
            <ListItemText primary="Histórico de análises" />
          </StyledListItem>
          <StyledListItem button>
            <ListItemIcon><DeleteIcon style={{ color: '#7aa2f7' }} /></ListItemIcon>
            <ListItemText primary="Limpar análises" />
          </StyledListItem>
        </List>
        <MenuFooter>
          <UserInfo>
            <Avatar src="/placeholder.svg" alt="User" style={{ marginRight: '0.5rem' }} />
            <Box>
              <Typography variant="subtitle2" style={{ color: '#7aa2f7' }}>Usuário</Typography>
              <Typography variant="caption" style={{ color: '#787c99' }}>usuario@empresa.com</Typography>
            </Box>
          </UserInfo>
          <StyledListItem button>
            <ListItemIcon><LogoutIcon style={{ color: '#7aa2f7' }} /></ListItemIcon>
            <ListItemText primary="Sair" />
          </StyledListItem>
        </MenuFooter>
      </SideMenu>
      
      {/* Diálogo de Informações */}
      <Dialog
        open={infoDialogOpen}
        onClose={handleInfoClose}
        PaperProps={{
          style: {
            backgroundColor: '#1f2335',
            color: '#a9b1d6',
          },
        }}
      >
        <DialogTitle style={{ color: '#7aa2f7' }}>Sobre o Ad Analytics</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: '#a9b1d6' }}>
            Ad Analytics é uma ferramenta avançada de análise de dados que utiliza inteligência artificial para fornecer insights valiosos sobre o desempenho da sua empresa. Com recursos de processamento de linguagem natural, o Ad Analytics pode interpretar suas perguntas e fornecer análises detalhadas, visualizações de dados e recomendações estratégicas baseadas nas métricas e KPIs da sua empresa.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInfoClose} style={{ color: '#7aa2f7' }}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </DarkPaper>
  );
}
