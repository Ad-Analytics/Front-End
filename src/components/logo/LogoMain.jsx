// material-ui
import { useTheme } from '@mui/material/styles';
import logoImage from 'assets/images/logo.png';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    <img src={logoImage} alt="AdAnalytics" style={{ width: '100%', height: '80px' }} />
  );
};

export default Logo;
