import { useTheme } from '@mui/material/styles';
import logoImage from 'assets/images/logo.png';

const Logo = () => {
  const theme = useTheme();

  return (
    <img src={logoImage} alt="AdAnalytics" style={{ width: '100%', height: '80px' }} />
  );
};

export default Logo;
