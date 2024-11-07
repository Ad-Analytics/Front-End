import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

export default function HomeLayout() {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: 'background.default'
    }}>
      <Outlet />
    </Box>
  );
}