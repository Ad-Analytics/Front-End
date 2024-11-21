import React from 'react';
import { Box, Container } from '@mui/material';
import IntegrationGuide from './components/IntegrationPage';

const Integration = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ width: '100%', mt: 3 }}>
        <IntegrationGuide platform="googleAds" />
      </Box>
    </Container>
  );
};

export default Integration; 