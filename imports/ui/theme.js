import { createMuiTheme } from '@material-ui/core/styles';

export const myTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#7f95ff',
      main: '#4568dc',
      dark: '#003ea9',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fff6ff',
      main: '#f6c3e5',
      dark: '#c392b3',
      contrastText: '#212529',
    },
    text: {
      primary: 'rgba(33, 37, 41, 0.87)',
      secondary: 'rgba(33, 37, 41, 0.6)',
      dark: '#212529',
    },
  },
  typography: {
    fontFamily: 'Nunito Sans, sans-serif',
    allVariants: {
      color: 'rgba(33, 37, 41, 0.87)',
    },
    h5: {
      letterSpacing: '0.18px',
    },
    h6: {
      fontWeight: 600,
      lineHeight: '24px',
      letterSpacing: '0.15px',
    },
    subtitle1: {
      fontWeight: 'bold',
      letterSpacing: '0.15px',
    },
    subtitle2: {
      fontWeight: 'bold',
    },
    body1: {
      lineHeight: '24px',
      letterSpacing: '0.5px',
    },
    body2: {
      lineHeight: '20px',
      letterSpacing: '0.25px',
    },
    button: {
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: '1.25px',
      textTransform: 'none',
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 50,
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: '8px',
      },
    },
  },
});
