import palette from './palette';
import { createTheme } from '@mui/material/styles';

const defaultThemeOptions = createTheme({
  palette,
  custom: {
    borderRadius: {
      radius4: '4px',
      radius6: '6px',
      radius10: '10px',
      radius20: '20px',
      radiusCircle: '50%',
    },
  },
});

export default defaultThemeOptions;