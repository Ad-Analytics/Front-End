import React, { useState, useRef } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  Avatar,
  Divider,
  Paper,
  IconButton,
  Tooltip,
  Chip,
  LinearProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MainCard from '../../components/MainCard';
import avatarLucas from '../../assets/images/users/avatar-lucas.jpg';

const SupportPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'support',
      message: 'Olá! Como posso ajudar você hoje?',
      timestamp: new Date().toLocaleTimeString(),
      isTyping: false
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Simular upload
      setUploading(true);
      setAttachment({
        name: file.name,
        size: (file.size / 1024).toFixed(2), // Converter para KB
        type: file.type
      });

      setTimeout(() => {
        setUploading(false);
      }, 1500);
    }
  };

  const handleRemoveAttachment = () => {
    setAttachment(null);
    fileInputRef.current.value = '';
  };

  const handleSendMessage = () => {
    if (newMessage.trim() || attachment) {
      const userMessage = {
        id: messages.length + 1,
        sender: 'user',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString(),
        attachment: attachment
      };

      setMessages([...messages, userMessage]);
      setNewMessage('');
      setAttachment(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

      // Simular "digitando..."
      const typingMessage = {
        id: messages.length + 2,
        sender: 'support',
        isTyping: true
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, typingMessage]);
        scrollToBottom();
      }, 500);

      // Simular resposta do suporte
      setTimeout(() => {
        setMessages(prev => {
          const filtered = prev.filter(msg => !msg.isTyping);
          return [...filtered, {
            id: messages.length + 2,
            sender: 'support',
            message: 'Entendi sua dúvida. Um momento enquanto analiso seu caso...',
            timestamp: new Date().toLocaleTimeString()
          }];
        });
        scrollToBottom();
      }, 2000);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <MainCard
        sx={{
          bgcolor: '#0A1929', // Azul escuro de fundo
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          '& .MuiCardContent-root': {
            bgcolor: '#0A1929'
          }
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" spacing={2} mb={3}>
              <Avatar
                src={avatarLucas}
                sx={{ 
                  width: 48, 
                  height: 48,
                  border: '2px solid',
                  borderColor: '#2196f3'
                }}
              />
              <Box>
                <Typography variant="h5" color="white" gutterBottom>
                  Central de Suporte
                </Typography>
                <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
                  Atendimento 24/7 • Tempo médio de resposta: 5 minutos
                </Typography>
              </Box>
            </Stack>
            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
          </Grid>

          <Grid item xs={12}>
            <Paper 
              ref={chatContainerRef}
              sx={{ 
                height: '60vh', 
                bgcolor: '#0A0E17', // Alterado para um tom de preto
                p: 2,
                overflowY: 'auto',
                border: '1px solid rgba(255, 255, 255, 0.05)', // Adicionada borda sutil
                borderRadius: 2,
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                },
                '&::-webkit-scrollbar-thumb': {
                  bgcolor: 'rgba(33, 150, 243, 0.3)',
                  borderRadius: '4px',
                  '&:hover': {
                    bgcolor: 'rgba(33, 150, 243, 0.5)',
                  }
                }
              }}
            >
              <Stack spacing={2}>
                {messages.map((msg) => (
                  <Box
                    key={msg.id}
                    sx={{
                      display: 'flex',
                      justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      mb: 2
                    }}
                  >
                    {msg.sender === 'support' && (
                      <Avatar
                        src={avatarLucas}
                        sx={{ 
                          mr: 2, 
                          width: 40, 
                          height: 40,
                          opacity: msg.isTyping ? 0.7 : 1,
                          border: '2px solid rgba(33, 150, 243, 0.3)' // Borda sutil no avatar
                        }}
                      />
                    )}
                    <Box
                      sx={{
                        maxWidth: '70%',
                        bgcolor: msg.sender === 'user' ? '#2196f3' : 'rgba(255, 255, 255, 0.05)',
                        borderRadius: 2,
                        p: 2,
                        position: 'relative',
                        boxShadow: msg.sender === 'user' 
                          ? '0 2px 8px rgba(33, 150, 243, 0.2)' 
                          : '0 2px 8px rgba(0, 0, 0, 0.2)' // Sombra sutil nas mensagens
                      }}
                    >
                      {msg.isTyping ? (
                        <Box sx={{ width: 60 }}>
                          <LinearProgress 
                            sx={{
                              bgcolor: 'rgba(255, 255, 255, 0.1)',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: '#2196f3'
                              }
                            }}
                          />
                        </Box>
                      ) : (
                        <>
                          <Typography color="white">
                            {msg.message}
                          </Typography>
                          
                          {msg.attachment && (
                            <Box 
                              sx={{ 
                                mt: 1,
                                p: 1,
                                bgcolor: 'rgba(0, 0, 0, 0.2)',
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                              }}
                            >
                              {msg.attachment.type.includes('image') ? (
                                <ImageIcon sx={{ color: 'white' }} />
                              ) : (
                                <PictureAsPdfIcon sx={{ color: 'white' }} />
                              )}
                              <Typography variant="caption" color="white">
                                {msg.attachment.name} ({msg.attachment.size}KB)
                              </Typography>
                            </Box>
                          )}
                          
                          <Typography 
                            variant="caption" 
                            color="rgba(255, 255, 255, 0.7)"
                            sx={{ display: 'block', mt: 1 }}
                          >
                            {msg.timestamp}
                          </Typography>
                        </>
                      )}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            {uploading && (
              <Box sx={{ width: '100%', mb: 2 }}>
                <LinearProgress 
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#2196f3'
                    }
                  }}
                />
              </Box>
            )}
            
            {attachment && !uploading && (
              <Box sx={{ mb: 2 }}>
                <Chip
                  icon={attachment.type.includes('image') ? <ImageIcon /> : <PictureAsPdfIcon />}
                  label={`${attachment.name} (${attachment.size}KB)`}
                  onDelete={handleRemoveAttachment}
                  deleteIcon={<DeleteOutlineIcon />}
                  variant="outlined"
                  sx={{
                    color: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    '& .MuiChip-icon': {
                      color: '#2196f3'
                    },
                    '& .MuiChip-deleteIcon': {
                      color: 'rgba(255, 255, 255, 0.7)',
                      '&:hover': {
                        color: '#f44336'
                      }
                    }
                  }}
                />
              </Box>
            )}
            
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                style={{ display: 'none' }}
                accept="image/*,.pdf,.doc,.docx"
              />
              
              <Tooltip title="Anexar arquivo">
                <IconButton 
                  onClick={() => fileInputRef.current.click()}
                  sx={{ 
                    color: '#2196f3',
                    '&:hover': {
                      bgcolor: 'rgba(33, 150, 243, 0.1)'
                    }
                  }}
                >
                  <AttachFileIcon />
                </IconButton>
              </Tooltip>

              <TextField
                fullWidth
                variant="outlined"
                placeholder="Digite sua mensagem..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'white',
                    borderRadius: '12px',
                    bgcolor: 'rgba(255, 255, 255, 0.05)',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.1)'
                    },
                    '&:hover fieldset': {
                      borderColor: '#2196f3'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2196f3'
                    }
                  }
                }}
              />
              
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSendMessage}
                disabled={!newMessage.trim() && !attachment}
                sx={{
                  borderRadius: '12px',
                  px: 3,
                  py: 1,
                  textTransform: 'none',
                  bgcolor: '#2196f3',
                  '&:hover': {
                    bgcolor: '#1976d2'
                  },
                  '&.Mui-disabled': {
                    bgcolor: 'rgba(33, 150, 243, 0.3)'
                  }
                }}
              >
                Enviar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </MainCard>
    </Container>
  );
};

export default SupportPage; 