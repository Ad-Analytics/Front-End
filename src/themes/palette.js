// Start of Selection
// material-ui
import { createTheme } from '@mui/material/styles';

// third-party
import { presetPalettes } from '@ant-design/colors';

// project import
import ThemeOption from './theme';

// ==============================|| DEFAULT THEME - PALETTE ||============================== //

export default function Palette(mode, presetColor) {
  const colors = presetPalettes;

  let greyPrimary = [
    '#000000',
    '#0A0A0A',
    '#141414',
    '#1F1F1F',
    '#292929',
    '#333333',
    '#3D3D3D',
    '#474747',
    '#525252',
    '#5C5C5C',
    '#666666'
  ];
  let greyAscent = ['#000000', '#1A1A1A', '#2A2A2A', '#3A3A3A'];
  let greyConstant = ['#000000', '#0A0A0A'];

  colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant];

  const paletteColor = ThemeOption(colors, presetColor, mode);

  return createTheme({
    palette: {
      mode,
      common: {
        black: '#000000',
        white: '#FFFFFF'
      },
      ...paletteColor,
      text: {
        primary: mode === 'dark' ? '#FFFFFF' : paletteColor.grey[700],
        secondary: mode === 'dark' ? '#CCCCCC' : paletteColor.grey[500],
        disabled: mode === 'dark' ? '#999999' : paletteColor.grey[400]
      },
      action: {
        disabled: paletteColor.grey[300]
      },
      divider: paletteColor.grey[200],
      background: {
        paper: '#000000',
        default: '#000000'
      }
    }
  });
}
