import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F23847',
      dark: '#BF3945',
      contrastText: '#fefefe',
    },
    secondary: {
      main: '#0281C7',
      contrastText: '#0c0c0c',
    },
  },
  typography: {
    fontFamily: [
      'Muli',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    h3: {
      fontSize: '1rem',
      lineHeight: 2,
    },
    h5: {
      lineHeight: 1.6,
    },
    h6: {
      fontSize: '0.8rem',
      lineHeight: 2,
    },
  },
});

export default theme;
