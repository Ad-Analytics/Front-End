import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const AnimatedButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  color: 'white',
  padding: '0 30px',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
    background: 'linear-gradient(45deg, #1976D2 30%, #00B8D4 90%)',
  }
}));

export default AnimatedButton;